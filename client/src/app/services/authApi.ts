import { api } from '@/app/services/api'

type ISendOtp = {
   mobile: string
   countrycode: string
}

type IVerifyOtp = {
   mobile: string
   otp: string
}

type IAddUserDetails = {
   username: string
   email: string
   firstname: string
   lastname: string
   profilepicture: string
   bio: string
}

type ISendOtpResponse = {
   message: string
   data: {
      otp: string
      mobile: string
      countrycode: string
      expiresat: string
   }
}

type IUserResponse = {
   message: string
   data?: {
      id: string
      username: string
      email: string
      firstname: string
      lastname: string
      profilepicture: string
      bio: string
      ismobileverified: boolean
      isemailverified: boolean
      isprofilecompleted: boolean
   }
}

type ICheckusernameResponse = {
   exists: boolean
}
export const authApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getSelf: builder.query<IUserResponse, void>({
         query: () => '/auth/self',
         providesTags: ['Self', 'AddUserDetails'],
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
         invalidatesTags: ['AddUserDetails', 'Self'],
      }),
      logout: builder.mutation<void, void>({
         query: () => ({
            url: '/auth/logout',
            method: 'POST',
         }),
         invalidatesTags: ['Logout'],
      }),
      checkusername: builder.query<ICheckusernameResponse, string>({
         query: (searchString) => ({
            url: `/user/exists/${searchString}`,
            method: 'GET',
         }),
         providesTags: ['CheckUsername'],
      }),
   }),
})
export const {
   useSendOtpMutation,
   useVerifyOtpMutation,
   useLogoutMutation,
   useAddUserDetailsMutation,
   useGetSelfQuery,
   useCheckusernameQuery,
} = authApi
