import { createConnection } from '../utils/dbconnect'

const createEventsTable = async () => {
   const client = await createConnection()
   try {
      await client.query(`
          CREATE TABLE IF NOT EXISTS Events (
             eventId VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
             eventName VARCHAR(255) NOT NULL,
             organizerId VARCHAR(36) NOT NULL,
             startDateTime DATETIME NOT NULL,
             endDateTime DATETIME NOT NULL,
             description VARCHAR(255) NOT NULL,
             createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
             FOREIGN KEY (organizerId) REFERENCES users(userId)
          )
       `)
   } catch (error) {
      console.error('Error creating otps table: ', error)
   } finally {
      await client.end()
   }
}

export default createEventsTable
