import { Avatar, Space } from 'antd'
import Image from 'next/image'
import React from 'react'
import { RiArrowDownWideLine } from 'react-icons/ri'

import { UserOutlined } from '@ant-design/icons'

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

         <span className="text-lg">{firstName}</span>

         <RiArrowDownWideLine size={22} />
      </button>
   )
}

export default NavUserProfile
