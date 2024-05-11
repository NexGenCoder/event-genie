export interface IUser {
   userID?: number;
  username?: string;
   firstName?: string;
   lastName?: string;
   email?: string;
   googleId?: string;
   role?: "Organizer" | "Vendor" | "Guest";
   subscription?: "Free" | "Basic" | "Premium";
   profilePicture?: string;
   bio?: string;
   createdAt?: Date;
   updatedAt?: Date;
   mobileNumber?: string;
   isMobileVerified?: boolean;
   isEmailVerified?: boolean;
   isProfileCompleted?: boolean;
   isAccountDeleted?: boolean;
   isAccountSuspended?: boolean;
}
export interface IUserPayloadForToken {
   userID: number
   username: string
   name: string
   email: string
}
