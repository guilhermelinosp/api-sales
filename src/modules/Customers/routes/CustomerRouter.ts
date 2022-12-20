import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { CustomerController } from '../controllers/CustomerController'

export const CustomerRouter = Router()
const customerController = new CustomerController()

CustomerRouter.get('/', customerController.read)

CustomerRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required()
		}
	}),
	customerController.create
)

CustomerRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().optional(),
			email: Joi.string().email().optional()
		}
	}),
	customerController.update
)

CustomerRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	customerController.delete
)
