import { pool } from '../utils/dbconnect'

/*
-- EventParticipants Table
CREATE TABLE EventParticipants (
  participantID INT PRIMARY KEY,
  eventID INT,
  FOREIGN KEY (eventID) REFERENCES Events(eventID),
  userID INT,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  rsvpID INT,
  FOREIGN KEY (rsvpID) REFERENCES RSVPs(rsvpID),
  role ENUM('Organizer', 'Vendor', 'Guest') NOT NULL,
  rsvpStatus ENUM('Accepted', 'Declined', 'Pending'),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/
const createEventParticipantsTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS EventParticipants (
            participantID INT PRIMARY KEY AUTO_INCREMENT,
            eventID INT,
            FOREIGN KEY (eventID) REFERENCES Events(eventID),
            userID INT,
            FOREIGN KEY (userID) REFERENCES Users(userID),
            rsvpID INT,
            FOREIGN KEY (rsvpID) REFERENCES RSVPs(rsvpID),
            role ENUM('Organizer', 'Vendor', 'Guest') NOT NULL,
            rsvpStatus ENUM('Accepted', 'Declined', 'Pending'),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
      `)
      console.log('EventParticipants table created')
   } catch (error) {
      console.error('Error creating EventParticipants table: ', error)
   } finally {
      conn.release()
   }
}

export default createEventParticipantsTable
