'use client'
import React from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AddUserDetailsForm from './user-details-form'

function CompleteProfile() {
   const { data: userData, isLoggedin } = useIsAuthenticated()

   return <>{userData && <AddUserDetailsForm userData={userData} />}</>
}

export default CompleteProfile
