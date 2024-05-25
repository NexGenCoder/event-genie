import { createConnection } from '../utils/dbconnect'

const createVendorsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS channel_categories  (
            VendorID SERIAL PRIMARY KEY NOT NULL,
            OwnerID INT REFERENCES users(userid),
            BrandName VARCHAR(255) NOT NULL,
            BrandLogo TEXT,
            Location TEXT NOT NULL,
            Description TEXT,
            Email VARCHAR(255) NOT NULL,
            Phone VARCHAR(20) NOT NULL,
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
