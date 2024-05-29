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
         'string.length': `Event name should have a minimum length of {#user_limit}`,
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
      isPrivate: Joi.boolean().required().messages({
         'boolean.base': `Is private should be a type of 'boolean'`,
         'boolean.empty': `Is private cannot be an empty field`,
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

export const CreateCategoryValidator = (
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
      name: Joi.string().min(3).max(30).required().messages({
         'string.base': `Category name should be a type of 'text'`,
         'string.empty': `Category name cannot be an empty field`,
         'string.pattern.base': `Category name should be a valid string`,
         'string.length': `Category name should have a minimum length of {#user_limit}`,
      }),
      description: Joi.string().max(500).messages({
         'string.base': `Description should be a type of 'text'`,
         'string.empty': `Description cannot be an empty field`,
         'string.pattern.base': `Description should be a valid string`,
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

export const CreateChannelValidator = (
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
      categoryid: Joi.string().required().messages({
         'string.base': `Category id should be a type of 'text'`,
         'string.empty': `Category id cannot be an empty field`,
         'string.pattern.base': `Category id should be a valid string`,
      }),
      name: Joi.string().min(3).max(30).required().messages({
         'string.base': `Channel name should be a type of 'text'`,
         'string.empty': `Channel name cannot be an empty field`,
         'string.pattern.base': `Channel name should be a valid string`,
         'string.length': `Channel name should have a minimum length of {#user_limit}`,
      }),
      icon: Joi.string().required().messages({
         'string.base': `Channel icon should be a type of 'text'`,
         'string.empty': `Channel icon cannot be an empty field`,
         'string.pattern.base': `Channel icon should be a valid string`,
      }),
      type: Joi.string().required().messages({
         'string.base': `Channel type should be a type of 'text'`,
         'string.empty': `Channel type cannot be an empty field`,
         'string.pattern.base': `Channel type should be a valid string`,
      }),
      description: Joi.string().max(500).messages({
         'string.base': `Description should be a type of 'text'`,
         'string.empty': `Description cannot be an empty field`,
         'string.pattern.base': `Description should be a valid string`,
      }),
      isPrivate: Joi.boolean().required().messages({
         'boolean.base': `Is private should be a type of 'boolean'`,
         'boolean.empty': `Is private cannot be an empty field`,
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

export const CreateChildEventValidator = (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction,
) => {
   const schema = Joi.object({
      parentId: Joi.string().required().messages({
         'string.base': `Parent event id should be a type of 'text'`,
         'string.empty': `Parent id cannot be an empty field`,
         'string.pattern.base': `Parent id should be a valid string`,
      }),
      eventName: Joi.string().min(3).max(30).required().messages({
         'string.base': `Event name should be a type of 'text'`,
         'string.empty': `Event name cannot be an empty field`,
         'string.pattern.base': `Event name should be a valid string`,
         'string.length': `Event name should have a minimum length of {#user_limit}`,
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
      isPrivate: Joi.boolean().required().messages({
         'boolean.base': `Is private should be a type of 'boolean'`,
         'boolean.empty': `Is private cannot be an empty field`,
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

export const UpdateEventValidator = (
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
      parent_eventid: Joi.string().allow(null).messages({
         'string.base': `Parent event id should be a type of 'text'`,
         'string.empty': `Parent id cannot be an empty field`,
         'string.pattern.base': `Parent id should be a valid string`,
      }),
      event_name: Joi.string().min(3).max(30).messages({
         'string.base': `Event name should be a type of 'text'`,
         'string.empty': `Event name cannot be an empty field`,
         'string.pattern.base': `Event name should be a valid string`,
         'string.length': `Event name should have a minimum length of {#user_limit}`,
      }),
      start_date_time: Joi.date().messages({
         'date.base': `Start date time should be a type of 'date'`,
         'date.empty': `Start date time cannot be an empty field`,
      }),
      end_date_time: Joi.date()
         .messages({
            'date.base': `End date time should be a type of 'date'`,
            'date.empty': `End date time cannot be an empty field`,
         })
         .greater(Joi.ref('start_date_time')),
      description: Joi.string().max(500).messages({
         'string.base': `Description should be a type of 'text'`,
         'string.empty': `Description cannot be an empty field`,
         'string.pattern.base': `Description should be a valid string`,
      }),
      event_logo: Joi.string().uri().messages({
         'string.base': `Event logo should be a type of 'text'`,
         'string.empty': `Event logo cannot be an empty field`,
         'string.pattern.base': `Event logo should be a valid string`,
      }),
      location: Joi.string().messages({
         'string.base': `Location should be a type of 'text'`,
         'string.empty': `Location cannot be an empty field`,
         'string.pattern.base': `Location should be a valid string`,
      }),
      event_type: Joi.string().messages({
         'string.base': `Event type should be a type of 'text'`,
         'string.empty': `Event type cannot be an empty field`,
         'string.pattern.base': `Event type should be a valid string`,
      }),
      is_private: Joi.boolean().messages({
         'boolean.base': `Is private should be a type of 'boolean'`,
         'boolean.empty': `Is private cannot be an empty field`,
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
