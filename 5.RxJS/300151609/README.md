#300151609
# Lab RxJS — Accès aux données avec HttpClient et Template Driven Forms

![NativeScript](https://img.shields.io/badge/NativeScript-Angular-blue)
![RxJS](https://img.shields.io/badge/RxJS-Observables-d81b60)

**Étudiant :** Prénom Nom  
**Numéro étudiant :** `300151609`  
**Cours :** INF1083  
**Collège :** Collège Boréal  

---

## 🎯 Objectifs

- Comprendre l'utilisation de **RxJS** et des `Observable` pour gérer les flux de données asynchrones.
- Consommer une API REST avec **`HttpClient`** (`NativeScriptHttpClientModule`).
- Utiliser les **Template Driven Forms** avec le binding bidirectionnel `[(ngModel)]` (`NativeScriptFormsModule`).
- Afficher dynamiquement les résultats dans un composant **`ListView`**.

---

## 📁 Architecture du projet

| Fichier | Rôle |
|---------|------|
| `src/app/shared/country.ts` | Modèle de données `Country` (`id`, `name`, `capital`) |
| `src/app/shared/apicall.service.ts` | Service Angular appelant l'API avec `HttpClient`, `map` et `catchError` |
| `src/app/search/search.component.ts` | Logique de recherche et souscription à l'`Observable<Country[]>` |
| `src/app/search/search.component.html` | Interface utilisateur (`TextField`, `Button`, `ListView`) |
| `src/app/app.module.ts` | Importation de `NativeScriptHttpClientModule` |
| `src/app/search/search.module.ts` | Importation de `NativeScriptFormsModule` |

---

## ⚙️ Installation et exécution

```bash
# 1. Créer le projet basé sur le template Tab Navigation
ns create b300151609 --template @nativescript/template-tab-navigation-ng
cd b300151609

# 2. Lancer l'application
ns run android   # ou : ns run ios
```

---

## 🔄 Fonctionnement

1. L'utilisateur saisit le nom d'une capitale (ex. `Ottawa`) dans le champ `TextField` lié par `[(ngModel)]="name"`.
2. L'appui sur le bouton **Search** déclenche `(tap)="searchCapital()"`.
3. `ApicallService.searchCountryByName()` envoie une requête HTTP `GET` vers l'API, transforme les données avec l'opérateur RxJS `map` et gère les erreurs avec `catchError`.
4. `SearchComponent` s'abonne à l'`Observable<Country[]>` et met à jour le tableau `countries` lié au `ListView` (`[items]="countries"`).

---

## 🖼️ Résultats

<p align="center">
  <img src="images/app.png" alt="Recherche de capitale dans l'application" width="300" />
  <img src="images/console.png" alt="Sortie console RxJS" width="450" />
</p>

Exemple de sortie dans la console pour la recherche **`Ottawa`** :

```json
[
  {
    "id": 0,
    "name": "Canada",
    "capital": "Ottawa"
  }
]
```

---

## 📚 Références

- [Documentation RxJS](https://rxjs.dev/guide/overview)
- [Documentation NativeScript Angular](https://docs.nativescript.org/guide/angular)
- [Using HTTP with RxJS Observables](https://www.pluralsight.com/guides/using-http-with-rxjs-observables)
