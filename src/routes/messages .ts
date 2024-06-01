import express from 'express'

import {
   getMessagesByChannelIdController,
   getMessagesByGuestListIdController,
   sendDirectMessageController,
   sendMessageController,
} from '../controller/messages'
import { authinticate } from '../middlewares/authinticate'
import {
   CreateDirectMessageValidator,
   CreateMessageValidator,
} from '../middlewares/messages'

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
      getMessagesByChannelIdController,
   )
   router.post(
      `/chats`,
      authinticate,
      CreateDirectMessageValidator,
      sendDirectMessageController,
   )
   router.get(
      '/chats/:user1id/:user2id',
      authinticate,
      getMessagesByGuestListIdController,
   )
}
