DROP TABLE IF EXISTS member_statuses CASCADE;


CREATE TABLE member_statuses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(50) NOT NULL UNIQUE,

    label VARCHAR(100) NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by UUID,

    updated_at TIMESTAMP,

    updated_by UUID

);


INSERT INTO member_statuses
(
    code,
    label,
    description
)
VALUES

(
    'ACTIVE',
    'Actif',
    'Membre participant actuellement à la caisse'
),

(
    'SUSPENDED',
    'Suspendu',
    'Membre temporairement suspendu'
),

(
    'EXITED',
    'Sorti',
    'Membre ayant quitté la caisse'
),

(
    'PENDING',
    'En attente',
    'Membre créé mais pas encore actif'
);