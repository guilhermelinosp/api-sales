import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteCustomer } from '../interfaces'
import { CustomerRepository } from '../repositories/CustomerRepository'

export class DeleteCustomerService {
  constructor(private readonly customerRepository = CustomerRepository) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const productCheckId = await this.customerRepository.findById(id)

    if (productCheckId == null) {
      throw new InternalApiError('Product not found')
    }

    await this.customerRepository.remove(productCheckId)
  }
}
