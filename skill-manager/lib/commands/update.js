import { fetchText } from '../utils/github.js'
import { parseFrontmatter, validateMeta } from '../utils/frontmatter.js'
import { detectTargets } from '../utils/paths.js'
import { installClaudeSkill } from '../utils/claude-code.js'
import { installCopilotSkill } from '../utils/copilot.js'
import { loadInstalled, saveInstalled, hashContent } from '../utils/state.js'

export async function update() {
  const state = loadInstalled()
  const ids = Object.keys(state)

  if (ids.length === 0) {
    console.log('Aucune skill installée.')
    return
  }

  const targets = detectTargets()
  let updatedCount = 0
  let upToDateCount = 0

  for (const id of ids) {
    const entry = state[id]
    process.stdout.write(`Vérification de '${id}'... `)

    let content
    try {
      content = await fetchText(entry.url)
    } catch (err) {
      console.log(`ERREUR (${err.message})`)
      continue
    }

    const newHash = hashContent(content)
    if (newHash === entry.contentHash) {
      console.log('à jour.')
      upToDateCount++
      continue
    }

    const { meta, body } = parseFrontmatter(content)
    validateMeta(meta, entry.url)

    const installed = []
    if (targets.includes('claude')) {
      installClaudeSkill(meta, content)
      installed.push('claude')
    }
    if (targets.includes('copilot')) {
      installCopilotSkill(meta, body)
      installed.push('copilot')
    }

    state[id] = {
      ...entry,
      contentHash: newHash,
      updatedAt: new Date().toISOString(),
      targets: installed.length > 0 ? installed : entry.targets
    }
    console.log('mise à jour.')
    updatedCount++
  }

  saveInstalled(state)
  console.log(`\nRécapitulatif : ${updatedCount} mise(s) à jour, ${upToDateCount} déjà à jour.`)
}
