import AddUserDetailsForm from '@/components/form/user-details'
import React from 'react'

function CompleteProfilePage() {
   return <AddUserDetailsForm />
}

export default CompleteProfilePage

export function generateMetadata() {
   return {
      title: 'Complete Profile | Getogether',
      description:
         "Complete your profile to get started with Getogether. Let's get to know you better.",
      image: '/next.svg',
      url: 'https://getogether.com/complete-profile',
   }
}
