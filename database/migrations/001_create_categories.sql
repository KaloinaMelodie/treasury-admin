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