import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IOrder } from '../models/IOrder'
import { OrderRepository } from '../repositories/OrderRepository'

export class ReadOrderService {
  constructor(private readonly orderRepository = OrderRepository) {}

  public async execute(): Promise<IOrder[]> {
    const orders = await this.orderRepository.find()

    if (orders.length === 0 || orders == null) {
      throw new InternalApiError('Orders not found')
    }

    return orders
  }
}
