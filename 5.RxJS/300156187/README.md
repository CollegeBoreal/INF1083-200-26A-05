# 📱 Labo 5 - RxJS - Recherche de pays

Étudiant : Idir Islam Chili

## 📖 Description
Application NativeScript + Angular qui permet de rechercher un pays
par le nom de sa capitale, avec l'API https://countries.nexperts.nl

Exemple testé dans le navigateur : Paris 🇫🇷 -> France, capitale Paris, capitale Paris, Population : ~68 millions, Continent : Europe.

## 📁 Fichiers
- 🔍 src/app/search/search.component.ts : composant de recherche
- 🌍 src/app/search/country.ts : modèle Country
- 🔗 src/app/search/apicall.service.ts : service HTTP, GET /capital/{name}
- 📦 src/app/app.module.ts : NativeScriptHttpClientModule
- 📝 src/app/search/search.module.ts : NativeScriptFormsModule

## ▶️ Comment lancer
ns preview --no-hmr
ns build android

## ✅ Résultat
- `ns build android` : réussi, APK debug générée.
- API vérifiée : https://countries.nexperts.nl/capital/Paris répond France.