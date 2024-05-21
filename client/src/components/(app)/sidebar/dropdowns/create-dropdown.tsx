import React, { useState } from 'react'
import { Button, Flex, Modal, Tooltip, theme, Typography, Dropdown } from 'antd'
import { MdAddCircle } from 'react-icons/md'
import { MdPersonAdd } from 'react-icons/md'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
const { Text } = Typography

const CreateDropdown = () => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover },
   } = theme.useToken()

   return (
      <>
         <Dropdown
            arrow={{ pointAtCenter: true }}
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
            <Tooltip title="Create" placement="right">
               <Button
                  type="text"
                  icon={<MdAddCircle size={40} color={colorTextBase} />}
               />
            </Tooltip>
         </Dropdown>
      </>
   )
}

export default CreateDropdown
