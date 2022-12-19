import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { OrderController } from '../controllers/OrderController'

export const OrderRouter = Router()
const orderController = new OrderController()

OrderRouter.get('/', orderController.read)

OrderRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  orderController.readById
)

OrderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }),
  orderController.create
)
