import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IUpdateCustomer } from '../interfaces'
import { ICustomer } from '../models/ICustomer'
import { CustomerRepository } from '../repositories/CustomerRepository'

export class UpdateCustomerService {
  constructor(private readonly customerRepository = CustomerRepository) {}

  public async execute({ id, name, email }: IUpdateCustomer): Promise<ICustomer> {
    const customerCheckId = await this.customerRepository.findById(id)

    if (customerCheckId == null) {
      throw new InternalApiError('Product not found.')
    }

    const customerCheckEmail = await this.customerRepository.findByEmail(email!)

    if (customerCheckEmail != null && customerCheckEmail.email === email) {
      throw new InternalApiError('There is already one product with this name')
    }

    customerCheckId.name = name ?? customerCheckId.name
    customerCheckId.email = email ?? customerCheckId.email

    await this.customerRepository.save(customerCheckId)

    return customerCheckId
  }
}
