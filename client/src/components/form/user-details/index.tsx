'use client'
import Image from 'next/image'
import { useState } from 'react'

const ROLES = [
   { label: 'Organizer', value: 'Organizer', icon: '/svgs/organizer.svg' },
   { label: 'Vendor', value: 'Vendor', icon: '/svgs/vendor.svg' },
   { label: 'Guest', value: 'Guest', icon: '/svgs/guest.svg' },
]

export default function AddUserDetailsForm() {
   const [step, setStep] = useState(1)
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      profilePicture: '',
      bio: '',
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (step === 1) {
         setStep(2)
      } else {
         console.log('Form submitted:', formData)
      }
   }

   return (
      <section className="flex lg:flex-row flex-col justify-center min-h-[88vh] p-6">
         <form
            className="flex flex-col  w-full justify-center shadow-md bg-gray-800 rounded-[20px]"
            onSubmit={handleSubmit}
         >
            {step === 1 && (
               <div className="flex flex-col justify-center items-center p-4 w-full">
                  <h1 className="text-white text-4xl font-bold text-center p-4">
                     Who are you?
                  </h1>
                  <div className="flex flex-grow gap-4 lg:w-[50%] w-full p-4 h-fit">
                     {ROLES.map((role) => (
                        <label
                           key={role.value}
                           className="radio flex w-full items-center justify-center rounded-lg p-2 cursor-pointer"
                        >
                           <input
                              type="radio"
                              name="role"
                              value={role.value}
                              checked={formData.role === role.value}
                              onChange={handleChange}
                              className="peer hidden"
                           />
                           <span className="w-full text-center tracking-widest border-2 border-gray-500 peer-checked:border-white peer-checked:text-white p-4 rounded-lg transition duration-150 ease-in-out hover:bg-gray-900 peer-checked:bg-gray-900 flex flex-col gap-2 justify-center items-center">
                              <Image
                                 src={role.icon}
                                 alt={role.label}
                                 width={48}
                                 height={48}
                                 className="w-12 h-12 font-white"
                              />
                              <span>{role.label}</span>
                           </span>
                        </label>
                     ))}
                  </div>
               </div>
            )}

            {step === 2 && (
               <div className="flex flex-col gap-4 items-center justify-center p-4">
                  <h1 className="text-white text-2xl font-bold text-center p-4">
                     Enter Your Details
                  </h1>
                  <div className="flex gap-4 w-[50%]">
                     <div className="flex flex-col gap-4 w-[50%]">
                        <label className="text-white">
                           First Name
                           <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleChange}
                           required
                           className="p-4 rounded-lg bg-gray-900 text-white"
                        />
                     </div>
                     <div className="flex flex-col gap-4 w-[50%]">
                        <label className="text-white">Last Name</label>
                        <input
                           type="text"
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleChange}
                           className="p-4 rounded-lg bg-gray-900 text-white"
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-4 w-[50%]">
                     <label className="text-white">
                        Username<span className="text-red-500">*</span>
                     </label>
                     <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="p-4 rounded-lg bg-gray-900 text-white"
                     />
                  </div>
                  <div className="flex flex-col gap-4 w-[50%]">
                     <label className="text-white">
                        Email<span className="text-red-500">*</span>
                     </label>
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-4 rounded-lg bg-gray-900 text-white"
                     />
                  </div>

                  <div className="flex flex-col gap-4 w-[50%]">
                     <label className="text-white">Profile Picture</label>
                     <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="p-4 rounded-lg bg-gray-900 text-white"
                     />
                  </div>
                  <div className="flex flex-col gap-4 w-[50%]">
                     <label className="text-white">Bio</label>
                     <textarea
                        name="bio"
                        value={formData.bio}
                        className="p-4 rounded-lg bg-gray-900 text-white"
                     />
                  </div>
               </div>
            )}

            <div className="flex justify-center p-4">
               {step === 1 && (
                  <button
                     type="submit"
                     className="text-lg flex justify-center items-center  gap-2 py-4 px-8 md:py-2 md:px-5 rounded-lg  bg-[#c73d75] hover:bg-[#B4245D]"
                  >
                     Next
                  </button>
               )}
               {step === 2 && (
                  <button
                     type="submit"
                     className="text-lg flex justify-center items-center  gap-2 py-4 px-8 md:py-2 md:px-5 rounded-lg  bg-[#c73d75] hover:bg-[#B4245D]"
                  >
                     Submit
                  </button>
               )}
            </div>
         </form>
      </section>
   )
}
