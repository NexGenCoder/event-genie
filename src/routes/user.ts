import express from 'express'

import { checkIfUsernameExistsController } from '../controller/user'

export default (router: express.Router) => {
   router.get('/user/exists/:username', checkIfUsernameExistsController)
}
