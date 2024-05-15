import React from 'react'

import Profile from '@/components/profile'

function ProfilePage() {
   return <Profile />
}

export default ProfilePage

export function generateMetadata() {
   return {
      title: 'Profile | Getogether',
      description:
         'Profile page of Getogether. Edit your profile, view your events, and more. Getogether is a platform to host and join events.',
      image: '/next.svg',
      url: 'https://getogether.com/profile',
   }
}
