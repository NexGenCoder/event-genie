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
      countryCode: Joi.string()
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

export const verifyOtpValidator = (
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
      otp: Joi.string()
         .length(6)
         .pattern(/^[0-9]+$/)
         .required()
         .messages({
            'string.base': `OTP should be a type of 'text'`,
            'string.empty': `OTP cannot be an empty field`,
            'string.pattern.base': `OTP should be a valid number`,
            'string.length': `OTP should be 6 digits long`,
         }),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}

export const addUserDetailsValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      username: Joi.string().min(3).max(30).required().messages({
         'string.base': `Username should be a type of 'text'`,
         'string.empty': `Username cannot be an empty field`,
         'string.min': `Username should have a minimum length of {#limit}`,
         'string.max': `Username should have a maximum length of {#limit}`,
      }),
      email: Joi.string().email().required().messages({
         'string.base': `Email should be a type of 'text'`,
         'string.empty': `Email cannot be an empty field`,
         'string.email': `Email should be a valid email`,
      }),
      firstname: Joi.string().min(3).max(30).required().messages({
         'string.base': `First name should be a type of 'text'`,
         'string.empty': `First name cannot be an empty field`,
         'string.min': `First name should have a minimum length of {#limit}`,
         'string.max': `First name should have a maximum length of {#limit}`,
      }),
      lastName: Joi.string().min(3).max(30).required().messages({
         'string.base': `Last name should be a type of 'text'`,
         'string.empty': `Last name cannot be an empty field`,
         'string.min': `Last name should have a minimum length of {#limit}`,
         'string.max': `Last name should have a maximum length of {#limit}`,
      }),
      profilepicture: Joi.string().uri().optional().messages({
         'string.base': `Profile picture should be a type of 'text'`,
         'string.empty': `Profile picture cannot be an empty field`,
         'string.uri': `Profile picture should be a valid URI`,
      }),
      bio: Joi.string().min(10).max(200).optional().messages({
         'string.base': `Bio should be a type of 'text'`,
         'string.empty': `Bio cannot be an empty field`,
         'string.min': `Bio should have a minimum length of {#limit}`,
         'string.max': `Bio should have a maximum length of {#limit}`,
      }),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}
