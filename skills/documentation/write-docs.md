---
name: write-docs
theme: documentation
description: Rédige de la documentation technique claire, concise et maintenable
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu rédiges de la documentation technique adaptée au contexte du projet.

## Instructions

### README principal

Structure attendue :
1. **Description** : une phrase résumant ce que fait le projet
2. **Installation** : commandes copiables, prérequis explicites
3. **Usage** : exemples concrets avec entrée/sortie
4. **Architecture** : aperçu de la structure du projet si non triviale
5. **Contribution** : conventions de commit, workflow de PR
6. **Contact** : équipe ou canal de support

### Documentation de code

- Documente le POURQUOI, pas le QUOI : le code dit déjà ce qu'il fait.
- Un commentaire par contrainte non évidente, invariant subtil ou contournement de bug.
- Pas de docstrings multi-paragraphes sur du code auto-documenté.

### Changelogs

Suis le format [Keep a Changelog](https://keepachangelog.com) avec versionning sémantique.
Sections : `Added`, `Changed`, `Fixed`, `Removed`, `Security`.

## Règles générales

- Écris pour un lecteur qui rejoint le projet aujourd'hui.
- Préfère Markdown avec titres hiérarchiques.
- Mets à jour la doc en même temps que le code, pas après.
