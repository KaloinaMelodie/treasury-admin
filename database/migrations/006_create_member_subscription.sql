DROP TABLE IF EXISTS member_subscription CASCADE;


CREATE TABLE member_subscription (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    member_id UUID NOT NULL,

    amount NUMERIC(12,2) NOT NULL,

    frequency VARCHAR(30) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by UUID,

    updated_at TIMESTAMP,

    updated_by UUID,


    CONSTRAINT fk_subscription_member

        FOREIGN KEY(member_id)

        REFERENCES members(id)

        ON DELETE CASCADE

);


ALTER TABLE member_subscription

ADD CONSTRAINT check_subscription_frequency

CHECK (

    frequency IN
    (
        'MONTHLY',
        'YEARLY',
        'CUSTOM'
    )

);