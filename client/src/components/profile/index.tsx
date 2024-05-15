'use client'
import { Drawer, Layout } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import AddUserDetailsForm from './profile-form'

function Profile() {
   const [open, setOpen] = useState(false)
   const searchParam = useSearchParams()
   const router = useRouter()

   const { data: userData, isLoggedin } = useIsAuthenticated()

   useEffect(() => {
      if (searchParam.has('edit')) {
         setOpen(true)
      }
   }, [searchParam])

   const handleEditProfileDrawer = () => {
      if (!isLoggedin) {
         return
      }
      setOpen(true)
      router.replace('/profile?edit=true')
   }

   const handleDrawerClose = () => {
      setOpen(false)
      router.replace('/profile')
   }

   return (
      <Layout>
         <Drawer
            title="Edit Profile"
            width={720}
            onClose={handleDrawerClose}
            open={open}
         >
            {userData && <AddUserDetailsForm userData={userData} />}
         </Drawer>
         <button onClick={handleEditProfileDrawer}>Open</button>
      </Layout>
   )
}

export default Profile
