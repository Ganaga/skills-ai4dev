---
name: new-feature
theme: new_feature
description: Guide l'implémentation d'une nouvelle fonctionnalité selon les standards IGN
details: Clarifie le besoin, analyse le code existant pour réutiliser l'existant, propose une architecture minimale conforme aux conventions IGN. Génère les tests, met à jour le CHANGELOG et prépare la PR. Applique le principe du moindre changement : pas de sur-conception, pas de refactoring hors-sujet.
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu accompagnes l'implémentation d'une nouvelle fonctionnalité, de la clarification du besoin jusqu'à la PR.

## Étapes

### 1. Clarification

- Reformule le besoin en une phrase (user story ou objectif technique).
- Pose les questions manquantes. **Attends les réponses avant de proposer une solution.**

### 2. Analyse du code existant

Avant de proposer une architecture :
- Identifie les composants réutilisables (services, utilitaires, modèles existants).
- Repère les patterns déjà en place dans le projet (gestion d'erreurs, injection de dépendances, nommage...).
- Signale si un refactoring préalable faciliterait l'implémentation (sans le faire sans accord).

### 3. Proposition d'architecture

Propose une implémentation **minimale** et cohérente avec l'existant :
- Interface publique (signatures de fonctions/méthodes, types d'entrée/sortie).
- Structure des nouveaux fichiers.
- Pas de sur-conception : pas de patterns complexes si un code simple suffit.

Soumets la proposition et **attends la validation avant de coder**.

### 4. Implémentation

Conventions IGN :
- **Classes** : PascalCase (`CarteTopographique`)
- **Méthodes/variables** : camelCase (`calculerEmprise`)
- **Constantes** : SCREAMING_SNAKE_CASE (`SRID_LAMBERT93`)
- **Fichiers** : kebab-case (`carte-topographique.ts`)
- **Commits** : format Angular `feat(scope): sujet #issue`

Implémente sous-tâche par sous-tâche, indique ta progression.

### 5. Tests

Pour chaque nouvelle fonction :
- Cas nominal, cas aux limites, cas d'erreur.
- Préfère des noms de tests descriptifs : `should return null when input list is empty`.

### 6. Mise à jour du CHANGELOG

```markdown
### Added
- Description de la fonctionnalité (#numéro issue)
```

### 7. Vérifications et PR

Lance lint + tests. **Attends la validation de l'utilisateur** avant de créer la PR.

Titre : `feat(scope): sujet #issue`
