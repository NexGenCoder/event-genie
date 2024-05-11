import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoLogIn, IoLogOut, IoSearch } from 'react-icons/io5'

import LogoImage from '../../../public/OccasionGuru.jpeg'

function Navbar() {
   const isLoggedin = false
   const handleLogout = async () => {
      console.log('Logout')
   }
   return (
      <nav className="w-full sticky top-0  z-50 px-8 p-2 mx-auto flex justify-between bg text-white ">
         <div className="flex gap-6  ">
            <Link href="/" className="flex items-center text-md gap-2  ">
               <Image
                  src={LogoImage}
                  width={40}
                  height={40}
                  alt="Occasion Guru Logo"
                  className="rounded-full"
               />

               <span className="text-xl font-bold">Occasion Guru</span>
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
         {isLoggedin ? (
            <nav className="flex gap-4 text-sm  items-center">
               <button
                  onClick={handleLogout}
                  className="flex justify-center items-center  gap-2 py-2 px-5 rounded-full  bg-[#c73d75] hover:bg-[#B4245D]"
               >
                  <IoLogOut className="text-xl" />
                  <span>Logout</span>
               </button>
            </nav>
         ) : (
            <nav className="flex gap-2 text-sm  items-center">
               <Link
                  href="/search"
                  className="flex justify-center items-center  gap-2 p-2  md:py-2 md:px-5 rounded-full  bg-[#c73d75] hover:bg-[#B4245D]"
               >
                  <IoSearch className="text-xl" />
                  <span className="hidden md:block">Search</span>
               </Link>
               <Link
                  href="/login"
                  className="flex justify-center items-center  gap-2  py-2 px-5 rounded-full  bg-[#c73d75] hover:bg-[#B4245D]"
               >
                  <IoLogIn className="hidden md:block text-xl" />
                  <span>Login</span>
               </Link>
            </nav>
         )}
      </nav>
   )
}

export default Navbar
