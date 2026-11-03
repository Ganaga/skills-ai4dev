---
name: jira-ticket
theme: ticketing
description: Implémente un ticket Jira de bout en bout selon les standards IGN
details: Analyse le ticket et le code existant, pose les questions manquantes, puis implémente la solution en respectant les conventions de nommage IGN. Écrit les tests unitaires et d'intégration, met à jour le CHANGELOG, lance les vérifications (lint, tests) et propose une PR après validation explicite de l'utilisateur.
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu traites un ticket Jira de bout en bout : compréhension, implémentation, tests, changelog et PR — en respectant les conventions IGN.

## Étapes

### 1. Analyse du ticket

- Reformule l'objectif en une phrase technique claire.
- Identifie les fichiers concernés en analysant le code existant.
- Liste les questions bloquantes avant de commencer. **Attends la réponse avant de poursuivre.**

### 2. Plan d'implémentation

Découpe le travail en sous-tâches ordonnées avec une estimation (simple / moyenne / complexe).
Soumets ce plan à l'utilisateur et **attends sa validation avant de coder**.

### 3. Implémentation

Respecte les conventions de nommage IGN :
- **Classes** : PascalCase (`CarteTopographique`)
- **Méthodes/variables** : camelCase (`calculerEmprise`)
- **Constantes** : SCREAMING_SNAKE_CASE (`SRID_LAMBERT93`)
- **Fichiers** : kebab-case (`carte-topographique.ts`)
- **Commits** : format Angular `type(scope): sujet #<numéro ticket>`

Commence par la plus petite sous-tâche indépendante. Indique ta progression après chaque sous-tâche.

### 4. Tests

Pour chaque fonction modifiée ou créée :
- Écris les tests unitaires (cas nominal, cas aux limites, cas d'erreur).
- Vérifie que les tests existants passent toujours.
- Si un test ne peut pas être automatisé, documente le cas de test manuel.

### 5. Mise à jour du CHANGELOG

Ajoute une entrée dans `CHANGELOG.md` sous `[Unreleased]` selon le format Keep a Changelog :

```markdown
### Added / Changed / Fixed
- Description de la modification (#<numéro ticket>)
```

### 6. Vérifications

Lance dans l'ordre :
1. Lint / formatage (`npm run lint` ou équivalent)
2. Tests (`npm test` ou équivalent)
3. Build si applicable

Reporte les erreurs et corrige-les avant de continuer.

### 7. Création de la PR

**Attends la validation explicite de l'utilisateur** ("c'est bon", "ok pour la PR", etc.) avant de créer la PR.

Titre de la PR : `type(scope): sujet #<numéro ticket>`

Corps de la PR :
```
## Résumé
<description des changements>

## Ticket
Closes #<numéro ticket>

## Tests
- [ ] Tests unitaires ajoutés / mis à jour
- [ ] Tests existants passent

## Checklist
- [ ] CHANGELOG mis à jour
- [ ] Conventions de nommage IGN respectées
```

## Validation des critères d'acceptation

À la fin de l'implémentation, vérifie chaque critère d'acceptation du ticket :
- ✓ : critère satisfait
- ✗ : critère non satisfait (explique pourquoi)
- ? : critère non vérifiable automatiquement (propose un test manuel)
