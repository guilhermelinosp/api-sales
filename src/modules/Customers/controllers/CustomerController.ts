import { Request, Response } from 'express'
import { CreateCustomerService } from '../services/CreateCustomerService'
import { DeleteCustomerService } from '../services/DeleteCustomerService'
import { ReadCustomerService } from '../services/ReadCustomerService'
import { UpdateCustomerService } from '../services/UpdateCustomerService'

export class CustomerController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body
      const createCustomerService = new CreateCustomerService()
      const product = await createCustomerService.execute({
        name,
        email
      })

      return res.status(201).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async read(_req: Request, res: Response): Promise<Response> {
    try {
      const readCustomerService = new ReadCustomerService()
      const products = await readCustomerService.execute()

      return res.status(200).json(products)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { name, email } = req.body
      const updateCustomerService = new UpdateCustomerService()
      const product = await updateCustomerService.execute({
        id,
        name,
        email
      })

      return res.status(200).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const deleteCustomerService = new DeleteCustomerService()
      const product = await deleteCustomerService.execute({
        id
      })

      return res.status(204).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}
