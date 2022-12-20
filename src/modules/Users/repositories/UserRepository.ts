import { dataSource } from '../../../shared/database'
import { Users } from '../../../shared/database/entities/Users'

export const UserRepository = dataSource.getRepository(Users).extend({
	async findById(id: string): Promise<Users | null> {
		const user = await this.findOneBy({ id })
		return user
	},

	async findByName(name: string): Promise<Users | null> {
		const user = await this.findOneBy({ name })
		return user
	},

	async findByEmail(email: string): Promise<Users | null> {
		const user = await this.findOneBy({ email })
		return user
	}
})
