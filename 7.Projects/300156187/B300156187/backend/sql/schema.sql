-- ============================================================
-- Restaurant App — Schéma de la base de données SQL Server
-- À exécuter dans SSMS (SQL Server Management Studio)
-- ============================================================

-- Création de la base de données
IF DB_ID('restaurant_app') IS NULL
BEGIN
    CREATE DATABASE restaurant_app;
END
GO

USE restaurant_app;
GO

-- ------------------------------------------------------------
-- Table : users (utilisateurs)
-- ------------------------------------------------------------
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nom NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe_hash NVARCHAR(255) NOT NULL,
    telephone NVARCHAR(20) NULL
);
GO

-- ------------------------------------------------------------
-- Table : branches (restaurants / succursales)
-- ------------------------------------------------------------
CREATE TABLE branches (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nom NVARCHAR(150) NOT NULL,
    adresse NVARCHAR(255) NOT NULL,
    ville NVARCHAR(100) NOT NULL,
    telephone NVARCHAR(20) NULL,
    note DECIMAL(3,1) NULL,
    image NVARCHAR(MAX) NULL
);
GO

-- ------------------------------------------------------------
-- Table : categories (catégories de plats)
-- ------------------------------------------------------------
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nom NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- ------------------------------------------------------------
-- Table : dishes (plats)
-- ------------------------------------------------------------
CREATE TABLE dishes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    branch_id INT NULL,
    category_id INT NOT NULL,
    nom NVARCHAR(150) NOT NULL,
    description NVARCHAR(MAX) NULL,
    prix_DA DECIMAL(10,2) NOT NULL,
    image NVARCHAR(MAX) NULL,
    note DECIMAL(3,1) NULL,
    populaire BIT NOT NULL DEFAULT 0,
    disponible BIT NOT NULL DEFAULT 1,
    CONSTRAINT FK_dishes_branch FOREIGN KEY (branch_id) REFERENCES branches(id),
    CONSTRAINT FK_dishes_category FOREIGN KEY (category_id) REFERENCES categories(id)
);
GO

-- ------------------------------------------------------------
-- Table : orders (commandes)
-- ------------------------------------------------------------
CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    branch_id INT NULL,
    total_DA DECIMAL(10,2) NOT NULL,
    statut NVARCHAR(50) NOT NULL DEFAULT 'En préparation',
    date_commande DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_orders_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_orders_branch FOREIGN KEY (branch_id) REFERENCES branches(id)
);
GO

-- ------------------------------------------------------------
-- Table : order_items (lignes de commande)
-- ------------------------------------------------------------
CREATE TABLE order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    dish_id INT NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire_DA DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT FK_order_items_dish FOREIGN KEY (dish_id) REFERENCES dishes(id)
);
GO

-- ------------------------------------------------------------
-- Table : reservations (réservations de table)
-- ------------------------------------------------------------
CREATE TABLE reservations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    branch_id INT NULL,
    date_reservation DATE NOT NULL,
    heure NVARCHAR(10) NOT NULL,
    nb_personnes INT NOT NULL,
    statut NVARCHAR(50) NOT NULL DEFAULT 'Confirmée',
    CONSTRAINT FK_reservations_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_reservations_branch FOREIGN KEY (branch_id) REFERENCES branches(id)
);
GO
