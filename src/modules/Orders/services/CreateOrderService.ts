import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { CustomerRepository } from '../../Customers/repositories/CustomerRepository'
import { ProductRepository } from '../../Products/repositories/ProductRepository'
import { ICreateOrder } from '../interfaces'
import { IOrder } from '../models/IOrder'
import { OrderRepository } from '../repositories/OrderRepository'

export class CreateOrderService {
	constructor(
		private readonly orderRepository = OrderRepository,
		private readonly customerRepository = CustomerRepository,
		private readonly productRepository = ProductRepository
	) {}

	public async execute({ customer_id, products }: ICreateOrder): Promise<IOrder> {
		const customerExists = await this.customerRepository.findById(customer_id)

		if (customerExists == null) {
			throw new InternalApiError('Could not find any customer with the given id.')
		}

		const existsProducts = await this.productRepository.findAllByIds(products)

		if (existsProducts?.length === 0 || existsProducts == null) {
			throw new InternalApiError('Could not find any products with the given ids.')
		}

		const existsProductsIds = existsProducts.map((product: { id: string }) => product.id)

		const checkInexistentProducts = products.filter(
			(product) => !existsProductsIds.includes(product.id)
		)

		if (checkInexistentProducts.length > 0) {
			throw new InternalApiError(`Could not find product ${checkInexistentProducts[0].id}.`)
		}

		const quantityAvailable = products.filter(
			(product) =>
				existsProducts.filter((p: { id: string }) => p.id === product.id)[0].quantity <
				product.quantity
		)

		if (quantityAvailable.length > 0) {
			throw new InternalApiError(
				`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`
			)
		}

		const serializedProducts = products.map((product) => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existsProducts.filter((p: { id: string }) => p.id === product.id)[0].price
		}))

		const order = this.orderRepository.create({
			customer: customerExists,
			order_products: serializedProducts
		})

		const { order_products } = order

		const updatedProductsQuantity = order_products.map(
			(product: { product_id: string; quantity: number }) => ({
				id: product.product_id,
				quantity:
					existsProducts.filter((p: { id: string }) => p.id === product.product_id)[0].quantity -
					product.quantity
			})
		)

		await this.productRepository.updateStock(updatedProductsQuantity)

		await this.orderRepository.save(order)

		return order
	}
}
