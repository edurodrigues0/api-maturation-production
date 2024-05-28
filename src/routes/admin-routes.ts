import { Router } from 'express'

import { createAdmin } from '../controllers/create-admin-controller'
import { authenticate } from '../controllers/authenticate-controller'

const adminRoutes = Router()

adminRoutes.post('/admin', createAdmin)
adminRoutes.post('/admin/sessions', authenticate)

export default adminRoutes