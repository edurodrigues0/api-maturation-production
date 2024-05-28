import { Router } from 'express'

import { editProduction } from '../controllers/edit-production-controller'
import { createProduction } from '../controllers/create-production-controller'
import { fetchProductions } from '../controllers/fetch-productions-controller'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware'
import { getProduction } from '../controllers/get-production-controller'
// import { removeProduction } from '../controllers/remove-production-controller'

const productionRoutes = Router()

productionRoutes.post('/productions', createProduction)

productionRoutes.put(
  '/productions/:productionId', 
  ensureAuthenticated, 
  editProduction
)

productionRoutes.get(
  '/productions/:productionId', 
  ensureAuthenticated, 
  getProduction
)

productionRoutes.get('/productions', ensureAuthenticated, fetchProductions)
// productionRoutes.delete('/productions/:productionId', ensureAuthenticated, removeProduction)

export default productionRoutes