import express from 'express'

import {
   createVendorController,
   getAllVendorsController,
   getVendorByOwnerIdController,
} from '../controller/vendors'
import { authinticate } from '../middlewares/authinticate'
import { createVendorValidator } from '../middlewares/vendors'

export default (router: express.Router) => {
   router.post(
      '/vendor',
      authinticate,
      createVendorValidator,
      createVendorController,
   )

   router.get('/vendor', authinticate, getVendorByOwnerIdController)

   router.get('/vendors', authinticate, getAllVendorsController)
}
