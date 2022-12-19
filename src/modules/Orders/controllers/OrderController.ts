import { CreateOrderService } from '../services/CreateOrderService'
import { Request, Response } from 'express'
import { ReadOrderService } from '../services/ReadOrderService'
import { ReadByIdOrderService } from '../services/ReadByIdOrderService'

export class OrderController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { customer_id, products } = req.body
      const createOrderService = new CreateOrderService()
      const order = await createOrderService.execute({
        customer_id,
        products
      })
      return res.status(201).json(order)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async read(_req: Request, res: Response): Promise<Response> {
    try {
      const readOrderService = new ReadOrderService()
      const orders = await readOrderService.execute()
      return res.status(200).json(orders)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async readById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const readByIdOrderService = new ReadByIdOrderService()
      const order = await readByIdOrderService.execute({ id })
      return res.status(200).json(order)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}
