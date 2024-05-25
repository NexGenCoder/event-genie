import { ICreateChannel, ICreateChannelCategory } from 'types/channel'

import { categoriesAndChannels } from '../../data/categoriesAndChannels'
import { createCategoryModel } from '../../models/channelCategory'
import { createChannelModel } from '../../models/channels'

export const defaultCategoriesAndChannels = async (eventId: string) => {
   for (const categoryAndChannels of categoriesAndChannels) {
      const { category, channels } = categoryAndChannels
      const categoryId = await createCategoryModel({
         eventid: eventId,
         name: category.name,
         description: category.description,
      } as ICreateChannelCategory)

      for (const channel of channels) {
         await createChannelModel({
            categoryid: categoryId,
            eventid: eventId,
            name: channel.name,
            icon: channel.icon,
            type: channel.type,
            description: channel.description,
            isPrivate: channel.isPrivate,
         } as ICreateChannel)
      }
   }
}
