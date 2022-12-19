import { dataSource } from '../../../shared/typeorm'
import { Customers } from '../../../shared/typeorm/entities/Customers'
import { Orders } from '../../../shared/typeorm/entities/Orders'

export interface IProduct {
  id: string
  price: number
  quantity: number
}

export interface IRequest {
  customer: Customers
  products: IProduct[]
}

export const OrderRepository = dataSource.getRepository(Orders).extend({
  async findById(id: string): Promise<Orders | null> {
    const order = await this.findOne({ where: { id }, relations: ['order_products', 'customer'] })
    return order
  },

  async createOrder({ customer, products }: IRequest): Promise<Orders> {
    const order = this.create({
      customer,
      order_products: products
    })

    await this.save(order)

    return order
  }
})
