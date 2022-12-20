import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IReadByIdOrder } from '../interfaces'
import { IOrder } from '../models/IOrder'
import { OrderRepository } from '../repositories/OrderRepository'

export class ReadByIdOrderService {
	constructor(private readonly orderRepository = OrderRepository) {}

	public async execute({ id }: IReadByIdOrder): Promise<IOrder> {
		const orderCheckId = await this.orderRepository.findById(id)

		if (orderCheckId == null) {
			throw new InternalApiError('Product not found.')
		}
		return orderCheckId
	}
}
