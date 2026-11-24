# API Wonder Food's — Backend

API REST (Express + SQL Server) de l'application restaurant
**Wonder Food's** — succursale Wonderfood's Morchid, Oran.
INF1083 — Collège Boréal.

## Lancer l'API

```bash
cd backend
npm install
cp .env.example .env   # puis remplir DB_USER et DB_PASSWORD dans .env
node server.js
```

L'API écoute sur le port **3000** :
`API Wonder Food's en écoute sur le port 3000`

> ⚠️ Ne jamais commiter le vrai fichier `.env` (il contient le mot de
> passe SQL Server). Seul `.env.example` est versionné.

> Sans base de données joignable, l'API fonctionne en **mode démo** :
> elle sert les mêmes 15 plats et la même succursale depuis la mémoire
> (copie de `demo-data.ts`). C'est un repli temporaire pour tester
> l'application — les commandes et réservations créées en mode démo
> ne sont pas sauvegardées. En production, la base SQL Server doit
> être en place.

## Créer la base de données (SSMS)

1. Ouvrir **SQL Server Management Studio** et se connecter au serveur.
2. Exécuter `sql/schema.sql` — crée la base `restaurant_app` et les
   7 tables (`branches`, `categories`, `dishes`, `users`, `orders`,
   `order_items`, `reservations`).
3. Exécuter `sql/seed.sql` — insère la succursale Wonderfood's Morchid,
   les 6 catégories, les 15 plats et l'utilisateur démo.

Les deux scripts sont réexécutables sans erreur (vérifications
`IF NOT EXISTS`) et ne créent pas de doublons.

Compte démo : **demo@restaurant.com** / **demo1234**
(mot de passe stocké hashé avec bcrypt, jamais en clair).

## Endpoints

| Méthode | Route | Description |
| ------- | ----- | ----------- |
| GET | `/api/branches` | Liste des succursales |
| GET | `/api/dishes` | Liste des plats (avec catégorie) |
| GET | `/api/dishes/:id` | Un plat par son id |
| POST | `/api/login` | Connexion `{ email, password }` |
| POST | `/api/register` | Inscription `{ name, email, phone, password }` (mot de passe hashé bcrypt) |
| GET | `/api/orders` | Liste des commandes |
| POST | `/api/orders` | Créer une commande `{ user_id, total, items: [{ dish_id, quantity, price }] }` |
| GET | `/api/reservations` | Liste des réservations |
| POST | `/api/reservations` | Créer une réservation `{ user_id?, name, phone, reservation_date, reservation_time, persons }` |

## Fichiers

- `server.js` — serveur Express (port 3000), repli démo en mémoire si SQL Server est injoignable
- `package.json` — dépendances : express, mssql, bcryptjs, cors, dotenv
- `.env.example` — modèle de configuration (à copier vers `.env`)
- `sql/schema.sql` — création de la base et des tables
- `sql/seed.sql` — succursale, catégories, 15 plats, utilisateur démo
