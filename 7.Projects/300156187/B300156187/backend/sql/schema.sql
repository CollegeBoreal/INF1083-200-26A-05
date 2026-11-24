-- =====================================================================
-- Schéma de la base de données — Wonder Food's (Wonderfood's Morchid, Oran)
-- SQL Server (T-SQL) — à exécuter dans SSMS.
-- Ordre : d'abord ce fichier (schema.sql), puis sql/seed.sql.
--
-- Le script est RÉEXÉCUTABLE : la base n'est créée que si elle
-- n'existe pas encore, et chaque table n'est créée que si elle
-- n'existe pas encore. Sur une base déjà remplie, il ne supprime
-- donc rien. Pour repartir de zéro, supprimer la base puis relancer.
-- =====================================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'restaurant_app')
BEGIN
    CREATE DATABASE restaurant_app;
END
GO

USE restaurant_app;
GO

-- ---------------------------------------------------------------------
-- Table branches : les succursales du restaurant
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'branches')
BEGIN
    CREATE TABLE branches (
        id      INT IDENTITY(1,1) PRIMARY KEY,
        name    NVARCHAR(100) NOT NULL,
        address NVARCHAR(200),
        rating  DECIMAL(2,1),
        image   NVARCHAR(500)
    );
END
GO

-- ---------------------------------------------------------------------
-- Table categories : Pizzas, Burgers, Tacos, Sandwichs, Desserts, Boissons
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories')
BEGIN
    CREATE TABLE categories (
        id   INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(50) NOT NULL UNIQUE
    );
END
GO

-- ---------------------------------------------------------------------
-- Table dishes : les plats du menu
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'dishes')
BEGIN
    CREATE TABLE dishes (
        id          INT IDENTITY(1,1) PRIMARY KEY,
        branch_id   INT NOT NULL REFERENCES branches(id),
        category_id INT NOT NULL REFERENCES categories(id),
        name        NVARCHAR(100) NOT NULL,
        description NVARCHAR(500),
        price       INT NOT NULL,          -- prix en dinars algériens (DA)
        image       NVARCHAR(500),
        rating      DECIMAL(2,1),
        popular     BIT NOT NULL DEFAULT 0
    );
END
GO

-- ---------------------------------------------------------------------
-- Table users : les comptes clients (téléphone OBLIGATOIRE,
-- comme dans le modèle TypeScript User ; mot de passe HASHÉ avec
-- bcrypt — jamais en clair — voir server.js et sql/seed.sql)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id            INT IDENTITY(1,1) PRIMARY KEY,
        name          NVARCHAR(100) NOT NULL,
        email         NVARCHAR(150) NOT NULL UNIQUE,
        phone         NVARCHAR(30) NOT NULL,
        password_hash NVARCHAR(200) NOT NULL,
        created_at    DATETIME DEFAULT GETDATE()
    );
END
GO

-- ---------------------------------------------------------------------
-- Table orders : les commandes (une commande = un client + un total)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'orders')
BEGIN
    CREATE TABLE orders (
        id         INT IDENTITY(1,1) PRIMARY KEY,
        user_id    INT REFERENCES users(id),
        total      INT NOT NULL,            -- total en DA
        status     NVARCHAR(30) NOT NULL DEFAULT 'en attente',
        created_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- ---------------------------------------------------------------------
-- Table order_items : les lignes d'une commande (plat + quantité + prix)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'order_items')
BEGIN
    CREATE TABLE order_items (
        id       INT IDENTITY(1,1) PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id),
        dish_id  INT NOT NULL REFERENCES dishes(id),
        quantity INT NOT NULL,
        price    INT NOT NULL              -- prix unitaire au moment de la commande, en DA
    );
END
GO

-- ---------------------------------------------------------------------
-- Table reservations : les réservations de table
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reservations')
BEGIN
    CREATE TABLE reservations (
        id               INT IDENTITY(1,1) PRIMARY KEY,
        user_id          INT REFERENCES users(id),
        name             NVARCHAR(100) NOT NULL,
        phone            NVARCHAR(30) NOT NULL,
        reservation_date DATE NOT NULL,
        reservation_time NVARCHAR(10) NOT NULL,
        persons          INT NOT NULL,
        created_at       DATETIME DEFAULT GETDATE()
    );
END
GO
