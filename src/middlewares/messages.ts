import express from 'express'
import Joi from 'joi'

export const CreateMessageValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      channelid: Joi.string().required().messages({
         'string.base': `Channel id should be a type of 'text'`,
         'string.empty': `Channel id cannot be an empty field`,
         'string.pattern.base': `Channel id should be a valid string`,
      }),
      type: Joi.string().valid('text', 'image', 'video').required().messages({
         'string.base': `Type should be a type of 'text'`,
         'string.empty': `Type cannot be an empty field`,
         'string.pattern.base': `Type should be a valid string`,
      }),
      content: Joi.string().required().messages({
         'string.base': `Content should be a type of 'text'`,
         'string.empty': `Content cannot be an empty field`,
         'string.pattern.base': `Content should be a valid string`,
      }),
      sender: Joi.object({
         userid: Joi.string().required().messages({
            'string.base': `User id should be a type of 'text'`,
            'string.empty': `User id cannot be an empty field`,
            'string.pattern.base': `User id should be a valid string`,
         }),
         name: Joi.string().required().messages({
            'string.base': `Name should be a type of 'text'`,
            'string.empty': `Name cannot be an empty field`,
            'string.pattern.base': `Name should be a valid string`,
         }),
         avatar: Joi.string().required().messages({
            'string.base': `Avatar should be a type of 'text'`,
            'string.empty': `Avatar cannot be an empty field`,
            'string.pattern.base': `Avatar should be a valid string`,
         }),
      })
         .required()
         .messages({
            'object.base': `Sender should be an object`,
            'object.empty': `Sender cannot be an empty field`,
            'object.pattern.base': `Sender should be a valid object`,
         }),
      timestamp: Joi.date().required().messages({
         'date.base': `Timestamp should be a type of 'date'`,
         'date.empty': `Timestamp cannot be an empty field`,
         'date.pattern.base': `Timestamp should be a valid date`,
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
