---
name: write-docs
theme: documentation
description: Rédige la documentation technique d'un composant ou d'une API IGN
details: Analyse le code source pour en déduire le comportement réel, puis génère le README, la documentation d'API, les exemples d'usage et le guide de contribution. Adapte le niveau de détail à l'audience (utilisateur final, développeur, ops) et respecte les conventions de documentation du projet IGN.
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu rédiges de la documentation technique précise, utile et maintenable pour un projet IGN.

## Instructions

### README principal

Structure attendue :
1. **Description** : une phrase résumant ce que fait le composant/projet
2. **Prérequis** : versions, dépendances, droits d'accès aux données IGN si nécessaire
3. **Installation** : commandes copiables avec prérequis explicites
4. **Usage** : exemples concrets avec entrée/sortie réels (pas de `TODO` ou `...`)
5. **Configuration** : paramètres disponibles, valeurs par défaut, variables d'environnement
6. **Architecture** : aperçu de la structure si non triviale (diagramme Mermaid bienvenu)
7. **Contribution** : conventions de commit Angular, workflow de PR, lancement des tests
8. **Contact** : équipe ou canal de support IGN

### Documentation d'API

Pour chaque endpoint ou fonction publique :
- **Signature complète** avec types
- **Description** du comportement (cas normal + cas d'erreur)
- **Exemple d'appel** avec données réelles (coordonnées, CRS, formats IGN)
- **Réponse attendue** avec exemple JSON/GeoJSON si applicable

### Commentaires dans le code

- Documente le POURQUOI, pas le QUOI.
- Commente les contraintes non évidentes : systèmes de coordonnées spécifiques, limitations des formats de données géographiques, cas particuliers des algorithmes cartographiques.
- Pas de docstrings multi-paragraphes sur du code auto-documenté.

### CHANGELOG

Format [Keep a Changelog](https://keepachangelog.com) + versionning sémantique.
Sections : `Added`, `Changed`, `Fixed`, `Removed`, `Security`.
Chaque entrée référence le numéro de ticket ou PR.

## Règles générales

- Écris pour un lecteur qui rejoint le projet aujourd'hui.
- Vérifie que les commandes d'exemple fonctionnent réellement avant de les écrire.
- Mets à jour la doc en même temps que le code — jamais après.
- Utilise le vocabulaire métier IGN avec précision (CRS, emprise, géoréférencement, dalles, pyramide de tuiles...).
