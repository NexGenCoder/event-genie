import { pool } from '../utils/dbconnect'

const createRSVPsTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS RSVPs (
            rsvpID INT PRIMARY KEY AUTO_INCREMENT,
            eventID INT,
            FOREIGN KEY (eventID) REFERENCES Events(eventID),
            userID INT,
            FOREIGN KEY (userID) REFERENCES Users(userID),
            role ENUM('Organizer', 'Vendor', 'Guest') NOT NULL,
            rsvpStatus ENUM('Accepted', 'Declined', 'Pending'),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
      `)
      console.log('RSVPs table created')
   } catch (error) {
      console.error('Error creating RSVPs table: ', error)
   } finally {
      conn.release()
   }
}

export default createRSVPsTable
