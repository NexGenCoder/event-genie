import React, { useState } from 'react'
import {
   Button,
   Flex,
   Modal,
   Tooltip,
   theme,
   Typography,
   Dropdown,
   Avatar,
} from 'antd'
import { MdPersonAdd } from 'react-icons/md'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import Image from 'next/image'
const { Text } = Typography

const EventSwitch = () => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <Dropdown
         arrow={{ pointAtCenter: true }}
         placement="topLeft"
         trigger={['click']}
         overlay={
            <Flex
               vertical
               className="p-2 rounded-md"
               style={{ backgroundColor: colorBgContainer }}
            >
               <Button
                  type="text"
                  className="flex items-center justify-center p-4"
                  icon={<MdPersonAdd color={colorTextBase} />}
               >
                  <Text className="text-xs">Invite People</Text>
               </Button>
               <Button
                  type="text"
                  className="flex items-center justify-center p-4"
                  icon={<BiSolidMessageSquareAdd color={colorTextBase} />}
               >
                  <Text className="text-xs">Text Channel</Text>
               </Button>
            </Flex>
         }
      >
         <Flex
            vertical
            align="center"
            justify="center"
            style={{ backgroundColor: colorBgContainer }}
            className={`rounded-xl p-2 cursor-pointer border
            `}
         >
            <Avatar
               size={50}
               shape="square"
               src={
                  <Image
                     src="/app/wedding-event.png"
                     alt="logo"
                     width={50}
                     height={50}
                  />
               }
            />
            {/* </Tooltip> */}
         </Flex>
      </Dropdown>
   )
}

export default EventSwitch
