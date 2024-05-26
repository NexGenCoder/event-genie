import { createConnection } from '../utils/dbconnect';

const createUserRolesTable = async () => {
  const client = await createConnection();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_roles (
        user_role_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userid UUID NOT NULL,
        roleid UUID NOT NULL,
        eventid UUID REFERENCES events(eventid), -- Add eventid column
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userid) REFERENCES users(userid),
        FOREIGN KEY (roleid) REFERENCES roles(roleid),
        UNIQUE (userid, roleid)
      )
    `);
  } catch (error) {
    console.error('Error creating user_roles table: ', error);
    throw error;
  }
};

export default createUserRolesTable;
