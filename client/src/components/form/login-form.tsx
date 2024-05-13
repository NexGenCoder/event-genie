'use client'
import { Button, Input, InputNumber } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { IoMdLogIn } from 'react-icons/io'
import { MdOutlineSendToMobile } from 'react-icons/md'

import {
   useSendOtpMutation,
   useVerifyOtpMutation,
} from '@/app/services/authApi'
import { API } from '@/constants'

import { CountrySelector } from './country-selector'

import type { GetProp } from 'antd'
import type { OTPProps } from 'antd/es/input/OTP'
function LoginForm() {
   const router = useRouter()
   const [formData, setFormData] = useState({ mobile: '' })
   const [otp, setOtp] = useState<string>('')
   const [showOtp, setShowOtp] = useState(false)

   const [sendOtp, { isLoading: isSendingOtp, data: sendOtpResponse }] =
      useSendOtpMutation()

   const [verifyOtp, { isLoading: isOtpVerifying, data: verifyOtpResponse }] =
      useVerifyOtpMutation()

   const mobileInputOnChange = (value: any) => {
      if (typeof value !== 'string') {
         value = String(value)
      }
      if (value && value.startsWith('0')) {
         value = value.slice(1)
      }
      if (value && (value.startsWith('+91') || value.startsWith('91'))) {
         value = value.slice(3)
      }

      if (value && value.length === 10) {
         const mobile = value
         setFormData({ mobile })
      }
   }

   const handleSendOtp = async () => {
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
         otp: otp,
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

   const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
      setOtp(text)
   }

   const sharedProps: OTPProps = {
      onChange,
   }

   return (
      <div className="flex flex-col justify-center w-full  rounded-[20px] p-4">
         <div className="flex flex-col gap-2">
            {!showOtp ? (
               <div className="flex flex-col gap-4 w-full">
                  <label
                     htmlFor="mobile"
                     className="block text-md font-medium "
                  >
                     Mobile Number
                  </label>
                  <div className="flex flex-col gap-4 items-center w-full">
                     <InputNumber
                        addonBefore={<CountrySelector />}
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile Number"
                        required
                        autoComplete="tel"
                        defaultValue={formData.mobile}
                        autoFocus
                        size="large"
                        status={formData.mobile ? '' : 'error'}
                        className="w-full text-xl"
                        onChange={mobileInputOnChange}
                     />
                     <Button
                        type="primary"
                        icon={<MdOutlineSendToMobile />}
                        loading={isSendingOtp}
                        size="large"
                        onClick={handleSendOtp}
                     >
                        Send OTP
                     </Button>
                  </div>
               </div>
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
                        className="block text-sm font-medium  w-full"
                     >
                        Enter OTP
                     </label>
                     <Input.OTP
                        size="large"
                        formatter={(str) => str.toUpperCase()}
                        {...sharedProps}
                     />

                     <Button
                        type="primary"
                        icon={<IoMdLogIn />}
                        loading={isOtpVerifying}
                        size="large"
                        onClick={handleVerifyOtp}
                     >
                        Sign In
                     </Button>
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

         <Toaster />
      </div>
   )
}

export default LoginForm
