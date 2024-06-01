import express from 'express'

import {
   checkIfUsernameExistsController,
   getAllUsersController,
   getDemoUsersController,
} from '../controller/user'
import { authinticate } from '../middlewares/authinticate'

export default (router: express.Router) => {
   router.get('/user/exists/:username', checkIfUsernameExistsController)
   router.get('/users', authinticate, getAllUsersController)
   router.get('/demo-user', getDemoUsersController)
}
