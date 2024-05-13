'use client'
import type { Metadata } from 'next'
import './globals.css'

import { Inter } from 'next/font/google'
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
   return (
      <html lang="en">
         <body className={inter.className}>
            <Provider store={rtkStore}>
               <Navbar />
               {children}
            </Provider>
         </body>
      </html>
   )
}
