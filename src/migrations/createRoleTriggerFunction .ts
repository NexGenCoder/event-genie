import { createConnection } from '../utils/dbconnect';

const createRoleTriggerFunction = async () => {
  const client = await createConnection();
  try {
    // Check if the trigger exists
    const res = await client.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'set_default_role_trigger'
    `);

    if (res.rows.length === 0) {
      // Create the trigger function
      await client.query(`
        CREATE OR REPLACE FUNCTION set_default_role() RETURNS TRIGGER AS $$
        BEGIN
          IF NEW.roleid IS NULL THEN
            NEW.roleid := (SELECT roleid FROM roles WHERE role_name = 'guest');
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER set_default_role_trigger
        BEFORE INSERT ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_default_role();
      `);
      console.log('Role trigger function created successfully');
    } else {
      console.log('Role trigger function already exists');
    }
  } catch (error) {
    console.error('Error creating role trigger function: ', error);
    throw error;
  } finally {
    client.end();
  }
};

export default createRoleTriggerFunction;
