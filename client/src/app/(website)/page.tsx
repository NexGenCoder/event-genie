import { Layout } from 'antd'

export default function Home() {
   return (
      <Layout className="flex min-h-screen flex-col items-center justify-between p-24"></Layout>
   )
}

export function generateMetadata() {
   return {
      title: 'Getogether - Home',
      description:
         "Getogether is a platform that helps you find and create events that you'll love.",
      image: '/next.svg',
      url: 'https://getogether.com',
   }
}
