import express from 'express'

import { getServiceTypesController } from '../controller/services'
import { authinticate } from '../middlewares/authinticate'

export default (router: express.Router) => {
   router.get('/service/types', authinticate, getServiceTypesController)
}
