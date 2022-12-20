import { hash } from 'bcryptjs'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ISignUpUser } from '../interfaces'
import { IUser } from '../models/IUser'
import { UserRepository } from '../repositories/UserRepository'

export class SignUpUserService {
	constructor(private readonly userRepository = UserRepository) {}

	public async execute({ name, email, password }: ISignUpUser): Promise<IUser> {
		const userCheckEmail = await this.userRepository.findByEmail(email)

		if (userCheckEmail != null) {
			throw new InternalApiError('There is already one user with this email')
		}

		const user = this.userRepository.create({
			name,
			email,
			password: await hash(password, 8)
		})

		await this.userRepository.save(user)

		return user
	}
}
