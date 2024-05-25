import { CreateEventBody } from 'types/event'

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

export const createEventModel = async (eventData: CreateEventBody) => {
   const client = await createConnection()
   try {
      const query = `
         INSERT INTO events (event_name, start_date_time, end_date_time, description, location, event_type, userid, event_logo) VALUES ($1, $2, $3, $4, $5, $6,$7, $8)
      `
      const values = [
         eventData.eventName,
         eventData.startDateTime,
         eventData.endDateTime,
         eventData.description,
         eventData.location,
         eventData.eventType,
         eventData.userId,
         eventData.eventLogo,
      ]

      await client.query(query, values)
      const result = await client.query(
         'SELECT * FROM events WHERE event_name = $1',
         [eventData.eventName],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error creating event: ${error}`)
   } finally {
      await client.end()
   }
}

export const getEventsByUserIdModel = async (userId: string) => {
   const client = await createConnection()
   try {
      const query = `
         SELECT * FROM events WHERE userid = $1
      `
      const values = [userId]
      const result = await client.query(query, values)
      return result.rows
   } catch (error) {
      throw new Error(`Error getting events by user id: ${error}`)
   } finally {
      await client.end()
   }
}

export const getEventDetailsModel = async (eventId: string) => {
   const client = await createConnection()
   try {
      const query = `
         SELECT * FROM events WHERE eventid = $1
      `
      const values = [eventId]
      const result = await client.query(query, values)
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error getting event details: ${error}`)
   } finally {
      await client.end()
   }
}
