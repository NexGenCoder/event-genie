import dotenv from 'dotenv'
import { createPool, Pool, PoolConfig } from 'mariadb'

dotenv.config()

const poolConfig: PoolConfig = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   connectionLimit: 5,
}

export const pool: Pool = createPool(poolConfig)
