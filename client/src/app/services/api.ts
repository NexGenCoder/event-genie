import { API } from '@/constants'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
   baseUrl: API,
   credentials: 'include',
})

export const api = createApi({
   baseQuery,
   tagTypes: ['SendOtp', 'VerifyOtp', 'Logout', 'AddUserDetails', 'Self'],
   endpoints: () => ({}),
})
