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
   const client = await createConnection();
   try {
      await client.query('BEGIN'); // Start a transaction

      // Step 1: Insert event into the events table
      const eventQuery = `
         INSERT INTO events (event_name, start_date_time, end_date_time, description, location, event_type, userid, event_logo) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING eventid
      `;
      const eventValues = [
         eventData.eventName,
         eventData.startDateTime,
         eventData.endDateTime,
         eventData.description,
         eventData.location,
         eventData.eventType,
         eventData.userId,
         eventData.eventLogo,
      ];
      const eventResult = await client.query(eventQuery, eventValues);
      const eventId = eventResult.rows[0].eventid;

      // Step 2: Assign default role "host" to the user for the created event
      const assignRoleQuery = `
         INSERT INTO user_roles (userid, roleid, eventid) 
         VALUES ($1, (SELECT roleid FROM roles WHERE role_name = 'host'), $2)
      `;
      const assignRoleValues = [eventData.userId, eventId];
      await client.query(assignRoleQuery, assignRoleValues);

      await client.query('COMMIT'); // Commit the transaction

      // Retrieve and return the created event
      const eventDetailsQuery = 'SELECT * FROM events WHERE eventid = $1';
      const eventDetailsValues = [eventId];
      const eventDetailsResult = await client.query(eventDetailsQuery, eventDetailsValues);
      return eventDetailsResult.rows[0];
   } catch (error) {
      await client.query('ROLLBACK'); // Rollback the transaction if an error occurs
      throw new Error(`Error creating event: ${error}`);
   } finally {
      await client.end();
   }
};


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
