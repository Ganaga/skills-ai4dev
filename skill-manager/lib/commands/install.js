import { resolveUrl, fetchText } from '../utils/github.js'
import { parseFrontmatter, validateMeta } from '../utils/frontmatter.js'
import { detectTargets } from '../utils/paths.js'
import { installClaudeSkill } from '../utils/claude-code.js'
import { installCopilotSkill } from '../utils/copilot.js'
import { loadInstalled, saveInstalled, hashContent } from '../utils/state.js'

export async function install(input) {
  const url = resolveUrl(input)
  console.log(`Téléchargement de ${url}...`)

  const content = await fetchText(url)
  const { meta, body } = parseFrontmatter(content)
  validateMeta(meta, url)

  const targets = detectTargets()
  if (targets.length === 0) {
    throw new Error(
      'Aucune cible détectée.\n' +
      'Vérifiez que Claude Code (~/.claude/commands/) ou GitHub Copilot (~/.config/github-copilot/instructions/) est installé.'
    )
  }

  const installed = []

  if (targets.includes('claude')) {
    const dest = installClaudeSkill(meta, content)
    console.log(`✓ Claude Code : ${dest}`)
    installed.push('claude')
  } else {
    console.log('⚠ Claude Code non détecté, installation ignorée.')
  }

  if (targets.includes('copilot')) {
    const dest = installCopilotSkill(meta, body)
    console.log(`✓ GitHub Copilot : ${dest}`)
    installed.push('copilot')
  } else {
    console.log('⚠ GitHub Copilot non détecté, installation ignorée.')
  }

  const state = loadInstalled()
  const id = `${meta.theme}/${meta.name}`
  state[id] = {
    url,
    installedAt: new Date().toISOString(),
    contentHash: hashContent(content),
    targets: installed
  }
  saveInstalled(state)

  console.log(`\n✓ Skill '${id}' installée avec succès.`)
}
