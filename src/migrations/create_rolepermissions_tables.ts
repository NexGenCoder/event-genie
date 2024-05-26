import { createConnection } from '../utils/dbconnect'
const createRolePermissionsTable = async () => {
  const client = await createConnection()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS role_permissions (
        role_permission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        roleid UUID NOT NULL,
        permissionid UUID NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (roleid) REFERENCES roles(roleid),
        FOREIGN KEY (permissionid) REFERENCES permissions(permissionid),
        UNIQUE (roleid, permissionid)
      )
    `)
  } catch (error) {
    console.error('Error creating role_permissions table: ', error)
    throw error
  }
}

export default createRolePermissionsTable