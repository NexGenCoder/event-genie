import { IChannelCategoryList } from '../types/channel'
import { createConnection } from '../utils/dbconnect'

export const getChannelCategoriesByEventIdModal = async (
   eventId: string,
): Promise<IChannelCategoryList[]> => {
   const client = await createConnection()
   try {
      const result = await client.query(
         `
            SELECT 
                cc.categoryid, cc.eventid, cc.name AS category_name, cc.description AS category_description,
                cc.created_at AS category_created_at, cc.updated_at AS category_updated_at,
                c.channelid, c.name AS channel_name, c.icon, c.type, c.description AS channel_description, 
                c.is_private AS channel_is_private, c.created_at AS channel_created_at, c.updated_at AS channel_updated_at
            FROM channel_categories cc
            LEFT JOIN channels c ON cc.categoryid = c.categoryid
            WHERE cc.eventid = $1
            ORDER BY cc.categoryid, c.channelid;
        `,
         [eventId],
      )

      const channelCategoriesMap: Map<string, IChannelCategoryList> = new Map()

      for (const row of result.rows) {
         const categoryId = row.categoryid

         if (!channelCategoriesMap.has(categoryId)) {
            channelCategoriesMap.set(categoryId, {
               categoryid: row.categoryid,
               eventid: row.eventid,
               name: row.category_name,
               description: row.category_description,
               created_at: row.category_created_at,
               updated_at: row.category_updated_at,
               channels: [],
            })
         }

         if (row.channelid) {
            channelCategoriesMap.get(categoryId)?.channels.push({
               channelid: row.channelid,
               categoryid: row.categoryid,
               eventid: row.eventid,
               name: row.channel_name,
               icon: row.icon,
               type: row.type,
               description: row.channel_description,
               isPrivate: row.channel_is_private,
               created_at: row.channel_created_at,
               updated_at: row.channel_updated_at,
            })
         }
      }

      return Array.from(channelCategoriesMap.values())
   } finally {
      await client.end()
   }
}
