const BASE_RAW = 'https://raw.githubusercontent.com/Ganaga/skills-ai4dev/main'
const BASE_API = 'https://api.github.com/repos/Ganaga/skills-ai4dev'

export function resolveUrl(input) {
  if (input.includes('://')) return input
  // forme courte : theme/nom (sans .md)
  const withExt = input.endsWith('.md') ? input : `${input}.md`
  return `${BASE_RAW}/skills/${withExt}`
}

export async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'skign-cli/0.1.0' }
  })
  if (!res.ok) throw new Error(`Erreur HTTP ${res.status} lors du fetch de ${url}`)
  return res.text()
}

export async function fetchSkillTree() {
  const url = `${BASE_API}/git/trees/main?recursive=1`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'skign-cli/0.1.0', 'Accept': 'application/vnd.github+json' }
  })
  if (!res.ok) throw new Error(`Erreur GitHub API ${res.status}`)
  const data = await res.json()
  return data.tree
    .filter(item => item.type === 'blob' && /^skills\/[^/]+\/[^/]+\.md$/.test(item.path))
    .map(item => ({
      path: item.path,
      rawUrl: `${BASE_RAW}/${item.path}`
    }))
}
