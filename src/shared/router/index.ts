import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { CustomerRouter } from '../../modules/Customers/routes/CustomerRouter'
import { OrderRouter } from '../../modules/Orders/routes/OrderRouter'
import { ProductRouter } from '../../modules/Products/routes/ProductRouter'
import { UserRouter } from '../../modules/Users/routes/UserRouter'
import swaggerDocument from '../../shared/utils/swagger/swagger.json'

export const router = Router()

router.get('/', (_req, res) => {
	res.send('API is running')
})

router.use('/api/v1/', UserRouter)
router.use('/api/v1/products', ProductRouter)
router.use('/api/v1/customers', CustomerRouter)
router.use('/api/v1/orders', OrderRouter)

router.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
