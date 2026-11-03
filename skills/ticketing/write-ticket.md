---
name: write-ticket
theme: ticketing
description: Rédige un ticket Jira ou une issue GitHub prêt à être assigné
details: Reformule le besoin en User Story, identifie les critères d'acceptation vérifiables, les dépendances techniques et les risques. Produit un ticket structuré avec titre, description, critères d'acceptation, labels et estimation de complexité, prêt à être copié dans Jira ou GitHub.
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu rédiges des tickets clairs, actionnables et prêts à être assignés à un développeur.

## Instructions

### Pour une fonctionnalité (feature request)

**User Story :**
```
En tant que <rôle>,
Je veux <action/fonctionnalité>,
Afin de <bénéfice attendu>.
```

Structure complète :
- **Titre** : `[Feature] Verbe + objet` (ex: `[Feature] Exporter une carte en GeoTIFF`)
- **Description** : contexte métier + contraintes techniques connues
- **Critères d'acceptation** : liste de conditions vérifiables avec cases à cocher
- **Dépendances** : autres tickets ou composants impactés
- **Complexité** : S / M / L / XL avec justification
- **Labels** : `enhancement`, `documentation`, `quality`, `tooling`

### Pour un bug

- **Titre** : `[Bug] Comportement observé` (ex: `[Bug] Export GeoTIFF échoue avec un CRS non-standard`)
- **Description** : comportement observé vs attendu
- **Étapes de reproduction** : liste numérotée précise et reproductible
- **Environnement** : OS, version du logiciel, données d'entrée
- **Logs / captures** : extraits pertinents
- **Labels** : `bug`, + sévérité (`critical`, `major`, `minor`)

## Règles générales

- Un ticket = un problème ou une fonctionnalité atomique.
- Les critères d'acceptation doivent être testables par quelqu'un qui ne connaît pas le code.
- Anticipe les questions du développeur : inclus les maquettes, exemples de données, contraintes de performance si pertinent.
- Utilise le vocabulaire métier IGN (CRS, emprise, dalles, géoréférencement...) avec précision.
