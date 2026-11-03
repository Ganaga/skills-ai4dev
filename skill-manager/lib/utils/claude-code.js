import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { join } from 'path'
import { getClaudeCommandsDir } from './paths.js'

export function installClaudeSkill(meta, content) {
  const dir = join(getClaudeCommandsDir(), meta.theme)
  mkdirSync(dir, { recursive: true })
  const dest = join(dir, `${meta.name}.md`)
  writeFileSync(dest, content, 'utf8')
  return dest
}

export function deleteClaudeSkill(theme, name) {
  const dest = join(getClaudeCommandsDir(), theme, `${name}.md`)
  if (existsSync(dest)) {
    rmSync(dest)
    return dest
  }
  return null
}
