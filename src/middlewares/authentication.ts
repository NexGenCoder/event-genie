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
      userid: Joi.string().optional().messages({
         'string.base': `User ID should be a type of 'text'`,
         'string.empty': `User ID cannot be an empty field`,
      }),
   })
   const { error } = schema.validate(req.body)
   if (error) {
      return res.status(400).json({ error: error.details[0].message })
   }
   next()
}
