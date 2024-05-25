import { ICreateChannel, ICreateChannelCategory } from 'types/channel'
import { createChannelCategoryModel } from '../../models/channelCategory'
import { createChannelModel } from '../../models/channels'
import { categoriesAndChannels } from './../../data/categoriesAndChannels'

export const defaultCategoriesAndChannels = async (eventId: string) => {
   for (const categoryAndChannels of categoriesAndChannels) {
      const { category, channels } = categoryAndChannels
      const categoryId = await createChannelCategoryModel({
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
