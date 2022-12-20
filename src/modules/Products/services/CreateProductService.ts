import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICreateProduct } from '../interfaces'
import { IProduct } from '../models/IProduct'
import { ProductRepository } from '../repositories/ProductRepository'

export class CreateProductService {
	constructor(private readonly productRepository = ProductRepository) {}

	public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
		const productCheckName = await this.productRepository.findByName(name)

		if (productCheckName != null) {
			throw new InternalApiError('There is already one product with this name')
		}

		const product = this.productRepository.create({
			name,
			price,
			quantity
		})

		await this.productRepository.save(product)

		return product
	}
}
