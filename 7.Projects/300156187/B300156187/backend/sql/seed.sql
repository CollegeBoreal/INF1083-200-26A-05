-- ============================================================
-- Restaurant App — Données de démonstration
-- À exécuter dans SSMS, juste après schema.sql (base vide)
-- Reprend les données de src/app/data/demo-data.ts
-- ============================================================

USE restaurant_app;
GO

-- ------------------------------------------------------------
-- Branches (restaurants)
-- ------------------------------------------------------------
INSERT INTO branches (nom, adresse, ville, telephone, note, image) VALUES
(N'Dar El Baraka',       N'Rue Didouche Mourad',    N'Alger Centre', N'023 12 34 56', 4.8, N'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'),
(N'Le Jardin d''Essai',  N'Chemin des Crêtes, Hydra', N'Alger',      N'023 45 67 89', 4.7, N'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80'),
(N'La Table d''Or',      N'Front de mer',           N'Oran',       N'041 23 45 67', 4.6, N'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'),
(N'Sidi Yahia',          N'Vieille ville',          N'Constantine', N'031 78 90 12', 4.5, N'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80');
GO

-- ------------------------------------------------------------
-- Catégories
-- ------------------------------------------------------------
INSERT INTO categories (nom) VALUES
(N'Entrées'),
(N'Plats'),
(N'Desserts'),
(N'Boissons');
GO

-- ------------------------------------------------------------
-- Plats (branch_id = 1 : Dar El Baraka)
-- ------------------------------------------------------------
INSERT INTO dishes (branch_id, category_id, nom, description, prix_DA, image, note, populaire, disponible) VALUES
-- Entrées
(1, 1, N'Salade Mechouia', N'Tomates, poivrons et oignons grillés, huile d''olive et ail.', 450, N'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', 4.6, 1, 1),
(1, 1, N'Briouates', N'Feuilles de brick croustillantes garnies de viande hachée et d''épices.', 600, N'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', 4.7, 1, 1),
(1, 1, N'Hmiss', N'Purée de poivrons grillés et tomates, relevée à l''huile d''olive.', 500, N'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80', 4.5, 0, 1),
(1, 1, N'Chorba', N'Soupe traditionnelle aux légumes, pois chiches et vermicelles.', 400, N'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', 4.4, 0, 1),
-- Plats
(1, 2, N'Couscous Royal', N'Semoule fine, légumes du terroir, poulet et merguez, bouillon safrané.', 1800, N'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80', 4.9, 1, 1),
(1, 2, N'Chakhchoukha', N'Galettes de semoule émiettées, sauce tomate épicée et œuf.', 1500, N'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', 4.8, 1, 1),
(1, 2, N'Tajine Kefta', N'Bœuf haché épicé, sauce tomate, œuf et olives, servi en tajine.', 1400, N'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 4.7, 0, 1),
(1, 2, N'Merguez Frites', N'Merguez grillées, frites maison et sauce au choix.', 1200, N'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', 4.5, 0, 1),
(1, 2, N'Poulet Fermier', N'Poulet fermier rôti aux herbes, légumes confits et jus corsé.', 1600, N'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=80', 4.6, 0, 1),
(1, 2, N'Loubia', N'Haricots blancs mijotés, sauce tomate et ail, plat du terroir.', 900, N'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80', 4.3, 0, 1),
-- Desserts
(1, 3, N'Makroud', N'Dattes enrobées de semoule fine et miel, spécialité de Tozeur.', 500, N'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', 4.7, 1, 1),
(1, 3, N'Cornes de Gazelle', N'Pâte fine fourrée à la pâte d''amandes et à la fleur d''oranger.', 700, N'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80', 4.8, 0, 1),
(1, 3, N'Tiramisu', N'Mascarpone onctueux, café et cacao, la douceur italienne.', 800, N'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', 4.6, 0, 1),
(1, 3, N'Flan Caramel', N'Flan crémeux au caramel beurre salé.', 400, N'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80', 4.4, 0, 1),
-- Boissons
(1, 4, N'Thé à la Menthe', N'Thé vert infusé à la menthe fraîche, servi en théière.', 200, N'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80', 4.5, 0, 1),
(1, 4, N'Jus d''Orange Frais', N'Oranges pressées minute, sans sucre ajouté.', 300, N'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80', 4.6, 0, 1),
(1, 4, N'Lben', N'Lait fermenté traditionnel, frais et onctueux.', 250, N'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80', 4.4, 0, 1),
(1, 4, N'Café Turc', N'Café moulu fin, préparé à la cezve, corsé et parfumé.', 150, N'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', 4.3, 0, 1);
GO

-- ------------------------------------------------------------
-- Utilisateur démo : demo@restaurant.com / demo1234
-- Le mot de passe est stocké en hash bcrypt (jamais en clair).
-- ------------------------------------------------------------
INSERT INTO users (nom, email, mot_de_passe_hash, telephone) VALUES
(N'Utilisateur Démo', N'demo@restaurant.com', N'$2b$10$2oADnroGhpabOBK9uO9VHOIExW.sux3E7yKAL5aMqf3lVT/TYIUAu', N'0550 12 34 56');
GO
