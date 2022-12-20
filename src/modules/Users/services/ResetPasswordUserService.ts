import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { UserRepository } from '../repositories/UserRepository'
import { UserTokenRepository } from '../repositories/UserTokenRepository'
import { IResetPasswordUser } from '../interfaces'
import { IUser } from '../models/IUser'

export class ResetPasswordUserService {
	constructor(
		private readonly userRepository = UserRepository,
		private readonly userTokenRepository = UserTokenRepository
	) {}

	public async execute({ token, password }: IResetPasswordUser): Promise<IUser> {
		const userToken = await this.userTokenRepository.findByToken(token)

		if (userToken == null) {
			throw new InternalApiError('User token does not exists.')
		}

		const user = await this.userRepository.findById(userToken.user_id)
		if (user == null) {
			throw new InternalApiError('User does not exists.')
		}

		if (isAfter(Date.now(), addHours(userToken.created_at, 2))) {
			throw new Error('Token expired.')
		}

		user.password = await hash(password, 8)

		await this.userRepository.save(user)

		return user
	}
}
