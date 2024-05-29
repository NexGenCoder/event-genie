import express from 'express'
import Joi from 'joi'

export const createVendorValidator = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   try {
      const schema = Joi.object({
         brandName: Joi.string().min(3).max(30).required().messages({
            'string.base': `Brand Name should be a type of 'text'`,
            'string.empty': `Brand Name cannot be an empty field`,
            'string.pattern.base': `Brand Name should be a valid string`,
            'string.length': `Brand Name should have a minimum length of {#user_limit}`,
         }),
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
         brandLogo: Joi.string().uri().messages({
            'string.base': `Brand Logo should be a type of 'text'`,
            'string.empty': `Brand Logo cannot be an empty field`,
            'string.pattern.base': `Brand Logo should be a valid string`,
         }),
         phone: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required()
            .messages({
               'string.base': `Phone should be a type of 'text'`,
               'string.empty': `Phone cannot be an empty field`,
               'string.pattern.base': `Phone should be a valid number`,
               'string.length': `Phone should be 10 digits long`,
            }),
         email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
               'string.base': 'Email must be a string.',
               'string.email': 'Email must be a valid email address.',
            }),
      })

      const { error } = schema.validate(req.body)
      if (error) {
         throw error
      }
      next()
   } catch (error) {
      res.status(400).send({ message: error.details[0].message })
   }
}
