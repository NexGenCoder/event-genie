import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

const OTPInput: React.FC = () => {
   const [otp, setOtp] = useState<string[]>(['', '', '', ''])
   const inputRefs = useRef<HTMLInputElement[]>([])
   const [activeInput, setActiveInput] = useState<number>(0)

   const handleChange = (index: number, value: string) => {
      if (isNaN(Number(value))) return
      const otpCopy = [...otp]
      otpCopy[index] = value
      setOtp(otpCopy)

      if (index < 3 && value !== '') {
         inputRefs.current[index + 1].focus()
      }
   }

   const handleBackspace = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>,
   ) => {
      if (e.key === 'Backspace') {
         const otpCopy = [...otp]
         otpCopy[index] = ''
         setOtp(otpCopy)
         if (index > 0) {
            inputRefs.current[index - 1].focus()
         }
      }
   }

   const handleFocus = (index: number) => {
      setActiveInput(index)
   }

   return (
      <div className="flex justify-center items-center gap-2">
         {otp.map((digit, index) => (
            <input
               key={index}
               type="text"
               value={digit}
               maxLength={1}
               onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
               }
               onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleBackspace(index, e)
               }
               onFocus={() => handleFocus(index)}
               ref={(el: HTMLInputElement | null) => {
                  if (el) {
                     inputRefs.current[index] = el
                  }
               }}
               className="w-12 h-12 text-2xl text-center border bg-transparent border-gray-300 rounded-md"
            />
         ))}
      </div>
   )
}

export default OTPInput
