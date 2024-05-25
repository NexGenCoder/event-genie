export type IChannelCategory = {
   categoryid: string
   eventid: string
   name: string
   description: string
   created_at: string
   updated_at: string
}

export type ICreateChannelCategory = {
   eventid: string
   name: string
   description: string
}

export type IChannel = {
   channelid: string
   categoryid: string
   eventid: string
   name: string
   icon: string
   type: 'text' | 'voice'
   description: string
   isPrivate: boolean
   created_at: string
   updated_at: string
}

export type ICreateChannel = {
   categoryid: string
   eventid: string
   name: string
   icon: string
   type: 'text' | 'voice'
   description: string
   isPrivate: boolean
}

export type IChannelCategoryList = {
   categoryid: string
   eventid: string
   name: string
   description: string
   created_at: string
   updated_at: string
   channels: IChannel[]
}

export type IChannelLIst = {
   message: string
   data: IChannelCategoryList[]
}
