import dotenv from 'dotenv'
import { Client, ClientConfig } from 'pg'

dotenv.config()
const dbConfig: ClientConfig = {
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: parseInt(process.env.DB_PORT as string),
}

export const createConnection = async (): Promise<Client> => {
   const client = new Client(dbConfig)
   try {
      await client.connect()
      console.log('Connection to PostgreSQL DB successful')
      return client
   } catch (err) {
      console.error('Connection to PostgreSQL DB failed', err)
      throw err
   }
}
