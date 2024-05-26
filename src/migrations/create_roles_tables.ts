import { createConnection } from '../utils/dbconnect'

const createRolesTable = async () => {
  const client = await createConnection()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        roleid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        role_name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
      )
    `)
  } catch (error) {
    console.error('Error creating roles table: ', error)
    throw error
  }
}

export default createRolesTable