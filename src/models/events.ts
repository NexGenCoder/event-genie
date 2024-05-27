import {
   ICreateChildEventBody,
   ICreateEventBody,
   IUpdateEvent,
} from 'types/event'

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

export const createEventModel = async (eventData: ICreateEventBody) => {
   const client = await createConnection()
   try {
      const query = `
         INSERT INTO events (event_name, start_date_time, end_date_time, description, location, event_type, userid, event_logo,is_private) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `
      const values = [
         eventData.eventName,
         eventData.startDateTime,
         eventData.endDateTime,
         eventData.description,
         eventData.location,
         eventData.eventType,
         eventData.userid,
         eventData.eventLogo,
         eventData.isPrivate,
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

export const createChildEventModel = async (
   eventData: ICreateChildEventBody,
   userid: string,
) => {
   const client = await createConnection()
   try {
      const parentEventQuery = 'SELECT * FROM events WHERE eventid = $1'
      const parentEventResult = await client.query(parentEventQuery, [
         eventData.parentId,
      ])
      const parentEvent = parentEventResult.rows[0]

      if (!parentEvent) {
         throw new Error('Parent event does not exist')
      }

      const query = `
         INSERT INTO events (eventid, event_name, start_date_time, end_date_time, description, location, event_type, parent_eventid, is_private, userid)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *
      `
      const values = [
         eventData.eventName,
         eventData.startDateTime,
         eventData.endDateTime,
         eventData.description,
         eventData.location,
         eventData.eventType,
         eventData.parentId,
         eventData.isPrivate,
         userid,
      ]

      const result = await client.query(query, values)
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error creating child event: ${error}`)
   } finally {
      await client.end()
   }
}

export const getEventsByUserIdModel = async (userId: string) => {
   const client = await createConnection()
   try {
      const query = `
         SELECT * FROM events WHERE userid = $1 AND parent_eventid IS NULL
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

export const getChildEvents = async (eventId: string) => {
   const client = await createConnection()
   try {
      const query = `
         SELECT * FROM events WHERE parent_eventid = $1
      `
      const values = [eventId]
      const result = await client.query(query, values)
      return result.rows
   } catch (error) {
      throw new Error(`Error getting child events: ${error}`)
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

export const updateEventModel = async (eventData: IUpdateEvent) => {
   const client = await createConnection()
   try {
      const query = `
         UPDATE events SET parent_eventid = $1, event_name = $2, start_date_time = $3, end_date_time = $4, description = $5, event_logo = $6, location = $7, event_type = $8 WHERE eventid = $9
      `
      const values = [
         eventData.parent_eventid,
         eventData.event_name,
         eventData.start_date_time,
         eventData.end_date_time,
         eventData.description,
         eventData.event_logo,
         eventData.location,
         eventData.event_type,
         eventData.eventid,
      ]

      await client.query(query, values)
      const result = await client.query(
         'SELECT * FROM events WHERE eventid = $1',
         [eventData.eventid],
      )
      return result.rows[0]
   } catch (error) {
      throw new Error(`Error updating event: ${error}`)
   } finally {
      await client.end()
   }
}
