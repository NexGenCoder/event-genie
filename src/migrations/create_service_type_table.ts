import { serviceType } from '../data/serviceType'
import { createConnection } from '../utils/dbconnect'

const createServiceTypeTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS service_types (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL UNIQUE,
            description TEXT,
            image_url VARCHAR(255)
         )
      `)
      for (const service of serviceType) {
         await client.query(
            `
            INSERT INTO service_types (name,description, image_url)
            VALUES ($1, $2, $3)
            ON CONFLICT (name) DO UPDATE SET
            image_url = EXCLUDED.image_url
         `,
            [service.name, service.description, service.imageUrl],
         )
      }
   } catch (error) {
      console.error('Error creating service types table: ', error)
      throw error
   }
}

export default createServiceTypeTable
