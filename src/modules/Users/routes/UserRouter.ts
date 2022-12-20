import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { UserController } from '../controllers/UserController'

export const UserRouter = Router()
const userController = new UserController()

UserRouter.post(
	'/signup',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password'))
		}
	}),
	userController.signup
)

UserRouter.post(
	'/signin',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required()
		}
	}),
	userController.signin
)

UserRouter.post(
	'/forgotpassword',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required()
		}
	}),
	userController.forgotPassword
)

UserRouter.post(
	'/resetpassword',
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref('password'))
		}
	}),
	userController.resetPassword
)
