import { Avatar, Space, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import { RiArrowDownWideLine } from 'react-icons/ri'

import { UserOutlined } from '@ant-design/icons'

const { Text, Link } = Typography

interface NavUserProfileProps {
   profilePicture: string
   firstName: string
}
function NavUserProfile({ profilePicture, firstName }: NavUserProfileProps) {
   return (
      <button className="flex gap-2 text-sm  items-center rounded-xl">
         <Avatar
            icon={<UserOutlined />}
            size="large"
            src={
               <Image
                  src={profilePicture || '/user.png'}
                  alt="Profile Picture"
                  width={40}
                  height={40}
               />
            }
         />

         <Text strong className="text-lg">
            {firstName}
         </Text>

         <RiArrowDownWideLine size={22} />
      </button>
   )
}

export default NavUserProfile
