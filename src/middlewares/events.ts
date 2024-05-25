import express from 'express'
import Joi from 'joi'

export const CreateEventValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      eventName: Joi.string().min(3).max(30).required().messages({
         'string.base': `Event name should be a type of 'text'`,
         'string.empty': `Event name cannot be an empty field`,
         'string.pattern.base': `Event name should be a valid string`,
         'string.length': `Event name should have a minimum length of {#limit}`,
      }),
      startDateTime: Joi.date().required().messages({
         'date.base': `Start date time should be a type of 'date'`,
         'date.empty': `Start date time cannot be an empty field`,
      }),
      endDateTime: Joi.date()
         .required()
         .messages({
            'date.base': `End date time should be a type of 'date'`,
            'date.empty': `End date time cannot be an empty field`,
         })
         .greater(Joi.ref('startDateTime')),
      description: Joi.string().max(500).messages({
         'string.base': `Description should be a type of 'text'`,
         'string.empty': `Description cannot be an empty field`,
         'string.pattern.base': `Description should be a valid string`,
      }),
      location: Joi.string().required().messages({
         'string.base': `Location should be a type of 'text'`,
         'string.empty': `Location cannot be an empty field`,
         'string.pattern.base': `Location should be a valid string`,
      }),
      eventType: Joi.string().required().messages({
         'string.base': `Event type should be a type of 'text'`,
         'string.empty': `Event type cannot be an empty field`,
         'string.pattern.base': `Event type should be a valid string`,
      }),
      eventLogo: Joi.string().uri().required().messages({
         'string.base': `Event logo should be a type of 'text'`,
         'string.empty': `Event logo cannot be an empty field`,
         'string.pattern.base': `Event logo should be a valid string`,
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
