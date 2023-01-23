import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { InternalApiError } from '../errors/InternalApiError'

export const isAuthenticated = (req: Request, _res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization

	if (authHeader === undefined) {
		throw new InternalApiError('JWT Token is missing.')
	}

	const [, token] = authHeader.split(' ')

	try {
		const decodedToken = verify(token, process.env.JWT_SECRET as string)
		const { sub } = decodedToken

		req.user = {
			id: sub as string
		}

		next()
		return
	} catch {
		throw new InternalApiError('Invalid JWT Token.')
	}
}
