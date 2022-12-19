import { ICustomer } from '../../Customers/models/ICustomer'
import { IOrderProducts } from './iOrderProducts'

export interface IOrder {
  id: string
  customer: ICustomer
  order_products: IOrderProducts[]
  created_at?: Date
  updated_at?: Date
}
