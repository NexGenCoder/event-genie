'use client'
import { useState } from 'react'
import { Input, Tooltip } from 'antd'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import ImageUpload from './image-upload'
import TextArea from 'antd/es/input/TextArea'
import {
   useAddUserDetailsMutation,
   useGetSelfQuery,
} from '@/app/services/authApi'
import toast, { Toaster } from 'react-hot-toast'
import { MdAlternateEmail } from 'react-icons/md'
import { CgNametag } from 'react-icons/cg'
import { MdDoneAll } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
interface AddUserDetailsFormProps {
   userData: any
}

export default function AddUserDetailsForm({
   userData,
}: AddUserDetailsFormProps) {
   const [imageUrl, setImageUrl] = useState<string>(
      userData?.profilePicture || '',
   )
   const [formData, setFormData] = useState({
      username: userData.username || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      bio: userData.bio || '',
   })

   const [addUserDetails, { isLoading: isAddingUserDetails }] =
      useAddUserDetailsMutation()
   const queryClient = useGetSelfQuery()
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }))
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formDataWithImage = {
         ...formData,
         profilePicture: imageUrl,
      }

      try {
         await addUserDetails(formDataWithImage).unwrap()
         queryClient.refetch()
         toast.success('User details added successfully', {
            position: 'top-right',
         })
      } catch (error) {
         toast.error('Error Occurred', { position: 'top-right' })
         console.error(error)
      }
   }

   return (
      <section className="flex lg:flex-row flex-col justify-center min-h-[88vh] p-6">
         <form
            className="flex flex-col  w-full justify-center shadow-md  rounded-[20px]"
            onSubmit={handleSubmit}
         >
            <div className="flex flex-col gap-4 items-center justify-center p-4">
               <h1 className="text-white text-2xl font-bold text-center p-4">
                  Enter Your Details
               </h1>
               <Tooltip title="Upload Profile Picture">
                  <div className="absolute  top-[12rem]">
                     <ImageUpload
                        imageUrl={imageUrl}
                        setImageUrl={setImageUrl}
                     />
                  </div>
               </Tooltip>
               <div className="md:w-[70%] w-full flex flex-col gap-6 pt-28 border-2 p-8 rounded-xl mt-28">
                  <div className="flex gap-4">
                     <div className="flex flex-col gap-2 w-[50%]">
                        <label className="text-white">
                           First Name
                           <span className="text-red-500">*</span>
                        </label>
                        <Input
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleChange}
                           placeholder="Enter your first name"
                           allowClear
                           status={formData.firstName ? '' : 'error'}
                           maxLength={20}
                           minLength={3}
                           className="p-3 rounded-lg"
                           prefix={<CgNametag className="mx-2" />}
                        />
                     </div>
                     <div className="flex flex-col gap-2 w-[50%]">
                        <label className="text-white">Last Name</label>
                        <Input
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleChange}
                           placeholder="Enter your last name"
                           allowClear
                           status={formData.lastName ? '' : 'error'}
                           maxLength={20}
                           minLength={3}
                           className="p-3 rounded-lg"
                           prefix={<CgNametag className="mx-2" />}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white">
                        Username<span className="text-red-500">*</span>
                     </label>
                     <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        allowClear
                        status={formData.username ? '' : 'error'}
                        maxLength={20}
                        minLength={3}
                        className="p-3 rounded-lg"
                        prefix={<UserOutlined className="mx-2" />}
                        suffix={
                           <Tooltip title="Your username must be unique and between 3-20 characters">
                              <InfoCircleOutlined
                                 style={{ color: 'rgba(0,0,0,.45)' }}
                              />
                           </Tooltip>
                        }
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white">
                        Email<span className="text-red-500">*</span>
                     </label>

                     <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        allowClear
                        status={formData.email ? '' : 'error'}
                        className="p-3 rounded-lg"
                        prefix={<MdAlternateEmail className="mx-2" />}
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-white">About You</label>
                     <TextArea
                        rows={4}
                        placeholder="Enter something about yourself"
                        maxLength={500}
                        status={formData.bio ? '' : 'error'}
                        showCount
                        name="bio"
                        value={formData.bio}
                        onChange={(e) =>
                           setFormData({ ...formData, bio: e.target.value })
                        }
                        className="p-4 rounded-lg "
                     />
                  </div>{' '}
                  <div className="flex justify-center p-4">
                     <button
                        type="submit"
                        className="text-lg flex justify-center items-center  gap-2 py-4 px-8 md:py-2 md:px-5 rounded-lg  bg-[#c73d75] hover:bg-[#B4245D]"
                     >
                        {isAddingUserDetails ? (
                           <div className="flex items-center gap-2">
                              <span>Adding...</span>
                              <AiOutlineLoading3Quarters className="animate-spin" />
                           </div>
                        ) : (
                           <div className="flex items-center gap-2">
                              <span>Submit</span>
                              <MdDoneAll />
                           </div>
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </form>
         <Toaster />
      </section>
   )
}
