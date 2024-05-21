import { Upload } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { PlusOutlined } from '@ant-design/icons'

import type { GetProp, UploadProps } from 'antd'
interface ImageUploadProps {
   setImage: React.Dispatch<React.SetStateAction<File | null>>
   defaultImage?: string
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
   new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
   })

const ImageUpload = ({ setImage, defaultImage }: ImageUploadProps) => {
   const [loading, setLoading] = useState(false)
   const [imageUrl, setImageUrl] = useState<string | null>(defaultImage || null)

   const handleChange: UploadProps['onChange'] = async (info) => {
      setLoading(true)
      const files = info.fileList.map((file) => file.originFileObj)
      if (files && files.length > 0) {
         const file = files[files.length - 1]
         setImage(file as File)

         const imageUrl = await getBase64(file as FileType)
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
            showUploadList={false}
            className="bg-white rounded-full flex justify-center items-center md:w-[120px] w-[100px] md:h-[120px] h-[100px] "
            onChange={handleChange}
         >
            {imageUrl ? (
               <Image
                  width={500}
                  height={500}
                  src={imageUrl}
                  quality={100}
                  alt="avatar"
                  className="rounded-full md:w-[120px] w-[100px] md:h-[120px] h-[100px] object-cover border-2 border-gray-500 shadow-lg"
               />
            ) : (
               uploadButton
            )}
         </Upload>
      </div>
   )
}

export default ImageUpload
