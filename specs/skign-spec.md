# Spécification : skign

## Objectif

`skign` est un CLI Node.js permettant de gérer des **skills** d'assistance au code IA.
Une skill est un fichier Markdown contenant des instructions pour un assistant IA (Claude Code, GitHub Copilot).

Le tool est installable directement depuis GitHub, sans publication sur npm :

```bash
npm install -g github:Ganaga/skills-ai4dev
```

---

## Concepts

### Skill

Un fichier `.md` avec frontmatter YAML suivi d'un corps Markdown.

```markdown
---
name: code-review
theme: review
description: Relit une pull request pour en vérifier la correction et le style
version: 1.0.0
authors:
  - IGNF
---

Contenu de la skill...
```

| Champ         | Type    | Obligatoire | Description                               |
|---------------|---------|-------------|-------------------------------------------|
| `name`        | string  | oui         | Identifiant slug (= nom du fichier)       |
| `theme`       | string  | oui         | Thème = nom du dossier parent             |
| `description` | string  | oui         | Description courte (affichée au catalogue)|
| `version`     | string  | oui         | Version sémantique (ex: `1.0.0`)          |
| `authors`     | array   | non         | Auteurs                                   |

### Identifiant court

Chaque skill est identifiée par `theme/nom` (ex: `review/code-review`).

---

## Commandes

### `skign --catalog`

Liste les skills disponibles dans le repo `Ganaga/skills-ai4dev`, groupées par thème.

- Utilise l'API GitHub (git tree) + fetch parallèle des fichiers
- Cache local TTL 1h dans `~/.skign/catalog-cache.json`
- Affiche pour chaque skill : nom, version, description, commande d'installation

```
=== review ===
  code-review (v1.0.0)
    Relit une pull request pour en vérifier la correction et le style
    Installation : skign --install review/code-review
```

### `skign --install <identifiant|url>`

Installe une skill dans les outils IA détectés.

- **Forme courte** : `review/code-review` → résolu en URL raw GitHub
- **URL complète** : `https://raw.githubusercontent.com/...`
- Détecte automatiquement les cibles disponibles :
  - Claude Code : `~/.claude/commands/` doit exister
  - GitHub Copilot : `~/.config/github-copilot/instructions/` doit exister
- Si aucune cible n'est détectée → erreur explicite
- Enregistre l'installation dans `~/.skign/installed.json`

**Chemins d'installation :**

| Cible          | Chemin                                                     |
|----------------|------------------------------------------------------------|
| Claude Code    | `~/.claude/commands/<theme>/<name>.md`                     |
| GitHub Copilot | `~/.config/github-copilot/instructions/<theme>-<name>.md`  |

### `skign --delete <theme/nom>`

Supprime une skill installée.

- Vérifie la présence dans `~/.skign/installed.json`
- Supprime les fichiers présents dans Claude Code et/ou Copilot
- Retire l'entrée du registre

### `skign --update`

Met à jour toutes les skills installées depuis leur URL d'origine.

- Compare le hash SHA-256 du contenu actuel avec la version locale
- Réinstalle uniquement les skills modifiées
- Affiche un récapitulatif

---

## Stockage local

Fichier `~/.skign/installed.json` :

```json
{
  "review/code-review": {
    "url": "https://raw.githubusercontent.com/Ganaga/skills-ai4dev/main/skills/review/code-review.md",
    "installedAt": "2026-11-03T10:00:00.000Z",
    "contentHash": "6ae8a75...",
    "targets": ["claude", "copilot"]
  }
}
```

---

## Structure du repo

```
skills-ai4dev/
├── package.json              # bin: skign → skill-manager/bin/skign.js
├── skill-manager/
│   ├── bin/skign.js          # Entry point CLI
│   └── lib/
│       ├── commands/         # install.js, update.js, delete.js, catalog.js
│       └── utils/            # frontmatter.js, github.js, paths.js, state.js, claude-code.js, copilot.js
├── skills/
│   ├── review/
│   ├── new_feature/
│   ├── ticketing/
│   └── documentation/
├── catalog/
│   └── generate.js           # Génère docs/index.html
├── docs/
│   └── index.html            # GitHub Pages (généré par CI)
└── specs/
    └── skign-spec.md         # Ce fichier
```

---

## GitHub Pages

Le catalogue est également accessible en ligne via GitHub Pages.
L'URL sera : `https://ignf.github.io/skills-ai4dev/`

La page est générée automatiquement à chaque push sur `main` touchant `skills/**`.
