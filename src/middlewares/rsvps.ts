import express from 'express'
import Joi from 'joi'

export const createDirectInviteRsvpValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      userid: Joi.string().required().messages({
         'string.base': `User id should be a type of 'text'`,
         'string.empty': `User id cannot be an empty field`,
         'string.pattern.base': `User id should be a valid string`,
      }),
      eventid: Joi.string().required().messages({
         'string.base': `Event id should be a type of 'text'`,
         'string.empty': `Event id cannot be an empty field`,
         'string.pattern.base': `Event id should be a valid string`,
      }),
      expiry_at: Joi.date().required().messages({
         'date.base': `Expiry at should be a type of 'date'`,
         'date.empty': `Expiry at cannot be an empty field`,
         'date.pattern.base': `Expiry at should be a valid date`,
      }),
   })

   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      })
   }
   next()
}

export const createOpenInviteRsvpValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      eventid: Joi.string().required().messages({
         'string.base': `Event id should be a type of 'text'`,
         'string.empty': `Event id cannot be an empty field`,
         'string.pattern.base': `Event id should be a valid string`,
      }),
      expiry_at: Joi.date().required().messages({
         'date.base': `Expiry at should be a type of 'date'`,
         'date.empty': `Expiry at cannot be an empty field`,
         'date.pattern.base': `Expiry at should be a valid date`,
      }),
      user_limit: Joi.number().required().messages({
         'number.base': `user_limit should be a type of 'number'`,
         'number.empty': `user_limit cannot be an empty field`,
         'number.pattern.base': `user_limit should be a valid number`,
      }),
   })

   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      })
   }
   next()
}

export const updateDirectInviteRsvpValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      rsvpid: Joi.string().required().messages({
         'string.base': `Rsvp id should be a type of 'text'`,
         'string.empty': `Rsvp id cannot be an empty field`,
         'string.pattern.base': `Rsvp id should be a valid string`,
      }),
      status: Joi.string().valid('accepted', 'declined').required().messages({
         'string.base': `Status should be a type of 'text'`,
         'string.empty': `Status cannot be an empty field`,
         'string.pattern.base': `Status should be a valid string`,
      }),
   })

   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      })
   }
   next()
}

export const updateOpenInviteRsvpValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      rsvpId: Joi.string().required().messages({
         'string.base': `Rsvp id should be a type of 'text'`,
         'string.empty': `Rsvp id cannot be an empty field`,
         'string.pattern.base': `Rsvp id should be a valid string`,
      }),
      status: Joi.string().valid('accepted', 'declined').required().messages({
         'string.base': `Status should be a type of 'text'`,
         'string.empty': `Status cannot be an empty field`,
         'string.pattern.base': `Status should be a valid string`,
      }),
      userid: Joi.string().required().messages({
         'string.base': `User id should be a type of 'text'`,
         'string.empty': `User id cannot be an empty field`,
         'string.pattern.base': `User id should be a valid string`,
      }),
   })

   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      })
   }
   next()
}
