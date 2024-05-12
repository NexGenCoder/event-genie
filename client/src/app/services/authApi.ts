import { api } from '@/app/services/api'

type ISendOtp = {
   mobile: string
   countryCode: string
}

type IVerifyOtp = {
   mobile: string
   otp: string
}

type IAddUserDetails = {
   username: string
   email: string
   firstName: string
   lastName: string
   role: 'Organizer' | 'Vendor' | 'Guest'
   profilePicture: string
   bio: string
}

type ISendOtpResponse = {
   message: string
   data: {
      otp: string
      mobile: string
      countryCode: string
      expiresAt: string
   }
}

type IUserResponse = {
   message: string
   data?: {
      id: string
      username: string
      email: string
      firstName: string
      lastName: string
      role: 'Organizer' | 'Vendor' | 'Guest'
      profilePicture: string
      bio: string
      isMobileVerified: boolean
      isEmailVerified: boolean
      isProfileCompleted: boolean
   }
}

export const authApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getSelf: builder.query<IUserResponse, void>({
         query: () => '/auth/self',
         providesTags: ['Self'],
      }),
      sendOtp: builder.mutation<ISendOtpResponse, ISendOtp>({
         query: (body) => ({
            url: '/auth/send-otp',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['SendOtp'],
      }),
      verifyOtp: builder.mutation<IUserResponse, IVerifyOtp>({
         query: (body) => ({
            url: '/auth/verify-otp',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['VerifyOtp'],
      }),
      addUserDetails: builder.mutation<void, IAddUserDetails>({
         query: (body) => ({
            url: '/auth/add-user-details',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['AddUserDetails'],
      }),
      logout: builder.mutation<void, void>({
         query: () => ({
            url: '/auth/logout',
            method: 'POST',
         }),
         invalidatesTags: ['Logout'],
      }),
   }),
})
export const {
   useSendOtpMutation,
   useVerifyOtpMutation,
   useLogoutMutation,
   useAddUserDetailsMutation,
   useGetSelfQuery,
} = authApi
