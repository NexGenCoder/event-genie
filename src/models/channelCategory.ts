import { createConnection } from '../utils/dbconnect'
import { ICreateChannelCategory } from './../types/channel'

export const createChannelCategoryModel = async (
   channelCategory: ICreateChannelCategory,
): Promise<string> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
            INSERT INTO channel_categories (eventid, name, description)
            VALUES ($1, $2, $3)
            RETURNING categoryid;
        `,
         [
            channelCategory.eventid,
            channelCategory.name,
            channelCategory.description,
         ],
      )
      return result.rows[0].categoryid
   } finally {
      await client.end()
   }
}
