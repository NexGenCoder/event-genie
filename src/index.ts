import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

import createUsersTable from './migrations/create_users_table'
import router from './routes'
import passport from './services/passport'
import { createConnection } from './utils/dbconnect'
import createOtpsTable from './migrations/create_otps_table'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   }),
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secret: process.env.SESSION_SECRET,
   }),
)

app.use(passport.initialize())
app.use(passport.session())

const server = http.createServer(app)

server.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
})
;(async () => {
   try {
      const client = await createConnection()

      // Run migrations
      await createUsersTable()
      await createOtpsTable()

      // Remember to close the connection when done
      await client.end()
   } catch (error) {
      console.error('Error running migration:', error)
      process.exit(1)
   }
})()

app.use('/', router())
