import { pool } from '../utils/dbconnect'

const createVenuesTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS Venues (
            venueID INT PRIMARY KEY AUTO_INCREMENT,
            venueName VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            capacity INT NOT NULL,
            description TEXT,
            type ENUM('Indoor', 'Outdoor') NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            perHour DECIMAL(10,2) NOT NULL,
            perDay DECIMAL(10,2) NOT NULL,
            perWeek DECIMAL(10,2) NOT NULL,
            perMonth DECIMAL(10,2) NOT NULL,
            perPerson DECIMAL(10,2) NOT NULL
         )
      `)
      console.log('Venues table created successfully')
   } catch (error) {
      console.error('Error while creating venues table:', error)
   } finally {
      conn.release()
   }
}

export default createVenuesTable
