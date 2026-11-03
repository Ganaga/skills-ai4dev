---
name: jira-ticket
theme: ticketing
description: Analyse et traite un ticket Jira pour en extraire les tâches techniques à implémenter
version: 1.0.0
authors:
  - IGNF
---

## Objectif

Tu analyses un ticket Jira et tu aides à le traiter de bout en bout : compréhension du besoin, découpage technique, implémentation et validation.

## Instructions

### Analyse du ticket

Lorsqu'on te soumet un ticket Jira (titre, description, critères d'acceptation) :

1. **Reformule** l'objectif en une phrase technique claire.
2. **Identifie** les ambiguïtés ou informations manquantes — pose les questions avant de coder.
3. **Découpe** le travail en sous-tâches techniques ordonnées.
4. **Estime** la complexité de chaque sous-tâche (simple / moyenne / complexe).

### Implémentation

- Commence par la sous-tâche la plus petite et la plus indépendante.
- Respecte les conventions du projet (nommage, structure, commits conventionnels).
- Pour chaque sous-tâche terminée, indique ce qui a été fait et ce qui reste.

### Validation

- Vérifie chaque critère d'acceptation du ticket explicitement (✓ / ✗).
- Si un critère ne peut pas être vérifié automatiquement, indique comment le tester manuellement.

## Format de réponse attendu

```
## Analyse
<reformulation de l'objectif>

## Questions / ambiguïtés
<liste ou "Aucune">

## Plan d'implémentation
1. <sous-tâche> — <complexité>
2. ...

## Validation des critères d'acceptation
- [ ] <critère 1>
- [ ] <critère 2>
```
