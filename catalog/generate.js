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

function generateHtml(skills) {
  const byTheme = {}
  for (const skill of skills) {
    if (!byTheme[skill.theme]) byTheme[skill.theme] = []
    byTheme[skill.theme].push(skill)
  }

  const themeBlocks = Object.entries(byTheme).map(([theme, themeSkills]) => {
    const cards = themeSkills.map(s => `
      <div class="card">
        <div class="card-header">
          <span class="name">${escapeHtml(s.name)}</span>
          <span class="version">v${escapeHtml(s.version)}</span>
        </div>
        <p class="description">${escapeHtml(s.description)}</p>
        <div class="install">
          <code>skign --install ${escapeHtml(s.id)}</code>
          <button onclick="navigator.clipboard.writeText('skign --install ${escapeHtml(s.id)}')" title="Copier">📋</button>
        </div>
      </div>`).join('')
    return `
    <section>
      <h2>${escapeHtml(theme)}</h2>
      <div class="cards">${cards}
      </div>
    </section>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Catalogue skign — IGNF</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem 1rem; color: #1a1a1a; }
    header { margin-bottom: 2rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem; }
    h1 { margin: 0 0 .5rem; font-size: 2rem; }
    h1 span { color: #2563eb; }
    header p { margin: 0; color: #6b7280; }
    h2 { font-size: 1.25rem; color: #374151; text-transform: uppercase; letter-spacing: .05em; margin-top: 2rem; }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
    .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; background: #fff; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
    .name { font-weight: 600; font-size: 1rem; }
    .version { font-size: .75rem; color: #9ca3af; background: #f3f4f6; padding: .2rem .5rem; border-radius: 999px; }
    .description { color: #6b7280; font-size: .875rem; margin: 0 0 .75rem; }
    .install { display: flex; align-items: center; gap: .5rem; background: #f8fafc; border-radius: 4px; padding: .4rem .6rem; }
    .install code { font-size: .8rem; flex: 1; overflow: auto; }
    .install button { border: none; background: none; cursor: pointer; font-size: 1rem; padding: 0; }
    footer { margin-top: 3rem; color: #9ca3af; font-size: .8rem; text-align: center; }
  </style>
</head>
<body>
  <header>
    <h1><span>skign</span> — Catalogue de skills</h1>
    <p>Skills d'assistance au code IA pour Claude Code et GitHub Copilot · <a href="https://github.com/IGNF/skills-ai4dev">IGNF/skills-ai4dev</a></p>
    <p style="margin-top:.5rem"><strong>Installation :</strong> <code>npm install -g github:IGNF/skills-ai4dev</code></p>
  </header>
  <main>${themeBlocks}
  </main>
  <footer>Généré automatiquement · ${new Date().toISOString().split('T')[0]}</footer>
</body>
</html>`
}

mkdirSync(DOCS_DIR, { recursive: true })
const skills = collectSkills()
const html = generateHtml(skills)
writeFileSync(join(DOCS_DIR, 'index.html'), html, 'utf8')
console.log(`Catalogue généré : ${skills.length} skill(s) → docs/index.html`)
