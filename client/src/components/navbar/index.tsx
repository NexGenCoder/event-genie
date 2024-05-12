import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoLogIn, IoLogOut, IoSearch } from 'react-icons/io5'
import { IoMdArrowDropdown } from 'react-icons/io'
import LogoImage from '../../../public/OccasionGuru.jpeg'
import { useLogoutMutation } from '@/app/services/authApi'
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import NavUserProfile from './user-profile'
import NavUserProfileShimmer from './user-profile-shimmer'

function Navbar() {
   const { isLoggedin, data, isLoading } = useIsAuthenticated()
   console.log('🚀 ~ Navbar ~ data:', data)
   const [logout] = useLogoutMutation()
   const router = useRouter()
   const handleLogout = async () => {
      try {
         const response = await logout()
         toast.success('Logged out successfully', { position: 'top-right' })
         router.push('/login')
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
         console.error(error)
      }
   }
   return (
      <nav className="w-full sticky top-0  z-50 px-8 p-4 mx-auto flex justify-between bg text-white ">
         <div className="flex gap-6  ">
            <Link href="/" className="flex items-center text-md gap-2  ">
               <Image
                  src={LogoImage}
                  width={35}
                  height={35}
                  alt="Occasion Guru Logo"
                  className="rounded-full"
               />

               <span>Occasion Guru</span>
            </Link>
            <nav className="md:flex items-center   text-sm hidden ">
               <Link
                  href="/"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
               >
                  Home
               </Link>
               <Link
                  href="/secret"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
               >
                  Vendors
               </Link>
               <Link
                  href="/profile"
                  className="flex justify-center items-center  gap-2 py-2 px-5"
               >
                  Events
               </Link>
            </nav>
         </div>
         <nav className="flex gap-2 text-sm items-center">
            {isLoading ? (
               <NavUserProfileShimmer />
            ) : (
               <>
                  {isLoggedin ? (
                     <>
                        {data && (
                           <NavUserProfile
                              profilePicture={data.profilePicture}
                              firstName={data.firstName}
                           />
                        )}
                     </>
                  ) : (
                     <Link
                        href="/login"
                        className="flex justify-center items-center gap-2 py-2 px-5 rounded-full bg-[#c73d75] hover:bg-[#B4245D]"
                     >
                        <IoLogIn className="hidden md:block text-xl" />
                        <span>Login</span>
                     </Link>
                  )}
               </>
            )}
         </nav>
      </nav>
   )
}

export default Navbar
