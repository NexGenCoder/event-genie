import { pool } from '../utils/dbconnect'

const createVendorServicesTable = async () => {
   const conn = await pool.getConnection()
   try {
      await conn.query(`
         CREATE TABLE IF NOT EXISTS VendorServices (
            serviceID INT PRIMARY KEY AUTO_INCREMENT,
            vendorID INT,
            FOREIGN KEY (vendorID) REFERENCES Users(userID),
            serviceType VARCHAR(255) NOT NULL,
            description TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
         )
      `)
      console.log('VendorServices table created')
   } catch (error) {
      console.error('Error creating VendorServices table: ', error)
   } finally {
      conn.release()
   }
}

export default createVendorServicesTable
