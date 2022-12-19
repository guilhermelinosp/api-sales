import { dataSource } from '../../../shared/typeorm'
import { Customers } from '../../../shared/typeorm/entities/Customers'

export const CustomerRepository = dataSource.getRepository(Customers).extend({
  async findById(id: string): Promise<Customers | null> {
    const customer = await this.findOneBy({ id })
    return customer
  },

  async findByName(name: string): Promise<Customers | null> {
    const customer = await this.findOneBy({ name })
    return customer
  },

  async findByEmail(email: string): Promise<Customers | null> {
    const customer = await this.findOneBy({ email })
    return customer
  }
})
