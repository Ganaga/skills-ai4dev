#!/usr/bin/env node
import { install } from '../lib/commands/install.js'
import { update } from '../lib/commands/update.js'
import { deleteSkill } from '../lib/commands/delete.js'
import { catalog } from '../lib/commands/catalog.js'

const args = process.argv.slice(2)
const flag = args[0]
const value = args[1]

const HELP = `skign — gestionnaire de skills AI

Usage:
  skign --install <theme/nom>   Installe une skill (Claude Code + Copilot)
  skign --install <url>         Installe une skill depuis une URL complète
  skign --delete  <theme/nom>   Supprime une skill installée
  skign --update                Met à jour toutes les skills installées
  skign --catalog               Liste les skills disponibles par thème

Alias: -i (--install), -u (--update)

Exemples:
  skign --catalog
  skign --install review/code-review
  skign --delete review/code-review
  skign --update
`

if (flag === '--install' || flag === '-i') {
  if (!value) {
    console.error('Erreur : précise une URL ou un identifiant theme/nom.')
    console.error('Exemple : skign --install review/code-review')
    process.exit(1)
  }
  install(value).catch(err => { console.error(err.message); process.exit(1) })
} else if (flag === '--update' || flag === '-u') {
  update().catch(err => { console.error(err.message); process.exit(1) })
} else if (flag === '--delete') {
  if (!value) {
    console.error('Erreur : précise un identifiant theme/nom.')
    console.error('Exemple : skign --delete review/code-review')
    process.exit(1)
  }
  deleteSkill(value).catch(err => { console.error(err.message); process.exit(1) })
} else if (flag === '--catalog') {
  catalog().catch(err => { console.error(err.message); process.exit(1) })
} else if (flag === '--help' || flag === '-h' || !flag) {
  console.log(HELP)
  process.exit(0)
} else {
  console.error(`Option inconnue : ${flag}`)
  console.log(HELP)
  process.exit(1)
}
