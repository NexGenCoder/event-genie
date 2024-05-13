import React from 'react'

function NavUserProfileShimmer() {
   return (
      <nav className="flex gap-2 text-sm  items-center ">
         <button className="flex gap-2 text-sm  items-center rounded-xl animate-pulse">
            <div className="flex justify-around gap-1">
               <div className=" w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
            <div className=" w-20 h-5 bg-gray-300 rounded-full"></div>
            <div className=" w-5 h-5 bg-gray-300 rounded-full"></div>
         </button>
      </nav>
   )
}

export default NavUserProfileShimmer
