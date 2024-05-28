import { Router } from 'express'

import { getColaborator } from '../controllers/get-colaborator-controller'
import { editColaborator } from '../controllers/edit-colaborator-controller'
import { createColaborator } from '../controllers/create-colaborator-controller'
import { fetchColaborators } from '../controllers/fetch-colaborators-controller'
import { removeColaborator } from '../controllers/remove-colaborator-controller'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware'

const colaboratorRoutes = Router()

colaboratorRoutes.post('/colaborators', ensureAuthenticated, createColaborator)
colaboratorRoutes.put('/colaborators/:colaboratorId', ensureAuthenticated, editColaborator)
colaboratorRoutes.get('/colaborators/:colaboratorId', ensureAuthenticated, getColaborator)
colaboratorRoutes.get('/colaborators', ensureAuthenticated, fetchColaborators)
// colaboratorRoutes.delete('/colaborators/:colaboratorId', ensureAuthenticated,removeColaborator)

export default colaboratorRoutes