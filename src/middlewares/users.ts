import express from 'express'
import Joi from 'joi'

export const sendOtpValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      mobile: Joi.string()
         .length(10)
         .pattern(/^[0-9]+$/)
         .required()
         .messages({
            'string.base': `Mobile number should be a type of 'text'`,
            'string.empty': `Mobile number cannot be an empty field`,
            'string.pattern.base': `Mobile number should be a valid number`,
            'string.length': `Mobile number should be 10 digits long`,
         }),
      country_code: Joi.string()
         .length(2)
         .pattern(/^[0-9]+$/)
         .required()
         .messages({
            'string.base': `Country code should be a type of 'text'`,
            'string.empty': `Country code cannot be an empty field`,
            'string.pattern.base': `Country code should be a valid number`,
            'string.length': `Country code should be 2 digits long`,
         }),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}
export const updateUserProfileValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      firstname: Joi.string().required().messages({
         'string.base': `First name should be a type of 'text'`,
         'string.empty': `First name cannot be an empty field`,
      }),
      lastname: Joi.string().required().messages({
         'string.base': `Last name should be a type of 'text'`,
         'string.empty': `Last name cannot be an empty field`,
      }),
      profilePicture: Joi.string().uri().required().messages({
         'string.base': `Profile picture should be a type of 'text'`,
         'string.empty': `Profile picture cannot be an empty field`,
      }),
      username: Joi.string().required().messages({
         'string.base': `Username should be a type of 'text'`,
         'string.empty': `Username cannot be an empty field`,
      }),
      mobile: Joi.string()
         .length(10)
         .pattern(/^[0-9]+$/)
         .optional()
         .messages({
            'string.base': `Mobile number should be a type of 'text'`,
            'string.empty': `Mobile number cannot be an empty field`,
            'string.pattern.base': `Mobile number should be a valid number`,
            'string.length': `Mobile number should be 10 digits long`,
         }),
      email: Joi.string().email().optional().messages({
         'string.base': `Email should be a type of 'text'`,
         'string.empty': `Email cannot be an empty field`,
         'string.email': `Email should be a valid email`,
      }),
      bio: Joi.string().required().messages({
         'string.base': `Bio should be a type of 'text'`,
         'string.empty': `Bio cannot be an empty field`,
      }),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}
