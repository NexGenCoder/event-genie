export type ICreateMessageBody = {
   channelid: string
   type: 'text' | 'image' | 'video'
   content: string
}

export type IMessage = {
   messageid: string
   channelid?: string
   conversationid?: string
   senderid?: string
   receiverid?: string
   type: 'text' | 'image' | 'video'
   content: string
   sender: {
      userid: string
      name: string
      username?: string
      avatar: string
   }
   timestamp: string
   created_at: string
   updated_at: string
}

export type IMessageInput = {
   senderid?: string
   receiverid?: string
   channelid?: string
   type: 'text' | 'image' | 'video'
   content: string
}
