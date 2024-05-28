import { createConnection } from '../utils/dbconnect'
import createChannelCategoriesTable from './create_channel_categories_table'
import createChannelsTable from './create_channels_table'
import createEventTypeTable from './create_event_type_table'
import createEventTable from './create_events_table'
import createGuestsTable from './create_guest_list_table'
import createMessagesTable from './create_messages_table'
import createOtpsTable from './create_otps_table'
import createRsvpsTable from './create_rsvps_table'
import createUsersTable from './create_users_table'

const migrations = async () => {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const client = await createConnection()
   try {
      // await client.query('DROP TABLE IF EXISTS channels CASCADE')
      // await client.query('DROP TABLE IF EXISTS events CASCADE')
      // await client.query('DROP TABLE IF EXISTS event_types CASCADE')
      // await client.query('DROP TABLE IF EXISTS channel_categories CASCADE')
      // await client.query('DROP TABLE IF EXISTS otps CASCADE')
      // await client.query('DROP TABLE IF EXISTS users CASCADE')
      // await client.query('DROP TABLE IF EXISTS rsvps CASCADE')
      // await client.query('DROP TABLE IF EXISTS messages CASCADE')
      // await client.query('DROP TABLE IF EXISTS guests CASCADE')

      await createUsersTable()
      await createOtpsTable()
      await createEventTypeTable()
      await createEventTable()
      await createChannelCategoriesTable()
      await createChannelsTable()
      await createRsvpsTable()
      await createGuestsTable()
      await createMessagesTable()
   } catch (error) {
      console.error('Error creating tables:', error)
      throw error
   }
}

export default migrations
