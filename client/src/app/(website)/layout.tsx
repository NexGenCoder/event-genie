'use client'
import '../globals.css'

import { Button, Card, ConfigProvider, theme } from 'antd'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

const rtkStore = store()
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const { defaultAlgorithm, darkAlgorithm } = theme
   const isSystemDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
   ).matches
   const [isDarkMode, setIsDarkMode] = useState(false)

   return (
      <html lang="en">
         <body className={inter.className}>
            <Provider store={rtkStore}>
               <ConfigProvider
                  theme={{
                     algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                  }}
               >
                  <Navbar setIsDarkMode={setIsDarkMode} />
                  {children}
               </ConfigProvider>
            </Provider>
         </body>
      </html>
   )
}
