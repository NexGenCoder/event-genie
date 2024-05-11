import jwt from 'jsonwebtoken'
import { IUserPayloadForToken } from 'types/user'

/*
// This function is used for creating a hash from a password but is not used in the project
export const generateHash = async function (password: string) {
   try {
      return await bcrypt.hash(password, 10)
   } catch (error) {
      throw new Error(error)
   }
}

export const compareHash = async function (password: string, hash: string) {
   try {
      return await bcrypt.compare(password, hash)
   } catch (error) {
      throw new Error(error)
   }
}

export const generateResetToken = async function () {
   try {
      const randomBytes = await crypto.randomBytes(5)
      const randomHex = randomBytes.toString('hex')
      return parseInt(randomHex, 16).toString().padStart(10, '0')
   } catch (error) {
      throw new Error(error)
   }
}

*/

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
