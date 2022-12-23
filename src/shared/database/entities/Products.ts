import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm'
import { OrdersProducts } from './OrdersProducts'

@Entity('products')
export class Products {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('varchar')
	name: string

	@Column('decimal')
	price: number

	@Column('int')
	quantity: number

	@OneToMany(() => OrdersProducts, (order_products) => order_products.product)
	order_products: OrdersProducts[]

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
