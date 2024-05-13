'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaMobileAlt } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoMdLogIn } from 'react-icons/io'
import { MdOutlineSendToMobile } from 'react-icons/md'
import OTPInput from '@/components/otp-input'
import toast, { Toaster } from 'react-hot-toast'
import LoginImage from '../../../public/OccasionGuru.jpeg'
import {
   useSendOtpMutation,
   useVerifyOtpMutation,
} from '@/app/services/authApi'
import { useRouter } from 'next/navigation'
import { API } from '@/constants'

function LoginForm() {
   const router = useRouter()
   const [formData, setFormData] = useState({ mobile: '' })
   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']) // 7 digits for '1234567
   const [typing, setTyping] = useState(false)
   const [showOtp, setShowOtp] = useState(false)
   const [message, setMessage] = useState(
      '⌨️ Enter your mobile number to get OTP',
   )

   const [sendOtp, { isLoading: isSendingOtp, data: sendOtpResponse }] =
      useSendOtpMutation()

   const [verifyOtp, { isLoading: isOtpVerifying, data: verifyOtpResponse }] =
      useVerifyOtpMutation()

   const mobileInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value[0] === '0') {
         e.target.value = e.target.value.slice(1)
      }
      if (e.target.value.slice(0, 3) === '+91') {
         e.target.value = e.target.value.slice(3)
      }
      setTyping(true)
      if (e.target.value.length === 0) {
         setMessage('⌨️ Enter your mobile number to get OTP')
         setFormData({ mobile: '' })
      } else if (e.target.value.length === 10) {
         setMessage('✅ Valid Mobile Number')
         const mobile = e.target.value
         setFormData({ mobile })
      } else {
         setMessage('❌ Invalid Mobile Number')
         setFormData({ mobile: '' })
      }

      setTimeout(() => {
         setTyping(false)
      }, 1500)
   }

   const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const requestBody = {
         mobile: formData.mobile,
         countryCode: '91',
      }
      try {
         const response = await sendOtp(requestBody).unwrap()
         toast.success(response.message, { position: 'top-right' })
         setShowOtp(true)
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
         console.error(error)
      }
   }

   const handleVerifyOtp = async () => {
      const requestBody = {
         mobile: formData.mobile,
         otp: otp.join(''),
      }

      try {
         const response = await verifyOtp(requestBody).unwrap()
         toast.success(response.message, { position: 'top-right' })
         if (response?.data) {
            router.push('/profile')
         } else {
            router.push('/edit-profile')
         }
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
         console.error(error)
      }
   }

   return (
      <div className="flex lg:flex-row flex-col justify-center w-full shadow-md  bg-gray-800 rounded-[20px]">
         <div className="flex md:flex-col flex-row justify-center items-center md:gap-4 gap-2 p-6 pb-0 lg:w-[50%] w-full lg:border-r border-r-none">
            <div className="md:w-[200px]  w-[150px] rounded-full">
               <Image
                  src={LoginImage}
                  alt="Occasion Guru"
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-full"
               />
            </div>
            <div className="flex flex-col gap-2 items-center">
               <p className="text-md font-semibold md:text-center text-start md:text-3xl w-full">
                  Welcome to Getogether
               </p>
               <p className="md:text-center text-start md:text-lg text-[12px] line-clamp-2 w-full">
                  Getogether is a platform that helps you find the best venues
                  for your events.
               </p>
            </div>
         </div>

         <div className="flex flex-col justify-between gap-3 p-6 py-10 lg:w-[50%] w-full h-full ">
            <h1 className="md:text-3xl text-xl font-semibold  text-center">
               Sign In/Sign Up
            </h1>

            <div className="flex flex-col gap-2 h-[60%]">
               {!showOtp ? (
                  <form onSubmit={handleSendOtp}>
                     <label
                        htmlFor="mobile"
                        className="block text-md font-medium text-white"
                     >
                        Mobile Number
                     </label>
                     <div
                        className="flex  flex-col
                   items-center justify-center gap-2  border-gray-300 rounded-md"
                     >
                        <div className="mt-1 flex items-center justify-center gap-2 border  w-full  border-gray-300 rounded-md pl-4">
                           <FaMobileAlt className="text-2xl" />
                           <span className="text-xl">+91</span>
                           <input
                              type="number"
                              id="mobile"
                              name="mobile"
                              placeholder="Mobile Number"
                              required
                              autoComplete="tel"
                              defaultValue={formData.mobile}
                              autoFocus
                              className="p-2 bg-transparent w-full focus:outline-none active:outline-none text-xl  placeholder-gray-300"
                              onChange={mobileInputOnChange}
                           />
                        </div>
                        <p className="text-white text-sm font-semibold mt-2 italic w-full">
                           {typing ? '⏳ Typing...' : message}
                        </p>

                        <button
                           type="submit"
                           className="bg-[#ff3ea2] text-white rounded-md border border-[#ff3ea2] py-2 px-4 w-fit flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                           disabled={!formData.mobile}
                        >
                           <MdOutlineSendToMobile className="text-2xl" />
                           <span className="text-xl">Send OTP</span>
                        </button>
                     </div>
                  </form>
               ) : (
                  <>
                     <div className="flex flex-col gap-4 items-center w-full">
                        <div className="w-full justify-center text-center">
                           <span>OTP sent to</span>
                           <span className="italic">+91 {formData.mobile}</span>
                           <button
                              type="button"
                              className="ml-2 underline"
                              onClick={() => setShowOtp(false)}
                           >
                              Change
                           </button>
                        </div>
                        <label
                           htmlFor="otp"
                           className="block text-sm font-medium text-white w-full"
                        >
                           Enter OTP
                        </label>
                        <OTPInput otp={otp} setOtp={setOtp} />
                        <button
                           type="button"
                           className="bg-[#ff3ea2] text-white rounded-md border border-[#ff3ea2] py-2 px-4 w-fit flex items-center gap-2"
                           onClick={handleVerifyOtp}
                        >
                           <IoMdLogIn className="text-2xl" />
                           <span className="text-xl">Sign In</span>
                        </button>
                     </div>
                  </>
               )}
            </div>

            <div className="flex items-center gap-4">
               <hr className="flex-1" />
               <span className="font-semibold">OR</span>
               <hr className="flex-1" />
            </div>

            <div className="flex flex-col justify-center items-center gap-4">
               <p className="text-center md:text-2xl text-md font-semibold">
                  Continue with your social account
               </p>
               <Link
                  className="flex justify-center item-center bg-gray-100 border py-2 px-4 rounded-md hover:bg-gray-200  items-center gap-2 text-black w-fit"
                  href={`${API}/auth/google`}
               >
                  <FcGoogle className="inline-block mr-2" /> Sign In With Google
               </Link>
            </div>
         </div>
         <Toaster />
      </div>
   )
}

export default LoginForm
