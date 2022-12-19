import { dataSource } from '../../../shared/typeorm'
import { Users } from '../../../shared/typeorm/entities/Users'

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
