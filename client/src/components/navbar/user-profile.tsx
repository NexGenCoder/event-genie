import React from 'react'
import Image from 'next/image'
import { IoMdArrowDropdown } from 'react-icons/io'
interface NavUserProfileProps {
   profilePicture: string
   firstName: string
}
function NavUserProfile({ profilePicture, firstName }: NavUserProfileProps) {
   return (
      <button className="flex gap-4 text-sm  items-center rounded-xl">
         <div className="flex justify-around gap-2">
            <Image
               src={profilePicture || '/user.png'}
               alt="Profile Picture"
               width={40}
               height={40}
               className="rounded-full"
            />
         </div>

         <span className="text-xl">{firstName}</span>

         <IoMdArrowDropdown size={25} />
      </button>
   )
}

export default NavUserProfile
