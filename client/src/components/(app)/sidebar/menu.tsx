'use client'
import { Flex, Layout, Tooltip, theme, Typography, Avatar } from 'antd'
import Image from 'next/image'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { PiChatsFill } from 'react-icons/pi'
import EventSwitch from './dropdowns/event-switch'
import CreateDropdown from './dropdowns/create-dropdown'
import Link from 'next/link'
const { Text } = Typography

interface MenusProps {
   userId: string
}

const Menus = ({ userId }: MenusProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[70px] h-full px-2 py-4"
         style={{ backgroundColor: colorBgContainer }}
      >
         <div className="flex flex-col items-center justify-between h-full">
            <Flex
               gap="middle"
               vertical
               className="h-full w-full"
               align="center"
            >
               <EventSwitch />

               <Link
                  href={`/app/${userId}`}
                  className="rounded-xl p-2 w-full flex flex-col items-center justify-center cursor-pointer"
               >
                  <FaHome size={30} color={colorTextBase} />
                  <Text className="text-xs text-center">Home</Text>
               </Link>
               <Link href={`/app/${userId}/dms`}>
                  <PiChatsFill size={30} color={colorTextBase} />
                  <Text className="text-xs text-center">DMs</Text>
               </Link>
            </Flex>
            <Flex gap="middle" vertical className="w-full" align="center">
               <CreateDropdown />
               <Link href={`/app/${userId}/profile`}>
                  <Tooltip title="Sunny Sahsi" placement="right">
                     <Avatar
                        size={50}
                        shape="square"
                        src={
                           <Image
                              src="/app/user.jpg"
                              alt="logo"
                              width={50}
                              height={50}
                              className="rounded-xl"
                           />
                        }
                     />
                  </Tooltip>
               </Link>
            </Flex>
         </div>
      </Layout>
   )
}

export default Menus
