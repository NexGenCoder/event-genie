import { IServiceType, IService } from './../types/service'
import { createConnection } from '../utils/dbconnect'

export const getServiceTypesModel = async (): Promise<IServiceType[]> => {
   const client = await createConnection()
   try {
      const result = await client.query('SELECT * FROM service_types')
      return result.rows
   } catch (error) {
      throw new Error(`Error getting all service types: ${error}`)
   } finally {
      await client.end()
   }
}

export const createServiceModel = async (serviceData: IService) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'INSERT INTO services (name, description, image_url, service_type_id, vendorid, priceid) VALUES ($1, $2, $3, $4, $5, $6)',
         [
            serviceData.name,
            serviceData.description,
            serviceData.image_url,
            serviceData.service_type_id,
            serviceData.vendorid,
            serviceData.priceid,
         ],
      )

      return result.rows[0]
   } catch (error) {
      await client.query('ROLLBACK')
      throw new Error(`Error creating event: ${error}`)
   } finally {
      await client.end()
   }
}

export const getServicesModelByVendor = async (
   vendorid: string,
): Promise<IService[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'SELECT * FROM services WHERE vendorid = $1',
         [vendorid],
      )
      return result.rows
   } catch (error) {
      throw new Error(`Error getting event details: ${error}`)
   } finally {
      await client.end()
   }
}

export const updateServiceModel = async (serviceData: IService) => {
   const client = await createConnection()
   try {
      const result = await client.query(
         'UPDATE services SET name = $1, description = $2, image_url = $3, service_type_id = $4, vendorid = $5, priceid = $6 WHERE serviceid = $7 RETURNING *',
         [
            serviceData.name,
            serviceData.description,
            serviceData.image_url,
            serviceData.service_type_id,
            serviceData.vendorid,
            serviceData.priceid,
            serviceData.serviceid,
         ],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error updating event: ${error}`)
   } finally {
      await client.end()
   }
}
