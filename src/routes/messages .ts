import express from 'express'

import { authinticate } from './../middlewares/authinticate'
import {
   sendMessageController,
   getMessagesByChannelId,
} from '../controller/messages'
import { CreateMessageValidator } from '../middlewares/messages'

export default (router: express.Router) => {
   router.post(
      '/channels/:channelid/messages',
      authinticate,
      CreateMessageValidator,
      sendMessageController,
   )
   router.get(
      '/channels/:channelid/messages',
      authinticate,
      getMessagesByChannelId,
   )
}
