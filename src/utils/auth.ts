import jwt from 'jsonwebtoken'
import { IUserPayloadForToken } from 'types/user'

export const generateJWT = async function (payload: IUserPayloadForToken) {
   try {
      return await jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
         expiresIn: '5h',
      })
   } catch (error) {
      throw new Error(error)
   }
}

export const verifyJWT = async function (token: string) {
   try {
      return await jwt.verify(token, process.env.JWT_SECRET_KEY as string)
   } catch (error) {
      throw new Error(error)
   }
}
