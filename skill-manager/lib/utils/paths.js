import { homedir } from 'os'
import { join } from 'path'
import { existsSync } from 'fs'

export function getClaudeCommandsDir() {
  return join(homedir(), '.claude', 'commands')
}

export function getSkignStateDir() {
  return join(homedir(), '.skign')
}

export function getInstalledJsonPath() {
  return join(homedir(), '.skign', 'installed.json')
}

export function getCatalogCachePath() {
  return join(homedir(), '.skign', 'catalog-cache.json')
}

export function getCopilotInstructionsDir() {
  const platform = process.platform
  if (platform === 'win32') {
    return join(process.env.APPDATA || '', 'github-copilot', 'instructions')
  }
  // Linux + macOS
  return join(homedir(), '.config', 'github-copilot', 'instructions')
}

export function detectTargets() {
  const targets = []
  if (existsSync(getClaudeCommandsDir())) targets.push('claude')
  if (existsSync(getCopilotInstructionsDir())) targets.push('copilot')
  return targets
}
