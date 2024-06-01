export interface IUser {
   userid?: number
   username?: string
   firstname?: string
   lastname?: string
   email?: string
   profile_picture?: string
   googleid?: string
   bio?: string
   created_at?: Date
   updated_at?: Date
   mobile?: string
   is_mobile_verified?: boolean
   is_email_verified?: boolean
   is_profile_completed?: boolean
   is_account_deleted?: boolean
   is_account_suspended?: boolean
}
export interface IUserPayloadForToken {
   userid: number
}

export type IUpdateUser = {
   firstname: string
   lastname: string
   profilePicture: string
   username: string
   mobile: string
   bio: string
}

export interface IOtp {
   mobile: string
   country_code: string
   expires_at?: Date
   created_at?: Date
   otp?: string
   is_verified?: boolean
}
