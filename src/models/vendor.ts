import { CreateVendorBody } from 'types/vendor'

import { createConnection } from '../utils/dbconnect'

export const createVendorModel = async (vendorBody: CreateVendorBody) => {
   const client = await createConnection()
   try {
      const query = `INSERT INTO VENDORS (brandName,brandLogo,location,description,email,phone,ownerid) VALUES($1,$2,$3,$4,$5,$6,$7)`
      const values = [
         vendorBody.brandName,
         vendorBody.brandLogo,
         vendorBody.location,
         vendorBody.description,
         vendorBody.email,
         vendorBody.phone,
         vendorBody.ownerId,
      ]
      const result = await client.query(query, values)
      console.log(result)
      return result
   } catch (error) {
      throw new Error(`Error creating vendor: ${error}`)
   } finally {
      await client.end()
   }
}
