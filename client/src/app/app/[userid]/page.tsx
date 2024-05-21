import Sidebar from '@/components/(app)/sidebar/home'
import Menus from '@/components/(app)/sidebar/menu'
import { Layout } from 'antd'
import React from 'react'

interface UserHomePageProps {
   params: {
      userid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   console.log(params.userid)
   return (
      <Layout className="h-screen">
         <div className="flex w-[300px] h-full">
            <Menus userId={params.userid} />
            <Sidebar />
         </div>
         <div className="w-full"></div>
      </Layout>
   )
}

export default UserHomePage
