import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteProduct } from '../interfaces'
import { ProductRepository } from '../repositories/ProductRepository'

export class DeleteProductService {
  constructor(private readonly productRepository = ProductRepository) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const productCheckId = await this.productRepository.findById(id)

    if (productCheckId == null) {
      throw new InternalApiError('Product not found')
    }

    await this.productRepository.remove(productCheckId)
  }
}
