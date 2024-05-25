import { IChannelCategory, ICreateChannelCategory } from '../types/channel'
import { createConnection } from '../utils/dbconnect'

export const createCategoryModel = async (
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

export const getCategoriesByEventIdModal = async (
   eventid: string,
): Promise<IChannelCategory[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
            SELECT * FROM channel_categories WHERE eventid = $1
        `,
         [eventid],
      )
      return result.rows
   } finally {
      await client.end()
   }
}
