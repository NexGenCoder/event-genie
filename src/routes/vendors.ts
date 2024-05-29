import express from 'express'
import { authinticate } from '../middlewares/authinticate'
import { createVendorValidator } from '../middlewares/vendors'
import { createVendorController } from '../controller/vendors'

export default (router: express.Router) => {
   router.post(
      '/vendor',
      authinticate,
      createVendorValidator,
      createVendorController,
   )
}
