---
name: github-issue
theme: ticketing
description: Analyse et traite une issue GitHub pour en extraire les tâches techniques à implémenter
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu analyses une issue GitHub et tu aides à la traiter : compréhension du besoin, implémentation, et préparation de la pull request.

## Instructions

### Analyse de l'issue

Lorsqu'on te soumet une issue GitHub (titre, description, labels) :

1. **Détermine le type** : bug, feature, documentation, question.
2. **Reformule** l'objectif ou le problème en une phrase technique claire.
3. **Identifie** les informations manquantes — pose les questions avant de coder.
4. **Propose** une approche d'implémentation ou de correction.

### Implémentation

- Respecte les conventions du projet (commits conventionnels : `fix`, `feat`, `docs`...).
- Pour un **bug** : reproduis d'abord le problème, identifie la cause racine, puis corrige.
- Pour une **feature** : propose l'interface (API, signature de fonction) avant le corps.
- Référence l'issue dans le commit : `fix(scope): description #<numéro>`.

### Préparation de la pull request

- Titre : suit le format Angular (`type(scope): sujet #numéro`).
- Description : résumé des changements, lien vers l'issue (`Closes #<numéro>`), plan de test.
- Vérifie que les labels de l'issue correspondent aux changements effectués.

## Format de réponse attendu

```
## Type d'issue
<bug | feature | documentation | question>

## Analyse
<reformulation du problème ou besoin>

## Questions / informations manquantes
<liste ou "Aucune">

## Approche proposée
<description technique de la solution>

## Titre de PR suggéré
<type(scope): sujet #numéro>
```
