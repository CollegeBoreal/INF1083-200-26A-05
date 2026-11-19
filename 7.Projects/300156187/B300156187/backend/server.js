// ============================================================
// Restaurant API — Node.js + Express + SQL Server (pilote mssql)
// Les mots de passe sont stockés en bcrypt, jamais en clair.
// ============================================================
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const dbConfig = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'restaurant_app',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool = null;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
}

// ---------- Mapping base de données -> format de l'application ----------
function mapDish(row) {
  return {
    id: row.id,
    name: row.nom,
    description: row.description,
    price: Number(row.prix_DA),
    category: row.categorie,
    image: row.image,
    rating: row.note !== null && row.note !== undefined ? Number(row.note) : 4.5,
    popular: Boolean(row.populaire),
  };
}

function mapBranch(row) {
  return {
    id: row.id,
    name: row.nom,
    address: row.adresse,
    city: row.ville,
    phone: row.telephone,
    rating: row.note !== null && row.note !== undefined ? Number(row.note) : 4.5,
    image: row.image,
  };
}

// ---------- Santé ----------
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ---------- Branches ----------
app.get('/api/branches', async (req, res) => {
  try {
    const db = await getPool();
    const result = await db
      .request()
      .query('SELECT id, nom, adresse, ville, telephone, note, image FROM branches ORDER BY id');
    res.json(result.recordset.map(mapBranch));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ---------- Catégories ----------
app.get('/api/categories', async (req, res) => {
  try {
    const db = await getPool();
    const result = await db
      .request()
      .query('SELECT id, nom FROM categories ORDER BY id');
    res.json(result.recordset.map((row) => ({ id: row.id, name: row.nom })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ---------- Plats ----------
const DISH_SELECT = `
  SELECT d.id, d.nom, d.description, d.prix_DA, d.image, d.note, d.populaire, c.nom AS categorie
  FROM dishes d
  INNER JOIN categories c ON c.id = d.category_id
  WHERE d.disponible = 1
`;

app.get('/api/dishes', async (req, res) => {
  try {
    const db = await getPool();
    const result = await db.request().query(DISH_SELECT + ' ORDER BY d.id');
    res.json(result.recordset.map(mapDish));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

app.get('/api/dishes/:id', async (req, res) => {
  try {
    const db = await getPool();
    const result = await db
      .request()
      .input('id', sql.Int, Number(req.params.id))
      .query(DISH_SELECT + ' AND d.id = @id');
    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Plat introuvable.' });
    }
    res.json(mapDish(result.recordset[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ---------- Connexion ----------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
  }
  try {
    const db = await getPool();
    const result = await db
      .request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id, nom, email, mot_de_passe_hash, telephone FROM users WHERE email = @email');
    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }
    const passwordOk = await bcrypt.compare(password, user.mot_de_passe_hash);
    if (!passwordOk) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }
    res.json({
      success: true,
      user: { id: user.id, name: user.nom, email: user.email, phone: user.telephone },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

// ---------- Commandes ----------
app.get('/api/orders', async (req, res) => {
  try {
    const db = await getPool();
    const request = db.request();
    let where = '';
    if (req.query.userId) {
      request.input('userId', sql.Int, Number(req.query.userId));
      where = ' WHERE o.user_id = @userId';
    }
    const result = await request.query(`
      SELECT o.id, o.total_DA, o.statut, o.date_commande,
             oi.dish_id, oi.quantite, oi.prix_unitaire_DA,
             d.nom AS dish_nom, d.image AS dish_image, d.description AS dish_description,
             d.note AS dish_note, d.populaire AS dish_populaire, c.nom AS dish_categorie
      FROM orders o
      INNER JOIN order_items oi ON oi.order_id = o.id
      INNER JOIN dishes d ON d.id = oi.dish_id
      INNER JOIN categories c ON c.id = d.category_id
      ${where}
      ORDER BY o.date_commande DESC
    `);
    const orders = {};
    for (const row of result.recordset) {
      if (!orders[row.id]) {
        orders[row.id] = {
          id: 'CMD-' + row.id,
          items: [],
          total: Number(row.total_DA),
          date: new Date(row.date_commande).toLocaleString('fr-FR'),
          status: row.statut,
        };
      }
      orders[row.id].items.push({
        dish: {
          id: row.dish_id,
          name: row.dish_nom,
          description: row.dish_description,
          price: Number(row.prix_unitaire_DA),
          category: row.dish_categorie,
          image: row.dish_image,
          rating: row.dish_note !== null && row.dish_note !== undefined ? Number(row.dish_note) : 4.5,
          popular: Boolean(row.dish_populaire),
        },
        quantity: row.quantite,
      });
    }
    res.json(Object.values(orders));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { userId, branchId, items, total } = req.body || {};
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Commande invalide.' });
  }
  const db = await getPool();
  const transaction = new sql.Transaction(db);
  try {
    await transaction.begin();
    const orderRequest = new sql.Request(transaction);
    orderRequest.input('user_id', sql.Int, Number(userId));
    orderRequest.input('branch_id', sql.Int, branchId ? Number(branchId) : null);
    orderRequest.input('total_DA', sql.Decimal(10, 2), Number(total) || 0);
    const orderResult = await orderRequest.query(`
      INSERT INTO orders (user_id, branch_id, total_DA, statut)
      OUTPUT INSERTED.id
      VALUES (@user_id, @branch_id, @total_DA, 'En préparation')
    `);
    const orderId = orderResult.recordset[0].id;
    for (const item of items) {
      const itemRequest = new sql.Request(transaction);
      itemRequest.input('order_id', sql.Int, orderId);
      itemRequest.input('dish_id', sql.Int, Number(item.dishId));
      itemRequest.input('quantite', sql.Int, Number(item.quantity));
      itemRequest.input('prix_unitaire_DA', sql.Decimal(10, 2), Number(item.unitPrice));
      await itemRequest.query(`
        INSERT INTO order_items (order_id, dish_id, quantite, prix_unitaire_DA)
        VALUES (@order_id, @dish_id, @quantite, @prix_unitaire_DA)
      `);
    }
    await transaction.commit();
    res.status(201).json({ success: true, orderId });
  } catch (error) {
    console.error(error);
    try {
      await transaction.rollback();
    } catch (rollbackError) {
      // Transaction déjà fermée : on ignore.
    }
    res.status(500).json({ success: false, message: 'Erreur lors de la commande.' });
  }
});

// ---------- Réservations ----------
app.get('/api/reservations', async (req, res) => {
  try {
    const db = await getPool();
    const request = db.request();
    let where = '';
    if (req.query.userId) {
      request.input('userId', sql.Int, Number(req.query.userId));
      where = ' WHERE r.user_id = @userId';
    }
    const result = await request.query(`
      SELECT r.id, r.date_reservation, r.heure, r.nb_personnes, r.statut, u.nom, u.telephone
      FROM reservations r
      INNER JOIN users u ON u.id = r.user_id
      ${where}
      ORDER BY r.date_reservation DESC
    `);
    res.json(
      result.recordset.map((row) => ({
        id: 'RES-' + row.id,
        date: new Date(row.date_reservation).toLocaleDateString('fr-FR'),
        time: row.heure,
        persons: row.nb_personnes,
        name: row.nom,
        phone: row.telephone,
        status: row.statut,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
});

app.post('/api/reservations', async (req, res) => {
  const { userId, branchId, date, time, persons } = req.body || {};
  if (!userId || !date || !time || !persons) {
    return res.status(400).json({ success: false, message: 'Réservation invalide.' });
  }
  try {
    const db = await getPool();
    const result = await db
      .request()
      .input('user_id', sql.Int, Number(userId))
      .input('branch_id', sql.Int, branchId ? Number(branchId) : null)
      .input('date_reservation', sql.Date, date)
      .input('heure', sql.NVarChar, String(time))
      .input('nb_personnes', sql.Int, Number(persons))
      .query(`
        INSERT INTO reservations (user_id, branch_id, date_reservation, heure, nb_personnes, statut)
        OUTPUT INSERTED.id
        VALUES (@user_id, @branch_id, @date_reservation, @heure, @nb_personnes, 'Confirmée')
      `);
    res.status(201).json({ success: true, reservationId: result.recordset[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de la réservation.' });
  }
});

// ---------- Démarrage ----------
app.listen(PORT, async () => {
  console.log(`API Restaurant démarrée sur http://localhost:${PORT}`);
  console.log(`Base de données : ${dbConfig.database} sur ${dbConfig.server}`);
  try {
    await getPool();
    console.log('Connexion à SQL Server réussie.');
  } catch (error) {
    console.warn('SQL Server inaccessible — vérifiez le fichier .env (les routes répondront en erreur 500).');
  }
});
