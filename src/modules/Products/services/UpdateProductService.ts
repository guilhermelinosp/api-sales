import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IUpdateProduct } from '../interfaces'
import { IProduct } from '../models/IProduct'
import { ProductRepository } from '../repositories/ProductRepository'

export class UpdateProductService {
  constructor(private readonly productRepository = ProductRepository) {}

  public async execute({ id, name, price, quantity }: IUpdateProduct): Promise<IProduct> {
    const productCheckId = await this.productRepository.findById(id)

    if (productCheckId == null) {
      throw new InternalApiError('Product not found.')
    }

    const productExists = await this.productRepository.findByName(name!)

    if (productExists != null && productExists.name === name) {
      throw new InternalApiError('There is already one product with this name')
    }

    productCheckId.name = name ?? productCheckId.name
    productCheckId.price = price ?? productCheckId.price
    productCheckId.quantity = quantity ?? productCheckId.quantity

    await this.productRepository.save(productCheckId)

    return productCheckId
  }
}
