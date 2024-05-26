import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

import createChannelCategoriesTable from './migrations/create_channel_categories_table'
import createChannelsTable from './migrations/create_channels_table'
import createEventTypeTable from './migrations/create_event_type_table'
import createEventTable from './migrations/create_events_table'
import createOtpsTable from './migrations/create_otps_table'
import createUsersTable from './migrations/create_users_table'
import createGuestsTable from './migrations/create_guest_list_table'
import createRsvpsTable from './migrations/create_rsvps_table'
import createMessagesTable from './migrations/create_messages_table'
import router from './routes'
import passport from './services/passport'
import { createConnection } from './utils/dbconnect'
import { Server as SocketServer } from 'socket.io'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use((req, res, next) => {
   console.log(`Endpoint hit: ${req.method} ${req.url}`)
   next()
})

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

const io = new SocketServer(server, {
   cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
   },
})

io.on('connection', (socket) => {
   console.log('a user connected')

   socket.on('join', (channelId) => {
      console.log(`User joined channel: ${channelId}`)
      socket.join(channelId)
   })

   socket.on('leave', (channelId) => {
      console.log(`User left channel: ${channelId}`)
      socket.leave(channelId)
   })

   socket.on('message', (message) => {
      console.log('Message received:', message)
      io.to(message.channelid).emit('message', message)
   })

   socket.on('disconnect', () => {
      console.log('user disconnected')
   })
})

server.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
})
;(async () => {
   try {
      const client = await createConnection()
      // await client.query('DROP TABLE IF EXISTS channels CASCADE')
      // await client.query('DROP TABLE IF EXISTS events CASCADE')
      // await client.query('DROP TABLE IF EXISTS event_types CASCADE')
      // await client.query('DROP TABLE IF EXISTS channel_categories CASCADE')
      // await client.query('DROP TABLE IF EXISTS otps CASCADE')
      // await client.query('DROP TABLE IF EXISTS users CASCADE')
      // await client.query('DROP TABLE IF EXISTS rsvps CASCADE')
      // await client.query('DROP TABLE IF EXISTS messages CASCADE')
      // console.log('Tables dropped')
      await createUsersTable()
      await createOtpsTable()
      await createEventTypeTable()
      await createEventTable()
      await createChannelCategoriesTable()
      await createChannelsTable()
      await createRsvpsTable()
      await createGuestsTable()
      await createMessagesTable()
      console.log('Tables created')
      await client.end()
   } catch (error) {
      console.error('Error running migration:', error)
      process.exit(1)
   }
})()

app.use('/', router())
