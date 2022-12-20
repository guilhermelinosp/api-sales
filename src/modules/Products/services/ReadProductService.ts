import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IProduct } from '../models/IProduct'
import { ProductRepository } from '../repositories/ProductRepository'

export class ReadProductService {
	constructor(private readonly productRepository = ProductRepository) {}

	public async execute(): Promise<IProduct[]> {
		const products = await this.productRepository.find()

		if (products.length === 0 || products == null) {
			throw new InternalApiError('Products not found')
		}

		return products
	}
}
