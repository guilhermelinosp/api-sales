import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany
} from 'typeorm'
import { Customers } from './Customers'
import { OrdersProducts } from './OrdersProducts'

@Entity('orders')
export class Orders {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Customers)
	@JoinColumn({ name: 'customer_id' })
	customer: Customers

	@OneToMany(() => OrdersProducts, order_products => order_products.order, { cascade: true })
	order_products: OrdersProducts[]

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
