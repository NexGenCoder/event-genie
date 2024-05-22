import { Flex, Layout, Typography } from 'antd'
import React from 'react'
import Menus from '@/components/(app)/sidebar/menu'
import ProfileSidebar from '@/components/(app)/sidebar/profile'
import UserAccount from '@/components/(app)/pages/account'

const { Title } = Typography

interface UserHomePageProps {
   params: {
      userid: string
   }
}

function UserHomePage({ params }: UserHomePageProps) {
   return (
      <Layout className="h-screen">
         <Flex className="h-full w-full">
            <Flex className="flex w-[300px] h-full ">
               <Menus userid={params.userid} />
               <ProfileSidebar userid={params.userid} />
            </Flex>
            <UserAccount />
         </Flex>
      </Layout>
   )
}

export default UserHomePage
