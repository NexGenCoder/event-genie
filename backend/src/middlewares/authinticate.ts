import express from 'express'

import { verifyJWT } from '../utils/auth'

export const authinticate = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const token = req.cookies['OG-AUTH']
   if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
   }

   try {
      const payload = await verifyJWT(token)

      if (typeof payload === 'string') {
         return res.status(401).json({ error: 'Unauthorized' })
      }

      res.locals.userId = payload.userId
      next()
   } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' })
   }
}
