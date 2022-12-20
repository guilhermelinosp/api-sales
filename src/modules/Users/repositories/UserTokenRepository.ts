import { dataSource } from '../../../shared/database'
import { UserToken } from '../../../shared/database/entities/UserToken'

export const UserTokenRepository = dataSource.getRepository(UserToken).extend({
	async findByToken(token: string): Promise<UserToken | null> {
		const user = await this.findOneBy({ token })
		return user
	},

	async generateToken(user_id: string): Promise<UserToken> {
		const user = this.create({ user_id })
		await this.save(user)
		return user
	}
})
