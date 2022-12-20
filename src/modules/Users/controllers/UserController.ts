import { Request, Response } from 'express'
import { ForgotPasswordUserService } from '../services/ForgotPasswordUserService'
import { ResetPasswordUserService } from '../services/ResetPasswordUserService'
import { SignInUserService } from '../services/SignInUserService'
import { SignUpUserService } from '../services/SignUpUserService'

export class UserController {
	public async signup(req: Request, res: Response): Promise<Response> {
		try {
			const { name, email, password } = req.body
			const signUpUserService = new SignUpUserService()
			const user = await signUpUserService.execute({ name, email, password })
			return res.status(201).json(user)
		} catch (err) {
			return res.status(401).json(err)
		}
	}

	public async signin(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body
			const signInUserService = new SignInUserService()
			const user = await signInUserService.execute({ email, password })
			return res.status(200).json(user)
		} catch (err) {
			console.error(err)
			return res.status(401).json(err)
		}
	}

	public async forgotPassword(req: Request, res: Response): Promise<Response> {
		try {
			const { email } = req.body
			const forgotPasswordUserService = new ForgotPasswordUserService()
			const user = await forgotPasswordUserService.execute({ email })
			return res.status(201).json(user)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async resetPassword(req: Request, res: Response): Promise<Response> {
		try {
			const { token, password } = req.body
			const resetPasswordUserService = new ResetPasswordUserService()
			const user = await resetPasswordUserService.execute({ token, password })
			return res.status(200).json(user)
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}
