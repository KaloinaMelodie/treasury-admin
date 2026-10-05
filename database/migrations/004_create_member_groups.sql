DROP TABLE IF EXISTS member_groups CASCADE;


CREATE TABLE member_groups (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by UUID,

    updated_at TIMESTAMP,

    updated_by UUID

);


INSERT INTO member_groups
(
    name,
    description
)
VALUES

(
    'Standard',
    'Groupe standard des membres'
),

(
    'Premium',
    'Groupe avec une règle spécifique'
);