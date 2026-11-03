/**
 * Parse YAML frontmatter from a markdown string.
 * Supports only flat key: value pairs and simple arrays (- item per line).
 * Returns { meta, body }.
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/s)
  if (!match) return { meta: {}, body: content }

  const rawYaml = match[1]
  const body = match[2].trim()
  const meta = {}

  let currentKey = null
  for (const line of rawYaml.split('\n')) {
    const arrayItem = line.match(/^  - (.+)$/)
    if (arrayItem && currentKey) {
      meta[currentKey].push(arrayItem[1].trim())
      continue
    }
    const kv = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/)
    if (kv) {
      const [, key, val] = kv
      currentKey = key
      meta[key] = val.trim() === '' ? [] : val.trim()
    }
  }

  return { meta, body }
}

export function validateMeta(meta, filePath) {
  const required = ['name', 'theme', 'description', 'version']
  for (const field of required) {
    if (!meta[field]) throw new Error(`Champ requis manquant : '${field}' dans ${filePath}`)
  }
}
