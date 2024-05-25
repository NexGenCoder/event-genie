import { ICreateChannel } from '../types/channel'
import { createConnection } from '../utils/dbconnect'

export const createChannelModel = async (
   channel: ICreateChannel,
): Promise<void> => {
   const client = await createConnection()
   try {
      await client.query(
         `
            INSERT INTO channels (categoryid, eventid, name, icon, type, description, is_private) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
         [
            channel.categoryid,
            channel.eventid,
            channel.name,
            channel.icon,
            channel.type,
            channel.description,
            channel.isPrivate,
         ],
      )
   } finally {
      await client.end()
   }
}
