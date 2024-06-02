import { createConnection } from '../utils/dbconnect'

const createServicesTable = async () => {
   const client = await createConnection()
   try {
      await client.query('BEGIN')
      await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        serviceid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        service_type_id UUID NOT NULL,
        vendorid UUID NOT NULL,
        priceid UUID,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_type_id) REFERENCES service_types(id),
        FOREIGN KEY (vendorid) REFERENCES vendors(vendorid),
        FOREIGN KEY (priceid) REFERENCES prices(priceid)
      )
    `)

      const result = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name='prices' AND column_name='serviceid'
    `)

      if (result.rows.length === 0) {
         await client.query(`
        ALTER TABLE prices
        ADD COLUMN serviceid UUID,
        ADD CONSTRAINT fk_serviceid FOREIGN KEY (serviceid) REFERENCES services(serviceid)
      `)
      }

      await client.query('COMMIT')
   } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error creating services table: ', error)
      throw error
   } finally {
      client.end()
   }
}

export default createServicesTable
