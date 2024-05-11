import { pool } from '../utils/dbconnect'

const createEventsTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS Events (
            eventID INT PRIMARY KEY AUTO_INCREMENT,
            eventName VARCHAR(255) NOT NULL,
            organizerID INT,
            FOREIGN KEY (organizerID) REFERENCES Users(userID),
            startDateTime DATETIME NOT NULL,
            endDateTime DATETIME NOT NULL,
            venueID INT,
            FOREIGN KEY (venueID) REFERENCES Venues(venueID),
            description TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
      `)
      console.log('Events table created')
   } catch (error) {
      console.error('Error creating Events table: ', error)
   } finally {
      conn.release()
   }
}

export default createEventsTable
