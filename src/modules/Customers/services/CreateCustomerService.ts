import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICreateCustomer } from '../interfaces'
import { ICustomer } from '../models/ICustomer'
import { CustomerRepository } from '../repositories/CustomerRepository'

export class CreateCustomerService {
	constructor(private readonly customerRepository = CustomerRepository) {}

	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const customerCheckEmail = await this.customerRepository.findByEmail(email)

		if (customerCheckEmail != null) {
			throw new InternalApiError('There is already one customer with this email')
		}

		const customer = this.customerRepository.create({
			name,
			email
		})

		await this.customerRepository.save(customer)

		return customer
	}
}
