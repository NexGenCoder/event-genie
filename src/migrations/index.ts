import createChannelCategoriesTable from './create_channel_categories_table'
import createChannelsTable from './create_channels_table'
import createEventTypeTable from './create_event_type_table'
import createEventTable from './create_events_table'
import createGuestsTable from './create_guest_list_table'
import createMessagesTable from './create_messages_table'
import createOtpsTable from './create_otps_table'
import createRsvpsTable from './create_rsvps_table'
import createUsersTable from './create_users_table'
import createDirectMessagesTable from './create_direct_messages_table'
import createConversationsTable from './create_conversations _table'

const migrations = async () => {
   try {
      await createUsersTable()
      await createOtpsTable()
      await createEventTypeTable()
      await createEventTable()
      await createChannelCategoriesTable()
      await createChannelsTable()
      await createRsvpsTable()
      await createGuestsTable()
      await createMessagesTable()
      await createConversationsTable()
      await createDirectMessagesTable()
   } catch (error) {
      console.error('Error creating tables:', error)
      throw error
   }
}

export default migrations
