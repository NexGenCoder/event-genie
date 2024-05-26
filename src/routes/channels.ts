import express from 'express'

import { getChannelByIdController } from '../controller/events'

export default (router: express.Router) => {
   router.get('/channel/:channelid', getChannelByIdController)
}
