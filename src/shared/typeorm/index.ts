import { DataSource } from 'typeorm'
import 'dotenv/config'

import { Users } from './entities/Users'
import { UserToken } from './entities/UserToken'
import { Products } from './entities/Products'
import { Customers } from './entities/Customers'
import { Orders } from './entities/Orders'
import { OrdersProducts } from './entities/OrdersProducts'

import { CreateUsers1668710339866 } from './migrations/1668710339866-CreateUsers'
import { UserTokens1664193700744 } from './migrations/1664193700744-UserTokens'
import { CreateProducts1607437608841 } from './migrations/1668682988270-CreateProducts'
import { CreateCustomers1669799725480 } from './migrations/1669799725480-CreateCustomers'
import { CreateOrders1669809127253 } from './migrations/1669809127253-CreateOrders'
import { AddCustomerIdToOrders1669809547781 } from './migrations/1669809547781-AddCustomerIdToOrders'
import { CreateOrdersProducts1669810082262 } from './migrations/1669810082262-CreateOrdersProducts'
import { AddOrderIdToOrdersProducts1669810267546 } from './migrations/1669810267546-AddOrderIdToOrdersProducts'
import { AddProductIdToOrdersProducts1669810632033 } from './migrations/1669810632033-AddProductIdToOrdersProducts'

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/postgres',
  entities: [Users, UserToken, Products, Customers, Orders, OrdersProducts],
  migrations: [
    CreateUsers1668710339866,
    UserTokens1664193700744,
    CreateProducts1607437608841,
    CreateCustomers1669799725480,
    CreateOrders1669809127253,
    AddCustomerIdToOrders1669809547781,
    CreateOrdersProducts1669810082262,
    AddOrderIdToOrdersProducts1669810267546,
    AddProductIdToOrdersProducts1669810632033
  ]
})
