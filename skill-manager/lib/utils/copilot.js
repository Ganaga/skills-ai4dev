import { writeFileSync, rmSync, existsSync } from 'fs'
import { join } from 'path'
import { getCopilotInstructionsDir } from './paths.js'

function filename(theme, name) {
  return `${theme}-${name}.md`
}

export function installCopilotSkill(meta, body) {
  const dest = join(getCopilotInstructionsDir(), filename(meta.theme, meta.name))
  writeFileSync(dest, body, 'utf8')
  return dest
}

export function deleteCopilotSkill(theme, name) {
  const dest = join(getCopilotInstructionsDir(), filename(theme, name))
  if (existsSync(dest)) {
    rmSync(dest)
    return dest
  }
  return null
}
