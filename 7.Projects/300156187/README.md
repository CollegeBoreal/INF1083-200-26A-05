# 🍔 Wonder Food's — Application mobile de restaurant

> Projet final du cours **INF1083 — Développement mobile (NativeScript)**,
> Collège Boréal, session automne 2026.
> Étudiant : **Idir Islam Chili — 🆔 300156187**

## ✅ Exigences de l'énoncé (7.Projects)

| Exigence du professeur | Où la trouver dans ce projet |
|---|---|
| 📁 Répertoire avec son 🆔 + `README.md` + répertoire `images` 🖼️ | Ce dossier : `300156187/` contient ce `README.md` et le dossier `images/` |
| 📝 Présenter le projet en un bref résumé | Section [📝 Bref résumé](#-bref-résumé-du-projet) |
| 📱 Donner le nom de l'application | Section [📱 Nom de l'application](#-nom-de-lapplication) |
| 🎨 Faire un design manuel (si souhaité) | Section [🎨 Design](#-design) — inspiré de « Foodie » (@dailyflutterui) |
| 🛠️ Donner les `templates` (patrons) utilisés | Section [🛠️ Technique](#technique) |
| 🧩 Donner les `plugins` | Section [🛠️ Technique](#technique) + [🔗 market.nativescript.org](https://market.nativescript.org) |
| 📄 Un minimum de 3 pages (onglets/menu) | **8 écrans** — voir [📄 Pages](#pages--8-écrans) |

## 📱 Nom de l'application

**Wonder Food's** — nom du vrai restaurant, repris de son enseigne (grand W
jaune et bandeau rouge « WONDER FOOD'S »). L'identifiant technique de
l'application est `com.restaurant.app`.

## 📝 Bref résumé du projet

**Wonder Food's** est une application mobile de commande pour le restaurant
**Wonderfood's Morchid, à Oran** (Algérie). Le client commande aujourd'hui par
WhatsApp ou par téléphone (0549 88 13 63) : l'application lui donne un menu
clair avec photos et prix, un panier, et la possibilité de réserver une table,
le tout depuis son téléphone.

L'application est développée en **NativeScript + Angular**. Elle fonctionne
avec des **données de démonstration** : une seule succursale (Wonderfood's
Morchid, Oran), 15 plats avec des prix démo en dinars algériens (100 à
900 DA), et un compte démo. Une **API Node.js + Express** et une **base de
données SQL Server** sont fournies avec le projet : quand le restaurant
acceptera l'application, les vrais plats et les vrais prix seront saisis dans
la base de données, sans toucher au code de l'application.

## 🎨 Design

Le design est **inspiré de l'application « Foodie » du créateur
@dailyflutterui** (TikTok / Instagram) : cartes blanches arrondies et aérées,
grille de plats en deux colonnes, chips de catégories espacées, beaucoup d'air
entre les sections. Ce n'est pas une copie : les couleurs et l'identité sont
celles de Wonder Food's. La navigation se fait par **tiroir latéral** (menu
coulissant, bouton ☰ sur l'accueil ou glissement depuis le bord gauche),
comme dans le laboratoire 6 du cours.

Finition « platine » premium : fonds clairs #F5F5F7, séparateurs et bordures
#E5E4E2, cartes blanches aux coins très arrondis (16 à 20) avec des ombres
douces et diffuses, typographie soignée et espacements constants sur tous les
écrans. L'accent de la marque est l'orange #E86A17, repris du logo.

**🌙 Mode sombre** : disponible sur tous les écrans (bouton lune/soleil sur
l'accueil, ou ligne « Mode sombre » dans le profil). Fond sombre #171210,
cartes #2A211B, textes clairs — aucun écran ne reste en clair quand le mode
sombre est activé.

Le logo de l'application est le vrai logo du restaurant (W jaune et bandeau
rouge « WONDER FOOD'S »), affiché sur l'écran de connexion.

## 🛠️ Technique

- **🧱 Template (patron) utilisé :** `@nativescript/template-drawer-navigation-ng`
  (tiroir latéral NativeScript + Angular — exactement la base du
  **laboratoire 6 Animations** du cours, qui fonctionne sur téléphone :
  Angular 22, NativeScript 9.1.3, mêmes versions, même
  `package-lock.json`).
- **🧩 Plugins :**
  - `nativescript-ui-sidedrawer` (~15.2.0) — le tiroir latéral (RadSideDrawer).
  - Modules officiels NativeScript et Angular : `@nativescript/angular`,
    `@nativescript/core`, `@nativescript/theme` (thème et styles).
  - Aucun autre plugin.
  - Voir les plugins disponibles sur [🔗 market.nativescript.org](https://market.nativescript.org).
- **⚙️ Versions :** Angular ~22.0.0, @nativescript/core ~9.1.0 (9.1.3
  installé), @nativescript/theme ^3.1.0, TypeScript ~6.0.0,
  zone.js ~0.16.0, @nativescript/webpack ~5.0.25.

## 📄 Pages — 8 écrans

Bien au-delà du minimum de 3 pages requis par l'énoncé :

1. 🔐 **Connexion** (avec bouton « Essayer la démo » et lien « Créer un compte »)
2. 🏠 **Accueil** (recherche, catégories, restaurants, plats populaires)
3. 🍕 **Menu** (grille de plats en 2 colonnes, recherche, filtres par catégorie)
4. 🍽️ **Détail d'un plat** (photo, description, quantité, ajout au panier)
5. 🛒 **Panier** (quantités, sous-total, commande)
6. 📅 **Réservations** (formulaire + liste de mes réservations)
7. 👤 **Profil** (compte, mode sombre, mes commandes, déconnexion)
8. 📝 **Inscription** (création de compte locale)

## ✨ Animations

- 🔐 Écran de connexion animé (apparition en fondu `fadeUp`, champs
  décalés un par un).
- ⏳ **Shimmer / skeleton** pendant le chargement des plats (accueil, menu,
  détail d'un plat).
- ↔️ Transitions douces entre les écrans et ouverture animée du tiroir
  latéral.

## 🗄️ Base de données et API

- **Base de données :** SQL Server (`restaurant_app`), servie par une API
  Node.js + Express (`backend/`). L'application essaie d'abord l'API, puis
  retombe sur les données démo si l'API est injoignable.
- **Tables (7) :** branches, categories, dishes, users, orders, order_items,
  reservations.

## 🔐 Compte démo

- 📧 Email : `demo@restaurant.com`
- 🔑 Mot de passe : `demo1234`
- Ou, sur l'écran de connexion, bouton **« Essayer la démo »** (remplit les
  champs automatiquement).

## 🚀 Lancer l'application

1. Dézipper le projet.
2. Ouvrir un terminal dans le dossier de l'application (`B300156187`) :
   ```
   npm install
   ```
3. Lancer l'aperçu sur téléphone :
   ```
   ns preview --no-hmr
   ```
   Puis scanner le code QR avec l'application **NativeScript Preview**.
   (Ne pas utiliser HMR : il casse l'aperçu, toujours `--no-hmr`.)
4. Se connecter avec le compte démo ou le bouton « Essayer la démo ».

> ✅ **Test réussi le 20 novembre 2026 sur iPhone** (`npm install` puis
> `ns preview --no-hmr`) : l'écran de connexion s'affiche, la navigation
> par tiroir fonctionne, le mode sombre fonctionne sur tous les écrans.

> Si l'API tourne sur le même PC, l'application l'appelle à
> `http://10.0.2.2:3000/api` (émulateur Android). Sur iPhone avec
> `ns preview`, mettre l'adresse IP LAN du PC dans
> `src/app/services/api.config.ts` (par exemple
> `http://192.168.1.X:3000/api`).

## 🖥️ Lancer l'API et la base de données

### 🗄️ Base de données (SQL Server, dans SSMS)

1. Ouvrir SQL Server Management Studio, se connecter au serveur local.
2. Exécuter `backend/sql/schema.sql` (crée la base `restaurant_app` et les
   7 tables : branches, categories, dishes, users, orders, order_items,
   reservations).
3. Exécuter `backend/sql/seed.sql` (remplit la base : 1 succursale, 6
   catégories, les 15 plats démo, l'utilisateur démo demo@restaurant.com —
   mot de passe stocké sous forme de hash bcrypt, jamais en clair).

### 🌐 API (Node.js + Express)

1. Ouvrir un terminal dans le dossier `B300156187/backend` :
   ```
   npm install
   ```
2. Copier `.env.example` vers `.env` et remplir `DB_USER` et `DB_PASSWORD`
   avec l'utilisateur SQL Server (ne jamais commiter le vrai `.env`).
3. Lancer :
   ```
   node server.js
   ```
   Message attendu : « API Wonder Food's en écoute sur le port 3000 ».
   Sans base de données joignable, l'API fonctionne en mode démo (données en
   mémoire) pour que l'application reste utilisable.

Endpoints : `GET /api/branches`, `GET /api/dishes`, `GET /api/dishes/:id`,
`POST /api/login`, `POST /api/register`, `GET /api/orders`,
`POST /api/orders`, `GET /api/reservations`, `POST /api/reservations`.
Voir `backend/README.md` pour le détail.

## 📂 Structure du projet

```
300156187/
├── README.md                    ← ce fichier
├── images/                      ← captures d'écran de l'application
└── B300156187/                  ← projet NativeScript + Angular
    ├── package.json / package-lock.json ← versions exactes du laboratoire 6
    ├── nativescript.config.ts   ← id com.restaurant.app
    ├── webpack.config.js
    ├── tsconfig.json
    ├── App_Resources/           ← Android (label « Wonder Food's ») et iOS
    ├── src/
    │   ├── main.ts              ← démarrage (modèle du laboratoire 6)
    │   ├── polyfills.ts         ← polyfills officiels (globaux + zone.js)
    │   ├── fonts/               ← Font Awesome (icônes du tiroir)
    │   ├── _app-common.scss     ← styles globaux + mode sombre global
    │   ├── app.ios.scss / app.android.scss
    │   └── app/
    │       ├── app.module.ts / app-routing.module.ts / app.component.*
    │       ├── models/models.ts
    │       ├── data/demo-data.ts      ← données démo (15 plats)
    │       ├── images/logo-wonderfood.png
    │       ├── services/              ← theme, auth, data, cart, reservations, guard
    │       └── components/            ← login, register, home, menu,
    │                                    dish-detail, cart, reservations, profile
    └── backend/                 ← API Express + SQL Server
        ├── package.json / server.js / .env.example / README.md
        └── sql/schema.sql / sql/seed.sql
```

> Dans le ZIP de remise, le dossier de l'application s'appelle `Wonderfood` ;
> une fois copié dans le dépôt du cours, il devient `B300156187`.

## 🖼️ Captures d'écran

Les captures sont dans le dossier `images/` :

- `Wonderpic_1.jpg` — ⭐ présentation de l'application sur fond marbre :
  3 iPhones (tiroir latéral, accueil, menu), titre « WONDERFOOD'S MORCHID -
  APPLICATION MOBILE ». Vraies captures de l'application sur iPhone.
- `Wonderpic_2.jpg` — ⭐ vues de l'interface sur fond marbre : 3 iPhones
  (menu boissons, panier, réservations), titre « VUES DE L'INTERFACE DE
  L'APPLICATION ». Vraies captures de l'application sur iPhone.
- `login.png`, `dish-detail.png`, `profile.png` — aperçus de l'interface
  générés pour la remise ; ils seront remplacés par de vraies captures de
  l'application sur téléphone.

## ⚠️ État et limites connues

- ✅ L'application est construite sur la base exacte du laboratoire 6
  (même `package-lock.json`, mêmes polyfills officiels, même tiroir
  latéral) et **elle s'affiche sur iPhone** (test réussi le 20 novembre
  2026 : connexion, tiroir, menu, panier, réservations, mode sombre).
- 🔧 Sur l'accueil, choisir une catégorie sans plat populaire (ex.
  « Boissons ») affiche « Aucun plat trouvé » : le filtre s'applique aux
  plats populaires. À améliorer.
- 📦 Les ressources `App_Resources` sont minimales (pas d'icônes mipmap ni de
  `drawable/launch_screen`) : si un build les exige, les copier depuis le
  projet du laboratoire 6
  (`6.Animations/300156187/b300156187/App_Resources/`).
- 💾 Le mode démo de l'API ne persiste pas les commandes ni les réservations
  (perdues au redémarrage du serveur) ; avec la base SQL Server branchée,
  tout est persisté.
- 🖼️ Les images des plats viennent d'Unsplash (liens de démonstration) ; elles
  seront remplacées par les vraies photos du restaurant quand il acceptera
  l'application.

© 2026 Idir Islam Chili — Tous droits réservés
