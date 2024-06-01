import {
   ICreateChildEventBody,
   ICreateEventBody,
   IEvent,
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
      await client.query('BEGIN')
      const insertEventQuery = `
         INSERT INTO events (event_name, start_date_time, end_date_time, description, location, event_type, userid, event_logo, is_private)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING eventId
      `
      const eventValues = [
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
      const eventResult = await client.query(insertEventQuery, eventValues)
      const eventId = eventResult.rows[0].eventid

      const insertHostQuery = `
         INSERT INTO guests (eventid, userid, role)
         VALUES ($1, $2, $3)
      `
      const hostValues = [eventId, eventData.userid, 'host']
      await client.query(insertHostQuery, hostValues)

      await client.query('COMMIT')

      const result = await client.query(
         'SELECT * FROM events WHERE eventId = $1',
         [eventId],
      )
      return result.rows[0]
   } catch (error) {
      await client.query('ROLLBACK')
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
   let client
   try {
      client = await createConnection()
      const query = `
            SELECT 
                e.eventid, 
                e.parent_eventid, 
                e.event_name, 
                e.start_date_time, 
                e.end_date_time, 
                e.description, 
                e.event_logo, 
                e.location, 
                e.event_type, 
                e.is_private, 
                e.created_at, 
                e.updated_at, 
                e.userid AS host_userid, 
                g.userid AS guest_userid, 
                g.role, 
                g.created_at AS joining_date
            FROM 
                events e
            LEFT JOIN 
                guests g ON e.eventId = g.eventId
            WHERE 
                (e.userId = $1 OR g.userId = $1) -- Include events where the user is either the creator or a guest
                AND e.parent_eventId IS NULL
        `
      const values = [userId]
      const result = await client.query(query, values)

      const eventMap = new Map()

      result.rows.forEach((row) => {
         if (!eventMap.has(row.eventid)) {
            eventMap.set(row.eventid, row)
         } else {
            const existing = eventMap.get(row.eventid)
            if (row.role === 'host' || existing.role === 'host') {
               existing.role = 'host'
            } else {
               existing.role = 'guest'
            }
         }
      })

      const uniqueEvents = Array.from(eventMap.values())

      return uniqueEvents
   } catch (error) {
      throw new Error(
         `Error getting events by user ID ${userId}: ${error.message}`,
      )
   } finally {
      if (client) {
         await client.end()
      }
   }
}

export const getChildEvents = async (eventId: string, userId: string) => {
   const client = await createConnection()
   try {
      const query = `
         SELECT 
            e.*, 
            g.role,
            g.created_at AS joining_date
         FROM 
            events e
         LEFT JOIN 
            guests g ON e.eventId = g.eventid
         WHERE 
            e.parent_eventid = $1
            AND (e.userid = $2 OR g.userid = $2)
      `
      const values = [eventId, userId]
      const result = await client.query(query, values)
      return result.rows
   } catch (error) {
      throw new Error(`Error getting child events: ${error}`)
   } finally {
      await client.end()
   }
}

export const getEventDetailsModel = async (
   eventId: string,
   userid: string,
): Promise<IEvent> => {
   const client = await createConnection()
   try {
      const query = `
         SELECT 
            e.*, 
            g.role,
            g.created_at AS joining_date
         FROM 
            events e
         LEFT JOIN 
            guests g ON e.eventId = g.eventid
         WHERE 
            e.eventid = $1
            AND (e.userid = $2 OR g.userid = $2)
      `
      const values = [eventId, userid]
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
