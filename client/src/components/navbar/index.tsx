import { Button, Flex, Switch, theme, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoLogIn } from 'react-icons/io5'

import { useLogoutMutation } from '@/app/services/authApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'

import LogoImage from '../../../public/OccasionGuru.jpeg'
import LoginModal from '../login/login-modal'
import ProfileDropdown from './profile-dropdown'
import NavUserProfile from './user-profile'
import NavUserProfileShimmer from './user-profile-shimmer'

interface NavbarProps {
   setIsDarkMode: (isDarkMode: boolean) => void
}

function Navbar({ setIsDarkMode }: NavbarProps) {
   const { isLoggedin, data, isLoading } = useIsAuthenticated()
   const [logout] = useLogoutMutation()
   const router = useRouter()

   const [isModalOpen, setIsModalOpen] = useState(false)

   const showModal = () => {
      setIsModalOpen(true)
   }

   const handleCancel = () => {
      setIsModalOpen(false)
   }
   const handleLogout = async () => {
      try {
         await logout()
         toast.success('Logged out successfully', { position: 'top-right' })
         router.push('/login')
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
         console.error(error)
      }
   }
   const {
      token: { colorBgContainer, colorTextBase },
   } = theme.useToken()
   return (
      <Header
         className="w-full sticky top-0 z-50 px-8 py-2 flex justify-between shadow"
         style={{ backgroundColor: colorBgContainer }}
      >
         <Flex gap="middle">
            <Link
               href="/"
               className="flex items-center text-md gap-2"
               style={{ color: colorTextBase }}
            >
               <Image
                  src={LogoImage}
                  width={35}
                  height={35}
                  alt="Occasion Guru Logo"
                  className="rounded-full"
               />
               Occasion Guru
            </Link>
            <nav className="md:flex items-center text-sm hidden ">
               <Link
                  href="/"
                  title="Home"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Home
               </Link>
               <Link
                  href="/vendors"
                  title="Vendors"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Vendors
               </Link>
               <Link
                  href="/profile"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
                  style={{ color: colorTextBase }}
               >
                  Events
               </Link>
            </nav>
         </Flex>
         <div className="flex gap-2 text-sm items-center">
            {isLoading ? (
               <NavUserProfileShimmer />
            ) : (
               <>
                  {isLoggedin ? (
                     <>
                        {data && (
                           <ProfileDropdown>
                              <NavUserProfile
                                 profilePicture={data.profilePicture}
                                 firstName={data.firstName}
                              />
                           </ProfileDropdown>
                        )}
                     </>
                  ) : (
                     <>
                        <Button
                           className=" py-2 px-5 flex items-center gap-2"
                           onClick={showModal}
                           icon={<IoLogIn />}
                        >
                           Login
                        </Button>
                        <Switch
                           checkedChildren="🌞"
                           unCheckedChildren="🌜"
                           defaultChecked
                           onChange={(checked) => setIsDarkMode(checked)}
                        />
                     </>
                  )}
               </>
            )}
         </div>
         <LoginModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
      </Header>
   )
}

export default Navbar
