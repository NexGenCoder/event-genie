export const categoriesAndChannels = [
   {
      category: {
         name: 'Text channels',
         description: 'Category for text channels',
      },
      channels: [
         {
            name: 'General channel',
            icon: 'general',
            type: 'text',
            description: 'General discussion channel',
            isPrivate: false,
         },
         {
            name: 'Welcome channel',
            icon: 'welcome',
            type: 'text',
            description: 'Welcome messages channel',
            isPrivate: false,
         },
         {
            name: 'Help channel',
            icon: 'help',
            type: 'text',
            description: 'Channel for getting help',
            isPrivate: false,
         },
      ],
   },
   {
      category: {
         name: 'Voice channels',
         description: 'Category for voice channels',
      },
      channels: [
         {
            name: 'Voice channel',
            icon: 'voice',
            type: 'voice',
            description: 'Voice chat channel',
            isPrivate: false,
         },
      ],
   },
]
