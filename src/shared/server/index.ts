import { dataSource } from '../database'
import { app } from './app'

dataSource
	.initialize()
	.then(() => {
		app.listen(process.env.PORT ?? 8080, () => {
			console.log(`Server is running`)
		})
	})
	.catch((err) => {
		console.error('Error during initialization', err)
	})
