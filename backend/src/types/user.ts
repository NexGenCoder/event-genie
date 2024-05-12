export interface IUser {
   userId?: number
   username?: string
   firstName?: string
   lastName?: string
   email?: string
   profilePicture?: string
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
   userId: number
}

export interface IOtp {
   mobile: string
   countryCode: string
   expiresAt?: Date
   createdAt?: Date
   otp?: string
   isVerified?: boolean
}
