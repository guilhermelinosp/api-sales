import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	JoinColumn,
	ManyToOne
} from 'typeorm'
import { IOrderProducts } from '../../../modules/Orders/models/iOrderProducts'
import { Orders } from './Orders'
import { Products } from './Products'

@Entity('orders_products')
export class OrdersProducts implements IOrderProducts {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Orders, (order) => order.order_products)
	@JoinColumn({ name: 'order_id' })
	order: Orders

	@ManyToOne(() => Products, (product) => product.order_products)
	@JoinColumn({ name: 'product_id' })
	product: Products

	@Column()
	order_id: string

	@Column()
	product_id: string

	@Column('decimal')
	price: number

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
