import { IMessageInput, IMessage } from 'types/message'
import { createConnection } from '../utils/dbconnect'

export const sendMessageModel = async (
   message: IMessageInput,
): Promise<IMessage> => {
   const client = await createConnection()
   try {
      const { rows } = await client.query(
         `
         INSERT INTO messages (channelid, type, content, senderid)
         VALUES ($1, $2, $3, $4)
         RETURNING *
      `,
         [message.channelid, message.type, message.content, message.senderid],
      )
      return rows[0] as IMessage
   } catch (error) {
      console.error('Error sending message: ', error)
      throw error
   }
}

export const getMessagesByChannelIdModel = async (
   channelid: string,
): Promise<IMessage[]> => {
   const client = await createConnection()
   try {
      const { rows } = await client.query(
         `
       SELECT 
         m.messageid,
         m.channelid,
         m.type,
         m.content,
         m.timestamp,
         m.created_at,
         m.updated_at,
         u.userid,
         u.firstname || ' ' || u.lastname as name,
         u.username,
         u.profile_picture as avatar
       FROM messages m
       JOIN users u ON m.senderid = u.userid
       WHERE m.channelid = $1
       ORDER BY m.timestamp ASC
       `,
         [channelid],
      )

      return rows.map((row) => ({
         messageid: row.messageid,
         channelid: row.channelid,
         type: row.type,
         content: row.content,
         timestamp: row.timestamp,
         created_at: row.created_at,
         updated_at: row.updated_at,
         sender: {
            userid: row.userid,
            name: row.name,
            username: row.username,
            avatar: row.avatar,
         },
      })) as IMessage[]
   } catch (error) {
      console.error('Error fetching messages: ', error)
      throw error
   } finally {
      client.end()
   }
}
