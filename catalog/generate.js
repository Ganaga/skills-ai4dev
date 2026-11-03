#!/usr/bin/env node
/**
 * Génère docs/index.html depuis les fichiers skills/**\/*.md
 * Utilisé par le workflow GitHub Actions catalog.yml
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SKILLS_DIR = join(ROOT, 'skills')
const DOCS_DIR = join(ROOT, 'docs')

const IGN_LOGO_B64 = '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'

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/s)
  if (!match) return { meta: {}, body: content }
  const rawYaml = match[1]
  const body = match[2].trim()
  const meta = {}
  let currentKey = null
  for (const line of rawYaml.split('\n')) {
    const arrayItem = line.match(/^  - (.+)$/)
    if (arrayItem && currentKey) { meta[currentKey].push(arrayItem[1].trim()); continue }
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/)
    if (kv) { currentKey = kv[1]; meta[kv[1]] = kv[2].trim() === '' ? [] : kv[2].trim() }
  }
  return { meta, body }
}

function collectSkills() {
  const themes = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  const skills = []
  for (const theme of themes) {
    const files = readdirSync(join(SKILLS_DIR, theme)).filter(f => f.endsWith('.md'))
    for (const file of files) {
      const content = readFileSync(join(SKILLS_DIR, theme, file), 'utf8')
      const { meta } = parseFrontmatter(content)
      skills.push({
        theme: meta.theme || theme,
        name: meta.name || file.replace('.md', ''),
        description: meta.description || '',
        details: meta.details || '',
        version: meta.version || '?',
        id: `${meta.theme || theme}/${meta.name || file.replace('.md', '')}`
      })
    }
  }
  return skills.sort((a, b) => a.theme.localeCompare(b.theme) || a.name.localeCompare(b.name))
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const THEME_ICONS = {
  review:        '🔍',
  new_feature:   '✨',
  ticketing:     '🎫',
  documentation: '📄',
}

function generateHtml(skills) {
  const byTheme = {}
  for (const skill of skills) {
    if (!byTheme[skill.theme]) byTheme[skill.theme] = []
    byTheme[skill.theme].push(skill)
  }

  const themeBlocks = Object.entries(byTheme).map(([theme, themeSkills]) => {
    const icon = THEME_ICONS[theme] || '⚙️'
    const cards = themeSkills.map(s => {
      const safeId = escapeHtml(s.id.replace('/', '-'))
      const detailsBlock = s.details ? `
          <div class="details-box" id="details-${safeId}" hidden>
            <p class="details-text">${escapeHtml(s.details)}</p>
          </div>
          <button class="voir-plus" onclick="toggleDetails('${safeId}', this)" aria-expanded="false">
            Voir plus <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>` : ''
      return `
        <div class="card">
          <div class="card-top">
            <span class="skill-name">${escapeHtml(s.name)}</span>
            <span class="badge">v${escapeHtml(s.version)}</span>
          </div>
          <p class="skill-desc">${escapeHtml(s.description)}</p>
          ${detailsBlock}
          <div class="install-box">
            <code id="cmd-${safeId}">skign --install ${escapeHtml(s.id)}</code>
            <button class="copy-btn" onclick="copyCmd('${safeId}', this)" title="Copier la commande">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>`
    }).join('')

    return `
      <section class="theme-section">
        <h2 class="theme-title"><span class="theme-icon">${icon}</span> ${escapeHtml(theme.replace('_', ' '))}</h2>
        <div class="cards-grid">${cards}
        </div>
      </section>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catalogue skign — IGN</title>
  <style>
    :root {
      --ign-green: #67B346;
      --ign-green-dark: #4e8c33;
      --ign-grey: #58595B;
      --ign-grey-light: #F4F4F4;
      --ign-grey-border: #DCDCDC;
      --ign-white: #FFFFFF;
      --radius: 8px;
      --shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--ign-grey-light);
      color: var(--ign-grey);
      min-height: 100vh;
    }

    /* ── Header ── */
    header {
      background: var(--ign-white);
      border-bottom: 3px solid var(--ign-green);
      padding: 1.25rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      box-shadow: 0 2px 6px rgba(0,0,0,.06);
    }
    .header-brand { display: flex; align-items: center; gap: 1.25rem; }
    .header-brand img { height: 48px; width: auto; }
    .header-divider { width: 1px; height: 40px; background: var(--ign-grey-border); }
    .header-title h1 { font-size: 1.3rem; font-weight: 700; color: var(--ign-grey); line-height: 1.2; }
    .header-title p { font-size: .8rem; color: #999; margin-top: .15rem; }
    .install-pill {
      background: var(--ign-grey-light);
      border: 1px solid var(--ign-grey-border);
      border-radius: 999px;
      padding: .4rem 1rem;
      font-size: .8rem;
      color: var(--ign-grey);
      display: flex;
      align-items: center;
      gap: .5rem;
    }
    .install-pill code { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: .8rem; }
    .install-pill strong { color: var(--ign-green); }

    /* ── Main ── */
    main { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

    .hero {
      background: linear-gradient(135deg, var(--ign-green) 0%, var(--ign-green-dark) 100%);
      border-radius: var(--radius);
      padding: 2rem 2.5rem;
      color: white;
      margin-bottom: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .hero h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: .4rem; }
    .hero p { font-size: .95rem; opacity: .9; }
    .hero-stat { text-align: center; }
    .hero-stat .number { font-size: 2.5rem; font-weight: 800; line-height: 1; }
    .hero-stat .label { font-size: .8rem; opacity: .85; margin-top: .2rem; }

    /* ── Theme sections ── */
    .theme-section { margin-bottom: 2.5rem; }
    .theme-title {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .08em;
      color: var(--ign-grey);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: .5rem;
      padding-bottom: .5rem;
      border-bottom: 2px solid var(--ign-green);
    }
    .theme-icon { font-size: 1.1rem; }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    /* ── Cards ── */
    .card {
      background: var(--ign-white);
      border: 1px solid var(--ign-grey-border);
      border-radius: var(--radius);
      padding: 1.25rem;
      box-shadow: var(--shadow);
      transition: box-shadow .2s, transform .2s;
      display: flex;
      flex-direction: column;
      gap: .75rem;
    }
    .card:hover { box-shadow: 0 6px 20px rgba(103,179,70,.18); transform: translateY(-2px); }
    .card-top { display: flex; justify-content: space-between; align-items: center; }
    .skill-name { font-weight: 700; font-size: .95rem; color: #2d2d2d; }
    .badge {
      font-size: .7rem;
      background: #EEF7E8;
      color: var(--ign-green-dark);
      border: 1px solid #C5E3B2;
      padding: .15rem .5rem;
      border-radius: 999px;
      font-weight: 600;
    }
    .skill-desc { font-size: .85rem; color: #666; line-height: 1.5; flex: 1; }
    .install-box {
      display: flex;
      align-items: center;
      gap: .5rem;
      background: #F8F8F8;
      border: 1px solid var(--ign-grey-border);
      border-radius: 5px;
      padding: .4rem .6rem;
      margin-top: auto;
    }
    .install-box code {
      font-family: 'Cascadia Code', 'Fira Code', monospace;
      font-size: .78rem;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
    }
    .copy-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #aaa;
      padding: 2px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      transition: color .15s, background .15s;
      flex-shrink: 0;
    }
    .copy-btn:hover { color: var(--ign-green); background: #EEF7E8; }
    .copy-btn.copied { color: var(--ign-green); }

    /* ── Voir plus ── */
    .voir-plus {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--ign-green-dark);
      font-size: .78rem;
      font-weight: 600;
      padding: 0;
      display: flex;
      align-items: center;
      gap: .25rem;
      transition: color .15s;
    }
    .voir-plus:hover { color: var(--ign-green); }
    .voir-plus .chevron { transition: transform .2s; flex-shrink: 0; }
    .voir-plus[aria-expanded="true"] .chevron { transform: rotate(180deg); }
    .details-box {
      background: #F0F8EA;
      border-left: 3px solid var(--ign-green);
      border-radius: 0 4px 4px 0;
      padding: .6rem .8rem;
      animation: fadeIn .15s ease;
    }
    .details-box[hidden] { display: none; }
    .details-text { font-size: .82rem; color: #444; line-height: 1.55; margin: 0; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }

    /* ── Footer ── */
    footer {
      text-align: center;
      padding: 2rem 1rem;
      font-size: .78rem;
      color: #aaa;
      border-top: 1px solid var(--ign-grey-border);
      background: var(--ign-white);
    }
    footer a { color: var(--ign-green); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>

<header>
  <div class="header-brand">
    <img src="data:image/png;base64,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" alt="Logo IGN" />
    <div class="header-divider"></div>
    <div class="header-title">
      <h1>Catalogue skign</h1>
      <p>Skills d'assistance au code IA</p>
    </div>
  </div>
  <div class="install-pill">
    <strong>Installation :</strong>
    <code>npm install -g github:Ganaga/skills-ai4dev</code>
  </div>
</header>

<main>
  <div class="hero">
    <div>
      <h2>Skills prêtes à l'emploi</h2>
      <p>Installez en une commande dans Claude Code et GitHub Copilot</p>
    </div>
    <div class="hero-stat">
      <div class="number">${skills.length}</div>
      <div class="label">skills disponibles</div>
    </div>
  </div>

  ${themeBlocks}
</main>

<footer>
  <p>Généré automatiquement le ${new Date().toISOString().split('T')[0]} · <a href="https://github.com/Ganaga/skills-ai4dev">Ganaga/skills-ai4dev</a> · <a href="https://www.ign.fr">IGN France</a></p>
</footer>

<script>
  function copyCmd(id, btn) {
    const code = document.getElementById('cmd-' + id)
    navigator.clipboard.writeText(code.textContent).then(() => {
      btn.classList.add('copied')
      setTimeout(() => btn.classList.remove('copied'), 2000)
    })
  }

  function toggleDetails(id, btn) {
    const box = document.getElementById('details-' + id)
    const expanded = btn.getAttribute('aria-expanded') === 'true'
    box.hidden = expanded
    btn.setAttribute('aria-expanded', String(!expanded))
    btn.firstChild.textContent = expanded ? 'Voir plus ' : 'Voir moins '
  }
</script>
</body>
</html>`
}

mkdirSync(DOCS_DIR, { recursive: true })
const skills = collectSkills()
const html = generateHtml(skills)
writeFileSync(join(DOCS_DIR, 'index.html'), html, 'utf8')
console.log(`Catalogue généré : ${skills.length} skill(s) → docs/index.html`)
