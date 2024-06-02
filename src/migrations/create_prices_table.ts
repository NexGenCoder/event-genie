import { createConnection } from '../utils/dbconnect'

const createPricesTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS prices (
            priceid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            per_hour VARCHAR(50),
            per_day VARCHAR(50),
            per_week VARCHAR(50),
            per_month VARCHAR(50),
            price VARCHAR(50),
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
         )
      `)  
   } catch (error) {
      console.error('Error creating prices table: ', error)
      throw error
   }
}

export default createPricesTable