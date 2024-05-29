import { IMessage, IMessageInput } from 'types/message'
import { createConnection } from '../utils/dbconnect'

export const sendDirectMessageModel = async (
   message: IMessageInput,
): Promise<IMessage> => {
   const client = await createConnection()
   try {
      await client.query('BEGIN')
      const { rows: senderRows } = await client.query(
         `
         SELECT userid FROM users WHERE userid = $1
         `,
         [message.senderid],
      )
      if (senderRows.length === 0) {
         throw new Error('Sender does not exist')
      }
      const { rows: receiverRows } = await client.query(
         `
         SELECT userid FROM users WHERE userid = $1
         `,
         [message.receiverid],
      )
      if (receiverRows.length === 0) {
         throw new Error('Receiver does not exist')
      }
      const { rows: existingConversations } = await client.query(
         `
         SELECT conversationid FROM conversations
         WHERE (user1id = $1 AND user2id = $2) OR (user1id = $2 AND user2id = $1)
         `,
         [message.senderid, message.receiverid],
      )

      let conversationid

      if (existingConversations.length > 0) {
         conversationid = existingConversations[0].conversationid
      } else {
         const { rows: newConversation } = await client.query(
            `
            INSERT INTO conversations (user1id, user2id)
            VALUES ($1, $2)
            RETURNING conversationid
            `,
            [message.senderid, message.receiverid],
         )
         conversationid = newConversation[0].conversationid
      }
      const { rows } = await client.query(
         `
         INSERT INTO direct_messages (conversationid, senderid, receiverid, type, content)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *
         `,
         [
            conversationid,
            message.senderid,
            message.receiverid,
            message.type,
            message.content,
         ],
      )
      await client.query('COMMIT')
      return rows[0] as IMessage
   } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error sending message: ', error)
      throw error
   } finally {
      await client.end()
   }
}

export const getChatMessagesWithUserDetails = async (
   user1id: string,
   user2id: string,
): Promise<IMessage[]> => {
   const client = await createConnection()
   try {
      const { rows: conversations } = await client.query(
         `
           SELECT conversationid FROM conversations
           WHERE (user1id = $1 AND user2id = $2) OR (user1id = $2 AND user2id = $1)
           `,
         [user1id, user2id],
      )

      if (conversations.length === 0) {
         // No conversation exists between the two users
         return []
      }

      const conversationid = conversations[0].conversationid

      const { rows: messages } = await client.query(
         `
           SELECT
               dm.messageid,
               dm.conversationid,
               dm.senderid,
               dm.receiverid,
               dm.type,
               dm.content,
               dm.timestamp,
               dm.created_at,
               dm.updated_at,
               sender.username AS sender_username,
               sender.firstname AS sender_firstname,
               sender.lastname AS sender_lastname,
               sender.profile_picture AS sender_profile_picture,
               receiver.username AS receiver_username,
               receiver.firstname AS receiver_firstname,
               receiver.lastname AS receiver_lastname,
               receiver.profile_picture AS receiver_profile_picture
           FROM direct_messages dm
           JOIN users sender ON dm.senderid = sender.userid
           JOIN users receiver ON dm.receiverid = receiver.userid
           WHERE dm.conversationid = $1
           ORDER BY dm.timestamp ASC
           `,
         [conversationid],
      )

      return messages.map((message) => ({
         messageid: message.messageid,
         conversationid: message.conversationid,
         senderid: message.senderid,
         receiverid: message.receiverid,
         type: message.type,
         content: message.content,
         timestamp: message.timestamp.toISOString(),
         created_at: message.created_at.toISOString(),
         updated_at: message.updated_at.toISOString(),
         sender: {
            userid: message.senderid,
            name: `${message.sender_firstname} ${message.sender_lastname}`,
            username: message.sender_username,
            avatar: message.sender_profile_picture,
         },
      })) as IMessage[]
   } catch (error) {
      console.error('Error retrieving chat messages with user details: ', error)
      throw error
   } finally {
      await client.end()
   }
}
