import express from 'express'

import {
   getMessagesByChannelIdModel,
   sendMessageModel,
} from '../models/messages'
import { IMessageInput } from '../types/message'

export const sendMessageController = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const userid = res.locals.userid
      const requestBody: IMessageInput = req.body

      await sendMessageModel({ senderid: userid, ...requestBody })
      return res.status(200).json({ message: 'Message sent successfully' })
   } catch (error) {
      console.error('Error sending message: ', error)
   }
}

export const getMessagesByChannelId = async (
   req: express.Request,
   res: express.Response,
) => {
   try {
      const { channelid } = req.params
      const messages = await getMessagesByChannelIdModel(channelid)
      return res.status(200).json(messages)
   } catch (error) {
      console.error('Error fetching messages: ', error)
      return res.status(500).json({ message: 'Internal server error' })
   }
}
