import { Dropdown, Typography } from 'antd'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { CiSettings } from 'react-icons/ci'
import { RiLogoutCircleRLine } from 'react-icons/ri'

import { API } from '@/constants'

const { Link } = Typography
import type { MenuProps } from 'antd'
const items: MenuProps['items'] = [
   {
      key: '1',
      label: (
         <Link
            href="/edit-profile"
            className=" py-1 px-4  flex items-center gap-2 "
         >
            <CgProfile className="inline-block" />
            Profile
         </Link>
      ),
   },
   {
      key: '2',
      label: (
         <Link
            href="/settings"
            className=" py-1 px-4  flex items-center gap-2 "
         >
            <CiSettings className="inline-block" />
            Settings
         </Link>
      ),
   },
   {
      key: '3',
      label: (
         <Link
            href={`${API}/auth/logout`}
            className=" py-1 px-4  flex items-center gap-2 "
         >
            <RiLogoutCircleRLine className="inline-block" />
            Logout
         </Link>
      ),
   },
]

interface ProfileDropdownProps {
   children: React.ReactNode
}

const ProfileDropdown = ({ children }: ProfileDropdownProps) => (
   <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>{children}</a>
   </Dropdown>
)

export default ProfileDropdown
