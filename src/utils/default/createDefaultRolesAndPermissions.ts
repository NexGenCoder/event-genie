import { createConnection } from './../../utils/dbconnect'

const createDefaultRolesAndPermissions = async () => {
  const client = await createConnection()
  try {
    // Check if the trigger exists
    const res = await client.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'set_default_role_trigger'
    `)

    if (res.rows.length === 0) {
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
      `)
      console.log('Default role trigger created')
    } else {
      console.log('Default role trigger already exists')
    }

    // Add code to create default roles and permissions
    await client.query(`
      INSERT INTO roles (role_name) VALUES
      ('host'),
      ('co-host'),
      ('guest'),
      ('vendor')
      ON CONFLICT (role_name) DO NOTHING;
    `)

    // Add default permissions and role-permissions relationships
    // You need to define these according to your application's requirements
    await client.query(`
      INSERT INTO permissions (permission_name) VALUES
      ('create_event'),
      ('delete_event'),
      ('view_vendor_channel'),
      ('invite_user')
      ON CONFLICT (permission_name) DO NOTHING;
    `)

    // Assign permissions to roles
    await client.query(`
      INSERT INTO role_permissions (roleid, permissionid)
      SELECT roles.roleid, permissions.permissionid
      FROM roles, permissions
      WHERE roles.role_name = 'host'
      AND permissions.permission_name IN ('create_event', 'delete_event', 'view_vendor_channel', 'invite_user')
      ON CONFLICT DO NOTHING;

      INSERT INTO role_permissions (roleid, permissionid)
      SELECT roles.roleid, permissions.permissionid
      FROM roles, permissions
      WHERE roles.role_name = 'co-host'
      AND permissions.permission_name IN ('view_vendor_channel', 'invite_user')
      ON CONFLICT DO NOTHING;

      INSERT INTO role_permissions (roleid, permissionid)
      SELECT roles.roleid, permissions.permissionid
      FROM roles, permissions
      WHERE roles.role_name = 'vendor'
      AND permissions.permission_name IN ('view_vendor_channel')
      ON CONFLICT DO NOTHING;
    `)

    console.log('Default roles and permissions created')
  } catch (error) {
    console.error('Error creating default roles and permissions: ', error)
    throw error
  } finally {
    client.end()
  }
}

export default createDefaultRolesAndPermissions
