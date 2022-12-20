import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('customers')
export class Customers {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('varchar')
	name: string

	@Column('varchar')
	email: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
