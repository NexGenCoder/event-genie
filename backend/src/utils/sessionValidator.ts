import { NextFunction, Request, Response } from 'express'

export const sessionValidator = (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   if (!req.session || !req.session.mobileNumber) {
      return res.status(401).json({ message: 'Session not valid or expired' })
   }
   next()
}
