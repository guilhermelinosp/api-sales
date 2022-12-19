import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICustomer } from '../models/ICustomer'
import { CustomerRepository } from '../repositories/CustomerRepository'

export class ReadCustomerService {
  constructor(private readonly customerRepository = CustomerRepository) {}

  public async execute(): Promise<ICustomer[]> {
    const customers = await this.customerRepository.find()

    if (customers.length === 0 || customers == null) {
      throw new InternalApiError('Customers not found')
    }

    return customers
  }
}
