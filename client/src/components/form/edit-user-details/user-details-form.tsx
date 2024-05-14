'use client'
import { Button, Flex, Input, Layout, Tooltip } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Text from 'antd/es/typography/Text'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CgNametag } from 'react-icons/cg'
import { MdAlternateEmail, MdDoneAll } from 'react-icons/md'

import {
   useAddUserDetailsMutation,
   useGetSelfQuery,
} from '@/app/services/authApi'
import { imageUpload } from '@/utils/uploadImage'
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'

import ImageUpload from './image-upload'

interface AddUserDetailsFormProps {
   userData: any
}

export default function AddUserDetailsForm({
   userData,
}: AddUserDetailsFormProps) {
   const [image, setImage] = useState<File | null>(null)
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

   const handleSubmit = async () => {
      const imageUrl = image ? await imageUpload(image, 'profile') : null
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
      <Layout className="flex lg:flex-row flex-col justify-center p-6 ">
         <Flex
            className="w-full shadow-md"
            gap="middle"
            justify="center"
            align="center"
         >
            <Flex
               gap="middle"
               vertical
               align="center"
               justify="center"
               className="w-full p-4"
            >
               <Title>Update Your Profile</Title>
               <Tooltip title="Upload Profile Picture">
                  <div className="absolute md:top-[12rem] top-[13rem]">
                     <ImageUpload
                        setImage={setImage}
                        defaultImage={userData?.profilePicture}
                     />
                  </div>
               </Tooltip>
               <div className="md:w-[70%] w-full flex flex-col gap-6 md:pt-28 pt-20 border-2 border-gray-500 p-8  rounded-xl mt-28">
                  <div className="flex gap-4">
                     <div className="flex flex-col gap-2 w-[50%]">
                        <Text className="">
                           First Name
                           <span className="text-red-500">*</span>
                        </Text>
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
                        <Text className="">Last Name</Text>
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
                     <Text className="">
                        Username<span className="text-red-500">*</span>
                     </Text>
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
                     <Text className="">
                        Email<span className="text-red-500">*</span>
                     </Text>
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
                        suffix={
                           <Tooltip title="Email must be unique and valid">
                              <InfoCircleOutlined
                                 style={{ color: 'rgba(0,0,0,.45)' }}
                              />
                           </Tooltip>
                        }
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <Text className="">About You</Text>
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
                  </div>
                  <div className="flex justify-center p-4">
                     <Button
                        type="primary"
                        icon={<MdDoneAll />}
                        loading={isAddingUserDetails}
                        size="large"
                        onClick={handleSubmit}
                     >
                        Submit
                     </Button>
                  </div>
               </div>
            </Flex>
         </Flex>
         <Toaster />
      </Layout>
   )
}
