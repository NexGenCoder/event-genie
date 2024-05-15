import { Flex, Layout } from 'antd'

import ServiceCard from '@/components/vendors/service-card'

export default function Home() {
   const exampleserviceInfo = {
      name: 'Shadi Expert',
      image: '/vendor/services/IMG-20221114-WA0003.jpg',
      link: '/vendors/shadi-expert',
      priceRange: '1.2 L - 2.5 L',
      location: 'Patna, Bihar',
      rating: 2.5,
      isSponsored: true,
      description:
         'Shadi Expert is a wedding venue located in Patna, Bihar. It is a perfect place to host all your wedding functions in the most perfect manner. The venue is located in the city and is easily accessible to all your guests',
      serviceType: 'Catering',
      vendor: 'Shadi Expert',
   }

   return (
      <Layout className="w-full h-screen">
         <Flex gap="middle" className="p-24">
            <ServiceCard serviceInfo={exampleserviceInfo} />
         </Flex>
      </Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'Vendors | Getogether',
      description:
         'Explore the vendors that are part of the Getogether platform.',
      image: '/next.svg',
      url: 'https://getogether.com/vendors',
   }
}
