import { CreateVendorBody } from 'types/vendor'

import { createConnection } from '../utils/dbconnect'

export const createVendorModel = async (vendorBody: CreateVendorBody) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
         INSERT INTO vendors (
            brand_name,
            brand_logo,
            location,
            description,
            email,
            phone,
            ownerid
         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
         [
            vendorBody.brandName,
            vendorBody.brandLogo,
            vendorBody.location,
            vendorBody.description,
            vendorBody.email,
            vendorBody.phone,
            vendorBody.ownerId,
         ],
      )

      return result.rows[0]
   } catch (error) {
      throw new Error(`Error creating vendor: ${error}`)
   } finally {
      await client.end()
   }
}

export const getVendorByOwnerIdModel = async (ownerId: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM vendors WHERE ownerid = $1',
         [ownerId],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting vendor by owner id: ${error}`)
   } finally {
      await client.end()
   }
}

export const getAllVendorsModel = async () => {
   const client = await createConnection()
   try {
      const result = await client.query('SELECT * FROM vendors')
      return result.rows
   } catch (error) {
      throw new Error(`Error getting all vendors: ${error}`)
   } finally {
      await client.end()
   }
}

export const getVendorPresenceModel = async (ownerId: string) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT EXISTS(SELECT 1 FROM vendors WHERE ownerid = $1)',
         [ownerId],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting vendor presence: ${error}`)
   } finally {
      await client.end()
   }
}
