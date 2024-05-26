import createDefaultRolesAndPermissions from "./../utils/default/createDefaultRolesAndPermissions"
import createRoleTriggerFunction from "./createRoleTriggerFunction "
import updateUsersTable from "./update_users_table"
import createChannelCategoriesTable from "./create_channel_categories_table"
import createChannelsTable from "./create_channels_table"
import createEventTypeTable from "./create_event_type_table"
import createEventTable from "./create_events_table"
import createGuestsTable from "./create_guest_list_table"
import createMessagesTable from "./create_messages_table"
import createOtpsTable from "./create_otps_table"
import createPermissionsTable from "./create_permissions_tables"
import createRolePermissionsTable from "./create_rolepermissions_tables"
import createRolesTable from "./create_roles_tables"
import createRsvpsTable from "./create_rsvps_table"
import createUserRolesTable from "./create_userroles_tables"
import createUsersTable from "./create_users_table"

import { createConnection } from '../utils/dbconnect'

const setupDatabase = async () => {
    const client = await createConnection()
  try {

    
      await client.query('DROP TABLE IF EXISTS channels CASCADE')
      await client.query('DROP TABLE IF EXISTS events CASCADE')
      await client.query('DROP TABLE IF EXISTS event_types CASCADE')
      await client.query('DROP TABLE IF EXISTS channel_categories CASCADE')
      await client.query('DROP TABLE IF EXISTS otps CASCADE')
      await client.query('DROP TABLE IF EXISTS users CASCADE')
      await client.query('DROP TABLE IF EXISTS rsvps CASCADE')
      await client.query('DROP TABLE IF EXISTS messages CASCADE')
      await client.query('DROP TABLE IF EXISTS roles CASCADE')
      await client.query('DROP TABLE IF EXISTS permissions CASCADE')
      await client.query('DROP TABLE IF EXISTS role_permissions CASCADE')
      await client.query('DROP TABLE IF EXISTS user_roles CASCADE')
        await client.query('DROP TABLE IF EXISTS guests CASCADE')



    await createUsersTable()
    await createOtpsTable()
    await createEventTypeTable()
    await createEventTable()
    await createChannelCategoriesTable()
    await createChannelsTable()
    await createRsvpsTable()
    await createGuestsTable()
    await createMessagesTable()
    await createRolesTable()
    await createPermissionsTable()
    await createRolePermissionsTable()
    await createUserRolesTable()
    await updateUsersTable()
    await createDefaultRolesAndPermissions()
    await createRoleTriggerFunction()
    console.log('Database setup completed successfully')
  } catch (error) {
    console.error('Error setting up the database: ', error)
  }
}

export default setupDatabase
