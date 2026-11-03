import { readFileSync, writeFileSync, mkdirSync, existsSync, renameSync } from 'fs'
import { dirname } from 'path'
import { createHash } from 'crypto'
import { getInstalledJsonPath, getSkignStateDir } from './paths.js'

export function hashContent(content) {
  return createHash('sha256').update(content).digest('hex')
}

export function loadInstalled() {
  const path = getInstalledJsonPath()
  if (!existsSync(path)) return {}
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return {}
  }
}

export function saveInstalled(data) {
  const path = getInstalledJsonPath()
  mkdirSync(getSkignStateDir(), { recursive: true })
  const tmp = `${path}.tmp`
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
  renameSync(tmp, path)
}
