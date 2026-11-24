-- =====================================================================
-- Données initiales (seed) — Wonder Food's (Wonderfood's Morchid, Oran)
-- SQL Server (T-SQL) — à exécuter dans SSMS APRÈS sql/schema.sql.
--
-- Contenu : 1 succursale, 6 catégories, les 15 plats EXACTEMENT
-- comme dans demo-data.ts (mêmes noms, descriptions, prix en DA,
-- notes, popular et images Unsplash) + l'utilisateur démo
-- demo@restaurant.com (mot de passe « demo1234 », stocké HASHÉ
-- avec bcrypt — jamais en clair).
--
-- Note : l'apostrophe de « Wonderfood's » est doublée ('Wonderfood''s),
-- c'est l'échappement SQL Server. Les INSERT sont protégés par des
-- vérifications IF NOT EXISTS : le script peut être relancé sans
-- créer de doublons.
-- =====================================================================

USE restaurant_app;
GO

-- ---------------------------------------------------------------------
-- Succursale : Wonderfood's Morchid, Morchid, Oran — note 4.6
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM branches WHERE name = 'Wonderfood''s Morchid')
BEGIN
    INSERT INTO branches (name, address, rating, image)
    VALUES ('Wonderfood''s Morchid', 'Morchid, Oran', 4.6,
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80');
END
GO

-- ---------------------------------------------------------------------
-- Catégories (id fixes : 1 Pizzas, 2 Burgers, 3 Tacos,
-- 4 Sandwichs, 5 Desserts, 6 Boissons)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Pizzas')
    INSERT INTO categories (name) VALUES ('Pizzas');
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Burgers')
    INSERT INTO categories (name) VALUES ('Burgers');
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Tacos')
    INSERT INTO categories (name) VALUES ('Tacos');
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Sandwichs')
    INSERT INTO categories (name) VALUES ('Sandwichs');
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Desserts')
    INSERT INTO categories (name) VALUES ('Desserts');
IF NOT EXISTS (SELECT * FROM categories WHERE name = 'Boissons')
    INSERT INTO categories (name) VALUES ('Boissons');
GO

-- ---------------------------------------------------------------------
-- Plats — branch_id = 1 (Wonderfood's Morchid).
-- Valeurs recopiées EXACTEMENT de demo-data.ts.
-- ---------------------------------------------------------------------

-- ---------- Pizzas (category_id = 1) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Pizza Margherita')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 1, 'Pizza Margherita', 'Sauce tomate, mozzarella fondante, basilic frais.', 600,
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', 4.7, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Pizza 4 Fromages')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 1, 'Pizza 4 Fromages', 'Mozzarella, gorgonzola, parmesan et chèvre, crème fraîche.', 900,
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', 4.8, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Pizza Poulet')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 1, 'Pizza Poulet', 'Poulet mariné, sauce tomate, mozzarella, poivrons grillés.', 750,
            'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80', 4.6, 0);

-- ---------- Burgers (category_id = 2) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Burger Classique')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 2, 'Burger Classique', 'Bœuf grillé, cheddar, salade, tomate, sauce maison.', 500,
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', 4.7, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Burger Poulet Crispy')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 2, 'Burger Poulet Crispy', 'Poulet croustillant, cheddar, coleslaw, sauce blanche.', 650,
            'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', 4.5, 0);

-- ---------- Tacos (category_id = 3) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Tacos Poulet')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 3, 'Tacos Poulet', 'Tortilla grillée, poulet mariné, frites, sauce fromagère.', 600,
            'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80', 4.8, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Tacos Mixte')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 3, 'Tacos Mixte', 'Poulet et viande hachée, frites, sauce fromagère, sauce algérienne.', 700,
            'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80', 4.6, 0);

-- ---------- Sandwichs (category_id = 4) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Panuzzo Poulet')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 4, 'Panuzzo Poulet', 'Pâte à pizza dorée, poulet, fromage fondu, sauce blanche.', 500,
            'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80', 4.7, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Sandwich Poulet')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 4, 'Sandwich Poulet', 'Pain frais, poulet grillé, salade, tomate, sauce au choix.', 450,
            'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', 4.4, 0);

-- ---------- Desserts (category_id = 5) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Crêpe Nutella')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 5, 'Crêpe Nutella', 'Crêpe fine, Nutella fondant, noisettes concassées.', 350,
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80', 4.8, 1);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Cake Dubaï')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 5, 'Cake Dubaï', 'Cake pistache et chocolat, la spécialité tendance.', 600,
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80', 4.7, 0);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Tiramisu')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 5, 'Tiramisu', 'Mascarpone onctueux, café et cacao, la douceur italienne.', 400,
            'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', 4.6, 0);

-- ---------- Boissons (category_id = 6) ----------
IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Jus Frais')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 6, 'Jus Frais', 'Jus pressé minute, sans sucre ajouté.', 200,
            'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80', 4.5, 0);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Milkshake')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 6, 'Milkshake', 'Lait frais mixé, glace vanille, chantilly.', 350,
            'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80', 4.6, 0);

IF NOT EXISTS (SELECT * FROM dishes WHERE name = 'Boisson 33 cl')
    INSERT INTO dishes (branch_id, category_id, name, description, price, image, rating, popular)
    VALUES (1, 6, 'Boisson 33 cl', 'Boisson gazeuse fraîche, 33 cl.', 100,
            'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=800&q=80', 4.3, 0);
GO

-- ---------------------------------------------------------------------
-- Utilisateur démo : demo@restaurant.com / demo1234
-- Le mot de passe est stocké HASHÉ avec bcrypt (10 tours) — jamais
-- en clair. Hash généré avec bcryptjs :
--   node -e "console.log(require('bcryptjs').hashSync('demo1234', 10))"
-- Vérifié : bcrypt.compareSync('demo1234', hash) === true.
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM users WHERE email = 'demo@restaurant.com')
BEGIN
    INSERT INTO users (name, email, phone, password_hash)
    VALUES ('Utilisateur Démo', 'demo@restaurant.com', '0550 12 34 56',
            '$2b$10$j22LCkLy/W8RIHtNRuKeS.FGxKeNGz0yRQ7DzLOGFfMRZZnj7qG2a');
END
GO
