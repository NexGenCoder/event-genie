import { createConnection } from '../utils/dbconnect'

const updateUsersTable = async () => {
  const client = await createConnection()
  try {
    const res = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'roleid'
    `)
    
    if (res.rows.length === 0) {
      await client.query(`
        ALTER TABLE users
        ADD COLUMN roleid UUID REFERENCES roles(roleid)
      `)
      console.log('RoleID column added to users table')
    } else {
      console.log('RoleID column already exists in users table')
    }
  } catch (error) {
    console.error('Error updating users table: ', error)
    throw error
  } finally {
    client.end()
  }
}

export default updateUsersTable
