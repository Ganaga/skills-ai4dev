# skills-ai4dev

Catalogue de skills d'assistance au code IA pour **Claude Code** et **GitHub Copilot**, géré via le CLI `skign`.

Catalogue en ligne : **https://ganaga.github.io/skills-ai4dev/**

---

## Installation

```bash
npm install -g github:Ganaga/skills-ai4dev
```

> Prérequis : Node.js 18+

---

## Utilisation

### Lister les skills disponibles

```bash
skign --catalog
```

### Installer une skill

```bash
skign --install review/code-review
```

`skign` détecte automatiquement les outils installés :
- **Claude Code** : installe dans `~/.claude/commands/<theme>/<nom>.md`
- **GitHub Copilot** : installe dans `~/.config/github-copilot/instructions/<theme>-<nom>.md`

L'installation ne se fait que si le dossier de settings de l'outil existe déjà.

### Mettre à jour toutes les skills installées

```bash
skign --update
```

### Supprimer une skill

```bash
skign --delete review/code-review
```

---

## Skills disponibles

| Thème           | Skill            | Description                                                       |
|-----------------|------------------|-------------------------------------------------------------------|
| `review`        | `code-review`    | Relit une PR pour en vérifier la correction, le style et les tests |
| `new_feature`   | `new-feature`    | Guide l'implémentation d'une nouvelle fonctionnalité              |
| `ticketing`     | `write-ticket`   | Rédige un ticket de fonctionnalité ou de bug                      |
| `documentation` | `write-docs`     | Rédige de la documentation technique claire et maintenable        |

---

## Ajouter une skill

1. Créer un fichier `.md` dans `skills/<theme>/` avec le frontmatter requis :

```markdown
---
name: ma-skill
theme: mon-theme
description: Description courte affichée dans le catalogue
version: 1.0.0
authors:
  - MonOrg
---

Contenu des instructions pour le LLM...
```

2. Ouvrir une PR — le catalogue GitHub Pages se met à jour automatiquement au merge.

---

## Structure du projet

```
skills-ai4dev/
├── skill-manager/   # Code source du CLI skign
├── skills/          # Skills au format Markdown
│   ├── review/
│   ├── new_feature/
│   ├── ticketing/
│   └── documentation/
├── specs/           # Spécification du projet
├── catalog/         # Script de génération du catalogue HTML
└── docs/            # GitHub Pages (généré par CI)
```

---

## Documentation

- [Spécification skign](specs/skign-spec.md)
- [Conventions de commit](docs/developper/Doc_commit.md)
