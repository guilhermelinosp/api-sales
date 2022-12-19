import { celebrate, Joi, Segments } from 'celebrate'
import Router from 'express'
import { isAuthenticated } from '../../../shared/utils/middlewares/isAuthenticated'
import { isRateLimiter } from '../../../shared/utils/middlewares/isRateLimiter'
import { ProductController } from '../controllers/ProductController'

export const ProductRouter = Router()
const productController = new ProductController()

ProductRouter.use(isAuthenticated)
ProductRouter.use(isRateLimiter)

ProductRouter.get('/', productController.read)

ProductRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productController.create
)

ProductRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().optional(),
      price: Joi.number().precision(2).optional(),
      quantity: Joi.number().optional()
    }
  }),
  productController.update
)

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productController.delete
)
