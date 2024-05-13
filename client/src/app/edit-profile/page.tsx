import React from 'react'

import CompleteProfile from '@/components/form/edit-user-details'

function CompleteProfilePage() {
   return <CompleteProfile />
}

export default CompleteProfilePage

export function generateMetadata() {
   return {
      title: 'Edit Profile | Getogether',
      description:
         "Complete your profile to get started with Getogether. Let's get to know you better.",
      image: '/next.svg',
      url: 'https://getogether.com/edit-profile',
   }
}
