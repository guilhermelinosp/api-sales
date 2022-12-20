import { dataSource } from '../../../shared/database'
import { Customers } from '../../../shared/database/entities/Customers'

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
