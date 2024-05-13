import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import type { UploadProps } from 'antd'
import Image from 'next/image'
import { imageUpload } from '@/utils/uploadImage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
interface ImageUploadProps {
   imageUrl: string
   setImageUrl: (imageUrl: string) => void
}

const ImageUpload = ({ imageUrl, setImageUrl }: ImageUploadProps) => {
   const [loading, setLoading] = useState(false)

   const handleChange: UploadProps['onChange'] = async (info) => {
      setLoading(true)
      const files = info.fileList.map((file) => file.originFileObj)
      if (files && files.length > 0) {
         const file = files[files.length - 1]
         const imageUrl = await imageUpload(file as File, 'user-profile')
         setImageUrl(imageUrl)
      }
      setLoading(false)
   }

   const uploadButton = (
      <div>
         {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
         ) : (
            <PlusOutlined />
         )}
         <div style={{ marginTop: 8 }}>{loading ? 'Uploading' : 'Upload'}</div>
      </div>
   )

   return (
      <div className="flex flex-col ">
         <Upload
            name="avatar"
            listType="picture-circle"
            style={{ width: '200px', height: '200px' }}
            showUploadList={false}
            className="bg-white rounded-full flex justify-center items-center w-[200px] h-[200px]"
            onChange={handleChange}
         >
            {imageUrl ? (
               <Image
                  width={200}
                  height={200}
                  src={imageUrl}
                  alt="avatar"
                  className="rounded-full w-[200px] h-[200px] object-cover"
               />
            ) : (
               uploadButton
            )}
         </Upload>
      </div>
   )
}

export default ImageUpload
