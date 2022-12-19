import { dataSource } from '../../../shared/typeorm'
import { UserToken } from '../../../shared/typeorm/entities/UserToken'

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
