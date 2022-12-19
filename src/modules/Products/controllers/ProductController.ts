import { Request, Response } from 'express'
import { CreateProductService } from '../services/CreateProductService'
import { DeleteProductService } from '../services/DeleteProductService'
import { ReadProductService } from '../services/ReadProductService'
import { UpdateProductService } from '../services/UpdateProductService'

export class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, quantity } = req.body
      const createProductService = new CreateProductService()
      const product = await createProductService.execute({
        name,
        price,
        quantity
      })

      return res.status(201).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async read(_req: Request, res: Response): Promise<Response> {
    try {
      const readProductService = new ReadProductService()
      const products = await readProductService.execute()

      return res.status(200).json(products)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { name, price, quantity } = req.body
      const updateProductService = new UpdateProductService()
      const product = await updateProductService.execute({
        id,
        name,
        price,
        quantity
      })

      return res.status(200).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const deleteProductService = new DeleteProductService()
      const product = await deleteProductService.execute({
        id
      })

      return res.status(204).json(product)
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}
