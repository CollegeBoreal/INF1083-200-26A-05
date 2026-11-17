#300151609
# Lab : RxJS et Template Driven Forms avec NativeScript Angular

![NativeScript](https://img.shields.io/badge/NativeScript-8.x-blue)
![Angular](https://img.shields.io/badge/Angular-17%2B-red)
![RxJS](https://img.shields.io/badge/RxJS-7.x-purple)

**Étudiant :** Saadi Ramz Eddine
**Matricule :** <300151609>
**Cours :** INF1083


---

## Objectifs

- Comprendre les observables RxJS et les flux asynchrones.
- Consommer une API REST avec `HttpClient`.
- Transformer les données avec les opérateurs `map` et `catchError`.
- Utiliser un formulaire *Template Driven* avec `[(ngModel)]`.
- Afficher une collection dans un `ListView`.

## Pourquoi RxJS ?

RxJS permet de manipuler des flux de données asynchrones à l'aide d'observables.
Contrairement à une `Promise`, un `Observable` peut émettre plusieurs valeurs,
être annulé et être transformé par une chaîne d'opérateurs (`pipe`).

| Approche | Caractéristique |
|----------|-----------------|
| Callback / Promise | Une seule valeur, non annulable |
| Observable RxJS | Flux de valeurs, annulable, composable |

## Architecture

| Fichier | Rôle |
|---------|------|
| `shared/country.ts` | Modèle de données |
| `shared/apicall.service.ts` | Service HTTP, retourne un `Observable<Country[]>` |
| `search/search.component.ts` | Logique : saisie, appel au service, souscription |
| `search/search.component.html` | Interface : champ, bouton, liste |
| `search/search.module.ts` | Import de `NativeScriptFormsModule` |
| `app.module.ts` | Import de `NativeScriptHttpClientModule` |

## Flux de données

```
Utilisateur saisit une capitale
        ↓  [(ngModel)]="name"
(tap)="searchCapital()"
        ↓
ApicallService.searchCountryByName()
        ↓  HttpClient.get()
API REST
        ↓  Observable<any[]>
pipe( map → Country[] , catchError )
        ↓  subscribe()
this.countries
        ↓  [items]="countries"
ListView
```

## Installation

```bash
ns create b<TonMatricule> --template @nativescript/template-tab-navigation-ng
cd b<TonMatricule>
ns run android     # ou : ns run ios
```

## Utilisation

1. Ouvrir l'onglet **Search**.
2. Saisir le nom d'une capitale, par exemple `Ottawa` ou `Paris`.
3. Appuyer sur **Search**.
4. Le ou les pays correspondants s'affichent dans la liste.

## Résultat



Sortie console :

```json
[{"id":0,"name":"Canada","capital":"Ottawa"}]
```

## Notes techniques

- `NativeScriptHttpClientModule` est obligatoire pour injecter `HttpClient`.
- `NativeScriptFormsModule` est obligatoire pour utiliser `[(ngModel)]`.
- `catchError` renvoie un nouvel observable d'erreur ; l'erreur est traitée
  dans le bloc `error` de `subscribe`.
- `NO_ERRORS_SCHEMA` permet à Angular d'accepter les balises NativeScript
  (`<TextField>`, `<ListView>`, etc.).

## Difficultés rencontrées

| Problème | Solution |
|----------|----------|
| `No provider for HttpClient` | Ajouter `NativeScriptHttpClientModule` dans `app.module.ts` |
| `ngModel` sans effet | Ajouter `NativeScriptFormsModule` dans `search.module.ts` |
| Liste vide malgré une réponse | Vérifier la structure JSON renvoyée par l'API dans l'opérateur `map` |


<image src=images/698662868-6273eed7-7587-4fa4-b5c4-47869ac3f728.png
 width=50% height=50% > </image>
## Références

- RxJS : https://rxjs.dev/guide/overview
- HTTP avec RxJS : https://www.pluralsight.com/guides/using-http-with-rxjs-observables
- NativeScript Angular : https://docs.nativescript.org/guide/angular
