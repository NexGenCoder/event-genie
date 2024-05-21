'use client'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { MdEvent } from 'react-icons/md'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaUserEdit } from 'react-icons/fa'
import { TiUserDelete } from 'react-icons/ti'
import { RiBrush2Fill } from 'react-icons/ri'
import { MdLanguage } from 'react-icons/md'
import { IoEarth } from 'react-icons/io5'
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link'

interface ProfileSidebarProps {
   userId: string
}

const ProfileSidebar = ({ userId }: ProfileSidebarProps) => {
   const {
      token: { colorBgContainer, colorTextBase, colorBgTextHover, colorBgBlur },
   } = theme.useToken()

   return (
      <Layout
         className="relative w-[200px] h-full overflow-y-auto"
         style={{ backgroundColor: colorBgBlur }}
      >
         <Menu
            defaultSelectedKeys={['view-profile']}
            className="h-full border-l border-gray-200"
            defaultOpenKeys={['profile']}
            mode="inline"
            style={{ backgroundColor: colorBgContainer, color: colorTextBase }}
            items={[
               {
                  key: 'profile',
                  label: 'Profile',
                  type: 'group',
                  children: [
                     {
                        key: 'view-profile',
                        icon: <CgProfile />,
                        label: (
                           <Link href={`/app/${userId}/profile`}>
                              View Profile
                           </Link>
                        ),
                     },
                     {
                        key: 'edit-profile',
                        icon: <FaUserEdit />,
                        label: (
                           <Link
                              href={`/app/${userId}/profile?tab=edit-profile`}
                           >
                              Edit Profile
                           </Link>
                        ),
                     },
                  ],
               },
               {
                  key: 'events',
                  label: 'Events',
                  type: 'group',
                  children: [
                     {
                        key: 'view-events',
                        icon: <FaCalendarAlt />,
                        label: (
                           <Link href={`/app/${userId}/profile?tab=events`}>
                              View Events
                           </Link>
                        ),
                     },
                     {
                        key: 'create-event',
                        icon: <MdEvent />,
                        label: (
                           <Link
                              href={`/app/${userId}/profile?tab=create-event`}
                           >
                              Create Event
                           </Link>
                        ),
                     },
                  ],
               },
               {
                  key: 'theme',
                  label: 'Theme',
                  type: 'group',
                  children: [
                     {
                        key: 'change-theme',
                        icon: <RiBrush2Fill />,
                        label: (
                           <Link href={`/app/${userId}/profile?tab=theme`}>
                              Theme
                           </Link>
                        ),
                     },
                  ],
               },
               {
                  key: 'language',
                  label: 'Language',
                  type: 'group',
                  children: [
                     {
                        key: 'change-language',
                        icon: <MdLanguage />,
                        label: (
                           <Link href={`/app/${userId}/profile?tab=language`}>
                              Language
                           </Link>
                        ),
                     },
                     {
                        key: 'change-country',
                        icon: <IoEarth />,
                        label: (
                           <Link href={`/app/${userId}/profile?tab=country`}>
                              Country
                           </Link>
                        ),
                     },
                  ],
               },
               {
                  key: 'security',
                  label: 'Security',
                  type: 'group',
                  children: [
                     {
                        key: 'delete-account',
                        icon: <TiUserDelete />,
                        label: (
                           <Link
                              href={`/app/${userId}/profile?tab=delete-account`}
                           >
                              Delete Account
                           </Link>
                        ),
                     },
                  ],
               },
            ]}
         />
      </Layout>
   )
}

export default ProfileSidebar
