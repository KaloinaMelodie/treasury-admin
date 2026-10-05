-- Supprime la table même si des foreign keys existent
DROP TABLE IF EXISTS categories CASCADE;

-- Supprime aussi le type ENUM s'il existe déjà
DROP TYPE IF EXISTS category_type CASCADE;


CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TYPE category_type AS ENUM (
    'INCOME',
    'EXPENSE',
    'BOTH'
);


CREATE TABLE categories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    type category_type NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by UUID,

    updated_at TIMESTAMP,

    updated_by UUID,

    deleted_at TIMESTAMP,

    deleted_by UUID

);


CREATE INDEX idx_categories_name
ON categories(name);


CREATE INDEX idx_categories_type
ON categories(type);


CREATE INDEX idx_categories_active
ON categories(is_active);


INSERT INTO categories
(
    name,
    type,
    description,
    is_active
)
VALUES

(
    'Cotisation mensuelle',
    'INCOME',
    'Cotisation régulière des membres chaque mois',
    TRUE
),

(
    'Remboursement prêt',
    'INCOME',
    'Remboursement effectué par un membre',
    TRUE
),

(
    'Retour avance',
    'INCOME',
    'Retour d une avance précédemment donnée',
    TRUE
),

(
    'Don exceptionnel',
    'INCOME',
    'Entrée exceptionnelle provenant d un don',
    FALSE
),

(
    'Achat matériel',
    'EXPENSE',
    'Achat de matériel ou équipement',
    TRUE
),

(
    'Frais événement',
    'EXPENSE',
    'Dépenses liées aux événements',
    TRUE
),

(
    'Transport',
    'EXPENSE',
    'Frais de déplacement',
    TRUE
),

(
    'Cadeau',
    'EXPENSE',
    'Cadeaux et participations diverses',
    TRUE
),

(
    'Frais bancaire',
    'EXPENSE',
    'Frais liés aux opérations bancaires',
    FALSE
),

(
    'Correction caisse',
    'BOTH',
    'Ajustement exceptionnel de la caisse',
    TRUE
),

(
    'Ajustement comptable',
    'BOTH',
    'Correction positive ou négative du solde',
    TRUE
),

(
    'Divers',
    'BOTH',
    'Catégorie générique temporaire',
    FALSE
);