import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import {
   createOrUpdateGoogleUserModel,
   getUserByEmailModel,
   getUserByGoogleIdModel,
} from '../models/user'
import { IUser } from '../types/user'

dotenv.config()

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.GOOGLE_CALLBACK_URL

if (!clientID || !clientSecret || !callbackURL) {
   throw new Error(
      'Google credentials are missing. Please check your .env file',
   )
}

passport.use(
   new GoogleStrategy(
      {
         clientID,
         clientSecret,
         callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
         try {
            let user = await getUserByEmailModel(profile.email)
            if (user && profile.email === user.email) {
               user = await createOrUpdateGoogleUserModel({
                  email: profile.email,
                  googleId: profile.id,
                  profilePicture: profile.picture,
               })
               return done(null, user)
            }

            if (!user) {
               user = await createOrUpdateGoogleUserModel({
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  email: profile.emails ? profile.emails[0].value : '',
                  profilePicture: profile.picture,
                  googleId: profile.id,
               })
            }
            return done(null, user)
         } catch (err) {
            return done(err, null)
         }
      },
   ),
)

passport.serializeUser((user: IUser, done) => {
   done(null, user.userId)
})

passport.deserializeUser(async (id: string, done) => {
   try {
      const user = await getUserByGoogleIdModel(id)
      console.log('🚀 ~ passport.deserializeUser ~ user:', user)
      done(null, user)
   } catch (err) {
      done(err, null)
   }
})

export default passport
