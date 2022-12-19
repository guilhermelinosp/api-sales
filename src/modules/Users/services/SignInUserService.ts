import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ISignInUser } from '../interfaces'
import { IUser } from '../models/IUser'
import { UserRepository } from '../repositories/UserRepository'

interface IResponse {
  user: IUser
  token: string
}

export class SignInUserService {
  constructor(private readonly userRepository = UserRepository) {}

  public async execute({ email, password }: ISignInUser): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (user == null || !(await compare(password, user.password))) {
      throw new InternalApiError('Incorrect email/password combination.')
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user, token }
  }
}
