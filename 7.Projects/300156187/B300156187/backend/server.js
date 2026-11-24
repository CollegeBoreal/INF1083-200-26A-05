/**
 * API REST — Wonder Food's (Wonderfood's Morchid, Oran)
 * ------------------------------------------------------
 * Serveur Express + SQL Server (package « mssql »).
 *
 * OÙ BRANCHER LA BASE DE DONNÉES
 * -------------------------------
 * 1. Copier .env.example vers .env et remplir DB_SERVER, DB_NAME,
 *    DB_USER et DB_PASSWORD (utilisateur SQL Server, ex. : sa).
 * 2. Créer la base dans SSMS : exécuter sql/schema.sql puis sql/seed.sql.
 * 3. Lancer : npm install puis node server.js
 *
 * La configuration mssql est lue dans les variables d'environnement
 * (voir « config » ci-dessous). Si la base n'est pas joignable
 * (SQL Server éteint, .env absent ou mal rempli), l'API RETOMBE
 * automatiquement sur des données en mémoire, identiques au seed
 * (les 15 plats et la succursale de demo-data.ts) : l'application
 * fonctionne alors en mode DÉMO sans base de données.
 *
 * ⚠️ Le mode démo sans BD est un REPLI TEMPORAIRE, uniquement pour
 * tester l'application sans SQL Server. En production (si le
 * restaurant achète l'app), la base SQL Server doit être en place :
 * les commandes et réservations créées en mode démo ne sont PAS
 * sauvegardées (elles disparaissent au redémarrage du serveur).
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------ */
/* Configuration SQL Server — lue depuis le fichier .env               */
/* ------------------------------------------------------------------ */
const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'restaurant_app',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false, // true seulement si SQL Server impose le chiffrement (Azure)
    trustServerCertificate: true, // certificat auto-signé accepté en local
  },
};

// Pool de connexions, créé paresseusement au premier appel à la BD.
let poolPromise = null;
let dbAvailable = null; // null = pas encore testé, true/false = résultat du test

function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config).catch((err) => {
      console.warn('⚠️  SQL Server injoignable, mode démo en mémoire :', err.message);
      poolPromise = null;
      dbAvailable = false;
      return null;
    });
  }
  return poolPromise;
}

async function isDbAvailable() {
  if (dbAvailable !== null) return dbAvailable;
  const pool = await getPool();
  dbAvailable = pool !== null && pool.connected;
  return dbAvailable;
}

/* ------------------------------------------------------------------ */
/* Données en mémoire (MODE DÉMO) — copie exacte de demo-data.ts       */
/* Utilisées uniquement si SQL Server n'est pas joignable.              */
/* ------------------------------------------------------------------ */
const DEMO_BRANCHES = [
  {
    id: 1,
    name: "Wonderfood's Morchid",
    address: 'Morchid, Oran',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
];

const DEMO_DISHES = [
  {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella fondante, basilic frais.',
    price: 600,
    category: 'Pizzas',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    popular: true,
  },
  {
    id: 2,
    name: 'Pizza 4 Fromages',
    description: 'Mozzarella, gorgonzola, parmesan et chèvre, crème fraîche.',
    price: 900,
    category: 'Pizzas',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    popular: true,
  },
  {
    id: 3,
    name: 'Pizza Poulet',
    description: 'Poulet mariné, sauce tomate, mozzarella, poivrons grillés.',
    price: 750,
    category: 'Pizzas',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    popular: false,
  },
  {
    id: 4,
    name: 'Burger Classique',
    description: 'Bœuf grillé, cheddar, salade, tomate, sauce maison.',
    price: 500,
    category: 'Burgers',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    popular: true,
  },
  {
    id: 5,
    name: 'Burger Poulet Crispy',
    description: 'Poulet croustillant, cheddar, coleslaw, sauce blanche.',
    price: 650,
    category: 'Burgers',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    popular: false,
  },
  {
    id: 6,
    name: 'Tacos Poulet',
    description: 'Tortilla grillée, poulet mariné, frites, sauce fromagère.',
    price: 600,
    category: 'Tacos',
    image:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    popular: true,
  },
  {
    id: 7,
    name: 'Tacos Mixte',
    description: 'Poulet et viande hachée, frites, sauce fromagère, sauce algérienne.',
    price: 700,
    category: 'Tacos',
    image:
      'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    popular: false,
  },
  {
    id: 8,
    name: 'Panuzzo Poulet',
    description: 'Pâte à pizza dorée, poulet, fromage fondu, sauce blanche.',
    price: 500,
    category: 'Sandwichs',
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    popular: true,
  },
  {
    id: 9,
    name: 'Sandwich Poulet',
    description: 'Pain frais, poulet grillé, salade, tomate, sauce au choix.',
    price: 450,
    category: 'Sandwichs',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    popular: false,
  },
  {
    id: 10,
    name: 'Crêpe Nutella',
    description: 'Crêpe fine, Nutella fondant, noisettes concassées.',
    price: 350,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    popular: true,
  },
  {
    id: 11,
    name: 'Cake Dubaï',
    description: 'Cake pistache et chocolat, la spécialité tendance.',
    price: 600,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    popular: false,
  },
  {
    id: 12,
    name: 'Tiramisu',
    description: 'Mascarpone onctueux, café et cacao, la douceur italienne.',
    price: 400,
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    popular: false,
  },
  {
    id: 13,
    name: 'Jus Frais',
    description: 'Jus pressé minute, sans sucre ajouté.',
    price: 200,
    category: 'Boissons',
    image:
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    popular: false,
  },
  {
    id: 14,
    name: 'Milkshake',
    description: 'Lait frais mixé, glace vanille, chantilly.',
    price: 350,
    category: 'Boissons',
    image:
      'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    popular: false,
  },
  {
    id: 15,
    name: 'Boisson 33 cl',
    description: 'Boisson gazeuse fraîche, 33 cl.',
    price: 100,
    category: 'Boissons',
    image:
      'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    popular: false,
  },
];

// Compte démo — mot de passe « demo1234 », stocké HASHÉ (bcrypt, 10 tours),
// jamais en clair. Même hash que dans sql/seed.sql.
const DEMO_USER = {
  id: 1,
  name: 'Utilisateur Démo',
  email: 'demo@restaurant.com',
  phone: '0550 12 34 56',
  password_hash:
    '$2b$10$j22LCkLy/W8RIHtNRuKeS.FGxKeNGz0yRQ7DzLOGFfMRZZnj7qG2a',
};

// Commandes et réservations créées en mode démo (perdues au redémarrage).
const demoOrders = [];
const demoReservations = [];
let demoOrderId = 1;
let demoReservationId = 1;

// Pour ne jamais renvoyer le hash du mot de passe au client.
function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone };
}

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

// Santé de l'API
app.get('/', (req, res) => {
  res.json({ message: "API Wonder Food's", status: 'ok' });
});

/* --- Succursales --- */
app.get('/api/branches', async (req, res) => {
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool.request().query('SELECT * FROM branches ORDER BY id');
      return res.json(result.recordset);
    }
  } catch (err) {
    console.warn('GET /api/branches — erreur BD, repli démo :', err.message);
  }
  res.json(DEMO_BRANCHES);
});

/* --- Plats --- */
app.get('/api/dishes', async (req, res) => {
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool.request().query(`
        SELECT d.id, d.name, d.description, d.price, c.name AS category,
               d.image, d.rating, CAST(d.popular AS BIT) AS popular
        FROM dishes d
        JOIN categories c ON c.id = d.category_id
        ORDER BY d.id
      `);
      const dishes = result.recordset.map((d) => ({ ...d, popular: !!d.popular }));
      return res.json(dishes);
    }
  } catch (err) {
    console.warn('GET /api/dishes — erreur BD, repli démo :', err.message);
  }
  res.json(DEMO_DISHES);
});

app.get('/api/dishes/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query(`
          SELECT d.id, d.name, d.description, d.price, c.name AS category,
                 d.image, d.rating, CAST(d.popular AS BIT) AS popular
          FROM dishes d
          JOIN categories c ON c.id = d.category_id
          WHERE d.id = @id
        `);
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Plat introuvable' });
      }
      const dish = result.recordset[0];
      return res.json({ ...dish, popular: !!dish.popular });
    }
  } catch (err) {
    console.warn('GET /api/dishes/:id — erreur BD, repli démo :', err.message);
  }
  const dish = DEMO_DISHES.find((d) => d.id === id);
  if (!dish) return res.status(404).json({ error: 'Plat introuvable' });
  res.json(dish);
});

/* --- Authentification --- */
// POST /api/login { email, password } → { user } ou 401
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('email', sql.NVarChar(150), email)
        .query('SELECT * FROM users WHERE email = @email');
      const user = result.recordset[0];
      if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      // bcrypt.compare : compare le mot de passe saisi avec le hash stocké.
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      return res.json({ user: publicUser(user) });
    }
  } catch (err) {
    console.warn('POST /api/login — erreur BD, repli démo :', err.message);
  }
  // Mode démo : demo@restaurant.com / demo1234
  if (email === DEMO_USER.email && (await bcrypt.compare(password, DEMO_USER.password_hash))) {
    return res.json({ user: publicUser(DEMO_USER) });
  }
  res.status(401).json({ error: 'Email ou mot de passe incorrect' });
});

// POST /api/register { name, email, phone, password } → { user } ou 400
// Le mot de passe est HASHÉ avec bcrypt avant d'être stocké, jamais en clair.
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Nom, email, téléphone et mot de passe requis' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
  }
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const existing = await pool
        .request()
        .input('email', sql.NVarChar(150), email)
        .query('SELECT id FROM users WHERE email = @email');
      if (existing.recordset.length > 0) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }
      const password_hash = await bcrypt.hash(password, 10);
      const result = await pool
        .request()
        .input('name', sql.NVarChar(100), name)
        .input('email', sql.NVarChar(150), email)
        .input('phone', sql.NVarChar(30), phone)
        .input('password_hash', sql.NVarChar(200), password_hash)
        .query(
          'INSERT INTO users (name, email, phone, password_hash) OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.phone VALUES (@name, @email, @phone, @password_hash)'
        );
      return res.status(201).json({ user: result.recordset[0] });
    }
  } catch (err) {
    console.warn('POST /api/register — erreur BD, repli démo :', err.message);
  }
  // Mode démo : l'utilisateur n'est pas persisté (perdu au redémarrage).
  if (email === DEMO_USER.email) {
    return res.status(400).json({ error: 'Cet email est déjà utilisé' });
  }
  res.status(201).json({
    user: { id: Date.now(), name, email, phone },
    demo: true,
    message: 'Compte créé en mode démo (non persisté sans base de données).',
  });
});

/* --- Commandes --- */
app.get('/api/orders', async (req, res) => {
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool.request().query(`
        SELECT o.id, o.user_id, o.total, o.status, o.created_at,
               (SELECT oi.dish_id, oi.quantity, oi.price
                FROM order_items oi WHERE oi.order_id = o.id
                FOR JSON PATH) AS items_json
        FROM orders o ORDER BY o.created_at DESC
      `);
      const orders = result.recordset.map((o) => ({
        id: o.id,
        user_id: o.user_id,
        total: o.total,
        status: o.status,
        created_at: o.created_at,
        items: o.items_json ? JSON.parse(o.items_json) : [],
      }));
      return res.json(orders);
    }
  } catch (err) {
    console.warn('GET /api/orders — erreur BD, repli démo :', err.message);
  }
  res.json(demoOrders);
});

// POST /api/orders { user_id, total, items: [{ dish_id, quantity, price }] }
app.post('/api/orders', async (req, res) => {
  const { user_id, total, items } = req.body || {};
  if (total == null || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Total et articles de la commande requis' });
  }
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const tx = new sql.Transaction(pool);
      await tx.begin();
      try {
        const reqOrder = new sql.Request(tx);
        const orderResult = await reqOrder
          .input('user_id', sql.Int, user_id || null)
          .input('total', sql.Int, total)
          .query(
            "INSERT INTO orders (user_id, total, status) OUTPUT INSERTED.id VALUES (@user_id, @total, 'en attente')"
          );
        const orderId = orderResult.recordset[0].id;
        for (const item of items) {
          await new sql.Request(tx)
            .input('order_id', sql.Int, orderId)
            .input('dish_id', sql.Int, item.dish_id)
            .input('quantity', sql.Int, item.quantity)
            .input('price', sql.Int, item.price)
            .query(
              'INSERT INTO order_items (order_id, dish_id, quantity, price) VALUES (@order_id, @dish_id, @quantity, @price)'
            );
        }
        await tx.commit();
        return res.status(201).json({ id: orderId, user_id: user_id || null, total, status: 'en attente', items });
      } catch (err) {
        await tx.rollback();
        throw err;
      }
    }
  } catch (err) {
    console.warn('POST /api/orders — erreur BD, repli démo :', err.message);
  }
  // Mode démo : commande gardée en mémoire seulement.
  const order = { id: demoOrderId++, user_id: user_id || null, total, status: 'en attente', items, created_at: new Date().toISOString() };
  demoOrders.push(order);
  res.status(201).json(order);
});

/* --- Réservations --- */
app.get('/api/reservations', async (req, res) => {
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool
        .request()
        .query('SELECT * FROM reservations ORDER BY reservation_date, reservation_time');
      return res.json(result.recordset);
    }
  } catch (err) {
    console.warn('GET /api/reservations — erreur BD, repli démo :', err.message);
  }
  res.json(demoReservations);
});

// POST /api/reservations { user_id?, name, phone, reservation_date, reservation_time, persons }
app.post('/api/reservations', async (req, res) => {
  const { user_id, name, phone, reservation_date, reservation_time, persons } = req.body || {};
  if (!name || !phone || !reservation_date || !reservation_time || !persons) {
    return res.status(400).json({
      error: 'Nom, téléphone, date, heure et nombre de personnes requis',
    });
  }
  try {
    if (await isDbAvailable()) {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('user_id', sql.Int, user_id || null)
        .input('name', sql.NVarChar(100), name)
        .input('phone', sql.NVarChar(30), phone)
        .input('reservation_date', sql.Date, reservation_date)
        .input('reservation_time', sql.NVarChar(10), reservation_time)
        .input('persons', sql.Int, persons)
        .query(
          'INSERT INTO reservations (user_id, name, phone, reservation_date, reservation_time, persons) OUTPUT INSERTED.id VALUES (@user_id, @name, @phone, @reservation_date, @reservation_time, @persons)'
        );
      return res.status(201).json({
        id: result.recordset[0].id,
        user_id: user_id || null,
        name,
        phone,
        reservation_date,
        reservation_time,
        persons,
      });
    }
  } catch (err) {
    console.warn('POST /api/reservations — erreur BD, repli démo :', err.message);
  }
  // Mode démo : réservation gardée en mémoire seulement.
  const reservation = {
    id: demoReservationId++,
    user_id: user_id || null,
    name,
    phone,
    reservation_date,
    reservation_time,
    persons,
    created_at: new Date().toISOString(),
  };
  demoReservations.push(reservation);
  res.status(201).json(reservation);
});

/* ------------------------------------------------------------------ */
app.listen(PORT, () => {
  console.log(`API Wonder Food's en écoute sur le port ${PORT}`);
});
