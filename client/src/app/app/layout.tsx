'use client'
import './../globals.css'

import { ConfigProvider, Tooltip, theme } from 'antd'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { MdDarkMode } from 'react-icons/md'
import { CiLight } from 'react-icons/ci'
import { store } from '@/app/store'
import { FloatButton } from 'antd'

const inter = Inter({ subsets: ['latin'] })

const rtkStore = store()
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const { defaultAlgorithm, darkAlgorithm } = theme
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
                  {children}
                  <Tooltip
                     title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                     placement="left"
                  >
                     <FloatButton
                        shape="square"
                        type="default"
                        style={{ right: 94 }}
                        icon={isDarkMode ? <CiLight /> : <MdDarkMode />}
                        onClick={() => setIsDarkMode(!isDarkMode)}
                     />
                  </Tooltip>
               </ConfigProvider>
            </Provider>
         </body>
      </html>
   )
}
