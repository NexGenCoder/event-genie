import express from 'express'

import {
   getMessagesByChannelId,
   sendMessageController,
} from '../controller/messages'
import { authinticate } from '../middlewares/authinticate'
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
