import { loadInstalled, saveInstalled } from '../utils/state.js'
import { deleteClaudeSkill } from '../utils/claude-code.js'
import { deleteCopilotSkill } from '../utils/copilot.js'

export async function deleteSkill(input) {
  const id = input.endsWith('.md') ? input.slice(0, -3) : input
  const [theme, name] = id.split('/')

  if (!theme || !name) {
    throw new Error(`Identifiant invalide : '${input}'. Format attendu : theme/nom`)
  }

  const state = loadInstalled()
  if (!state[id]) {
    throw new Error(`Skill '${id}' non trouvée dans les skills installées.`)
  }

  const deleted = []

  const claudeDest = deleteClaudeSkill(theme, name)
  if (claudeDest) {
    console.log(`✓ Supprimé (Claude Code) : ${claudeDest}`)
    deleted.push('claude')
  }

  const copilotDest = deleteCopilotSkill(theme, name)
  if (copilotDest) {
    console.log(`✓ Supprimé (GitHub Copilot) : ${copilotDest}`)
    deleted.push('copilot')
  }

  delete state[id]
  saveInstalled(state)

  if (deleted.length === 0) {
    console.log(`⚠ Aucun fichier trouvé sur le disque, entrée retirée du registre.`)
  } else {
    console.log(`\n✓ Skill '${id}' supprimée.`)
  }
}
