import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
   try {
      const requestedPath = request.nextUrl.pathname
      const session = request.cookies.get('session')
      if (session === undefined && requestedPath === '/complete-profile') {
         return NextResponse.redirect(new URL('/login', request.url))
      }

      if (session && session?.value) {
         const sessionValue = session.value
         const sessionData = JSON.parse(atob(sessionValue))
         const currentTime = new Date().getTime()
         const expiresAt = new Date(sessionData.expiresAt).getTime()
         if (currentTime > expiresAt) {
            console.log('Session expired')
            return NextResponse.redirect(new URL('/login', request.url))
         }
      }
   } catch (error) {
      console.error('Error in middleware:', error)
      return NextResponse.redirect(new URL('/', request.url))
   }
}

export const config = {
   matcher: ['/complete-profile'],
}
