import 'dotenv/config'
import 'express-async-errors'
import 'reflect-metadata'
import { errors } from 'celebrate'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from '../router'
import { InternalApiError } from '../utils/errors/InternalApiError'
import handlebars from 'handlebars'

export const app = express()

app.use(express.json())
app.engine('handlebars', handlebars.compile('hbs'))

app.use(errors())
app.use(cors())

app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof InternalApiError) {
		return res.status(400).json({
			status: 'error',
			message: err.message
		})
	}

	console.error(err)

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server Error'
	})
})
