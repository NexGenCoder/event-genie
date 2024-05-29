import { createConnection } from '../utils/dbconnect'

const createVendorsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS Vendors  (
            vendorID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            ownerID UUID REFERENCES users(userid),
            brandName VARCHAR(255) NOT NULL,
            brandLogo TEXT,
            location TEXT NOT NULL,
            description TEXT,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
         )
      `)
   } catch (error) {
      console.error('Error creating vendor table: ', error)
      throw error
   }
}

export default createVendorsTable
