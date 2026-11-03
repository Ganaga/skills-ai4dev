---
name: github-issue
theme: ticketing
description: Implémente une issue GitHub de bout en bout selon les standards IGN
details: Analyse l'issue et le code existant, détermine le type (bug/feature/docs), pose les questions manquantes, puis implémente la solution. Écrit les tests, met à jour le CHANGELOG, lance les vérifications et crée la PR avec `Closes #numéro` après validation explicite de l'utilisateur.
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu traites une issue GitHub de bout en bout : analyse, implémentation, tests, changelog et PR.

## Étapes

### 1. Analyse de l'issue

- Détermine le type : **bug**, **feature**, **documentation**, **question**.
- Reformule le problème ou le besoin en une phrase technique.
- Identifie les fichiers concernés en analysant le code existant.
- Liste les informations manquantes. **Attends les réponses avant de poursuivre.**

### 2. Plan d'implémentation

- **Bug** : reproduis d'abord le problème, identifie la cause racine, propose le correctif.
- **Feature** : propose l'interface publique (API, signatures) avant d'implémenter le corps.

Soumets le plan à l'utilisateur et **attends sa validation avant de coder**.

### 3. Implémentation

Respecte les conventions de nommage IGN :
- **Classes** : PascalCase (`CarteTopographique`)
- **Méthodes/variables** : camelCase (`calculerEmprise`)
- **Constantes** : SCREAMING_SNAKE_CASE (`SRID_LAMBERT93`)
- **Fichiers** : kebab-case (`carte-topographique.ts`)
- **Commits** : format Angular `type(scope): sujet #<numéro issue>`

Pour un bug : corrige la cause racine, pas le symptôme.

### 4. Tests

- Tests unitaires : cas nominal, cas aux limites, cas d'erreur.
- **Bug** : ajoute un test de non-régression qui aurait détecté le bug.
- Vérifie que tous les tests existants passent.

### 5. Mise à jour du CHANGELOG

```markdown
### Added / Fixed / Changed
- Description de la modification (Closes #<numéro issue>)
```

### 6. Vérifications

1. Lint / formatage
2. Tests
3. Build si applicable

Corrige toutes les erreurs avant de continuer.

### 7. Création de la PR

**Attends la validation explicite de l'utilisateur** avant de créer la PR.

Titre : `type(scope): sujet #<numéro issue>`

Corps :
```
## Résumé
<description des changements>

## Issue
Closes #<numéro issue>

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Documentation

## Tests
- [ ] Tests ajoutés / mis à jour
- [ ] Tests existants passent

## Checklist
- [ ] CHANGELOG mis à jour
- [ ] Conventions de nommage IGN respectées
```
