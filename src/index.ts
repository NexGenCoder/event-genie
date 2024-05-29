import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

import router from './routes'
import passport from './services/passport'
import migrations from './migrations'
import { createConnection } from './utils/dbconnect'
import createVendorsTable from './migrations/create_vendor_table'

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
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
   },
})

io.on('connection', (socket) => {
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
   const client = await createConnection()
   await client.query('DROP TABLE IF EXISTS conversations CASCADE')
   await client.query('DROP TABLE IF EXISTS direct_messages CASCADE')
   await migrations()
})()

app.use('/', router())
