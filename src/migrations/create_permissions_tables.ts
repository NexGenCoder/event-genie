import { createConnection } from '../utils/dbconnect'

const createPermissionsTable = async () => {
  const client = await createConnection()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        permissionid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        permission_name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
      )
    `)
  } catch (error) {
    console.error('Error creating permissions table: ', error)
    throw error
  }
}

export default createPermissionsTable