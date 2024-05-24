import { createConnection } from '../utils/dbconnect'

export const getEventTypesModel = async () => {
   const client = await createConnection()
   try {
      const result = await client.query('SELECT * FROM event_types')
      return result.rows
   } catch (error) {
      throw new Error(`Error getting all event types: ${error}`)
   } finally {
      await client.end()
   }
}
