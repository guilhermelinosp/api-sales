import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Generated
} from 'typeorm'

@Entity('user_tokens')
export class UserToken {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('uuid')
	@Generated('uuid')
	token: string

	@Column('uuid')
	user_id: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
