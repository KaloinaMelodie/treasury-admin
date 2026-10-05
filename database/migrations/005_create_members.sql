DROP TABLE IF EXISTS members CASCADE;


CREATE TABLE members (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    phone VARCHAR(30),

    email VARCHAR(150),

    status_id UUID NOT NULL,

    group_id UUID,

    entry_date DATE NOT NULL,

    exit_date DATE,

    user_id UUID,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by UUID,

    updated_at TIMESTAMP,

    updated_by UUID,

    deleted_at TIMESTAMP,

    deleted_by UUID,


    CONSTRAINT fk_member_status

        FOREIGN KEY(status_id)

        REFERENCES member_statuses(id),


    CONSTRAINT fk_member_group

        FOREIGN KEY(group_id)

        REFERENCES member_groups(id)

);


CREATE INDEX idx_members_name

ON members(last_name, first_name);


CREATE INDEX idx_members_phone

ON members(phone);


CREATE INDEX idx_members_status

ON members(status_id);


CREATE INDEX idx_members_group

ON members(group_id);