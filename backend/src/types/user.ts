export interface IUser {
   userid?: number
   username?: string
   firstname?: string
   lastName?: string
   email?: string
   profilepicture?: string
   googleId?: string
   bio?: string
   createdAt?: Date
   updatedAt?: Date
   mobile?: string
   isMobileVerified?: boolean
   isEmailVerified?: boolean
   isProfileCompleted?: boolean
   isAccountDeleted?: boolean
   isAccountSuspended?: boolean
}
export interface IUserPayloadForToken {
   userid: number
}

export interface IOtp {
   mobile: string
   countryCode: string
   expiresAt?: Date
   createdAt?: Date
   otp?: string
   isVerified?: boolean
}
