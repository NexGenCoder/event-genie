export const categoriesAndChannels = [
   {
      category: {
         name: 'Text channels',
         description: 'Category for text channels',
      },
      channels: [
         {
            name: 'General',
            icon: 'text',
            type: 'text',
            description: 'General discussion channel',
            isPrivate: false,
         },
         {
            name: 'Welcome',
            icon: 'pray',
            type: 'text',
            description: 'Welcome messages channel',
            isPrivate: false,
         },
         {
            name: 'Help',
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
            name: 'General',
            icon: 'voice',
            type: 'voice',
            description: 'Voice chat channel',
            isPrivate: false,
         },
      ],
   },
]
