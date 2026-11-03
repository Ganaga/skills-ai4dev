import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fetchSkillTree, fetchText } from '../utils/github.js'
import { parseFrontmatter } from '../utils/frontmatter.js'
import { getCatalogCachePath, getSkignStateDir } from '../utils/paths.js'

const CACHE_TTL_MS = 60 * 60 * 1000 // 1 heure

function loadCache() {
  const path = getCatalogCachePath()
  if (!existsSync(path)) return null
  try {
    const data = JSON.parse(readFileSync(path, 'utf8'))
    if (Date.now() - new Date(data.cachedAt).getTime() < CACHE_TTL_MS) return data.skills
  } catch {
    // cache corrompu, on ignore
  }
  return null
}

function saveCache(skills) {
  mkdirSync(getSkignStateDir(), { recursive: true })
  writeFileSync(getCatalogCachePath(), JSON.stringify({ cachedAt: new Date().toISOString(), skills }, null, 2), 'utf8')
}

export async function catalog() {
  let skills = loadCache()

  if (!skills) {
    console.log('Chargement du catalogue depuis GitHub...')
    const tree = await fetchSkillTree()
    const contents = await Promise.all(tree.map(item => fetchText(item.rawUrl).then(text => ({ ...item, text }))))

    skills = contents.map(item => {
      const { meta } = parseFrontmatter(item.text)
      return {
        id: `${meta.theme || '?'}/${meta.name || '?'}`,
        theme: meta.theme || '?',
        name: meta.name || item.path.split('/').pop().replace('.md', ''),
        description: meta.description || '',
        version: meta.version || '?',
        rawUrl: item.rawUrl
      }
    }).sort((a, b) => a.theme.localeCompare(b.theme) || a.name.localeCompare(b.name))

    saveCache(skills)
  }

  if (skills.length === 0) {
    console.log('Aucune skill disponible dans le catalogue.')
    return
  }

  const byTheme = {}
  for (const skill of skills) {
    if (!byTheme[skill.theme]) byTheme[skill.theme] = []
    byTheme[skill.theme].push(skill)
  }

  for (const [theme, themeSkills] of Object.entries(byTheme)) {
    console.log(`\n=== ${theme} ===`)
    for (const skill of themeSkills) {
      console.log(`  ${skill.name} (v${skill.version})`)
      console.log(`    ${skill.description}`)
      console.log(`    Installation : skign --install ${skill.id}`)
    }
  }
}
