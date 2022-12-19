import { dataSource } from '../typeorm'
import { app } from './app'

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT as string}!`)
    })
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err)
  })
