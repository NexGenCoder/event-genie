'use client'
import { Button, Card, Flex, Layout, Rate, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import { FaRegEye, FaStar } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { IoLocation } from 'react-icons/io5'
import { LuIndianRupee } from 'react-icons/lu'
import { MdBusinessCenter, MdInfo } from 'react-icons/md'
import { RiAdvertisementFill } from 'react-icons/ri'

const { Text, Link } = Typography

interface ServiceCardProps {
   serviceInfo: {
      name: string
      image: string
      link: string
      rating?: number
      location?: string
      isSponsored?: boolean
      priceRange?: string
      type?: string
      for?: string[]
      vendor?: string
      description?: string
      serviceType: string
   }
}

function ServiceCard({ serviceInfo }: ServiceCardProps) {
   const {
      name,
      image,
      serviceType,
      rating,
      isSponsored,
      priceRange,
      location,
      vendor,
      description,
      link,
   } = serviceInfo

   return (
      <Card
         hoverable
         style={{ width: 300 }}
         className="flex flex-col justify-between w-full h-full  shadow-md rounded-lg"
      >
         <Layout>
            <div className="relative w-full h-48">
               <Image
                  alt={name}
                  src={image}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover aspect-square rounded-t-lg"
               />
               <Tooltip title="This is a sponsored service">
                  {isSponsored && (
                     <Text
                        strong
                        className="absolute top-0 left-0 p-2 flex gap-2 items-center justify-center backdrop-blur-md text-white rounded-br-lg"
                     >
                        <RiAdvertisementFill size={22} />
                     </Text>
                  )}
               </Tooltip>
               <Tooltip title={description}>
                  <MdInfo
                     size={20}
                     className="absolute bottom-0 left-0 m-2 backdrop-blur-md rounded-tl-lg text-white"
                  />
               </Tooltip>
            </div>
         </Layout>

         <Flex vertical gap="small" className="p-4 w-full h-full flex-1">
            <Flex gap="middle" justify="space-between">
               <Text strong className="text-lg line-clamp-1 truncate">
                  {name}
               </Text>
               <Text className="flex gap-2 items-center">
                  <FaStar size={20} />
                  {rating}
                  <Link href={`${link}#reviews`} type="secondary">
                     (reviews)
                  </Link>
               </Text>
            </Flex>
            <Flex gap="middle" justify="space-between">
               <Text className="text-lg flex gap-2 items-center">
                  <LuIndianRupee size={20} />
                  {priceRange}
               </Text>

               <Text type="secondary" className="flex gap-2 items-center">
                  <IoLocation size={20} />
                  {location}
               </Text>
            </Flex>

            <Text type="secondary" className="flex gap-2 items-center">
               <MdBusinessCenter size={20} /> {serviceType} - {vendor}
            </Text>

            <Flex gap="small" className="flex-1">
               {/* buttons */}
               <Button
                  type="default"
                  href={link}
                  target="_blank"
                  className="flex gap-2 items-center"
                  icon={<FaRegEye />}
               >
                  View
               </Button>

               <Button
                  type="default"
                  className="flex gap-2 items-center"
                  icon={<FaMessage />}
               >
                  Contact
               </Button>
            </Flex>
         </Flex>
      </Card>
   )
}

export default ServiceCard
