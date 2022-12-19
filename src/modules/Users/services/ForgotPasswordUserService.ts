import Mail from '../../../shared/utils/mail'
import path from 'path'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IForgotPasswordUser } from '../interfaces'
import { IUserToken } from '../models/IUserToken'
import { UserRepository } from '../repositories/UserRepository'
import { UserTokenRepository } from '../repositories/UserTokenRepository'

export class ForgotPasswordUserService {
  constructor(
    private readonly userRepository = UserRepository,
    private readonly userTokenRepository = UserTokenRepository
  ) {}

  public async execute({ email }: IForgotPasswordUser): Promise<IUserToken> {
    const user = await this.userRepository.findByEmail(email)

    if (user == null) {
      throw new InternalApiError('User does not exists.')
    }

    const token = await this.userTokenRepository.generateToken(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname + '../../../../shared/utils/views/forgotPassword.hbs'
    )

    await Mail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: 'Reset Password',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `https://web-login-form.vercel.app/checktoken`,
          token: token.token
        }
      }
    })

    return token
  }
}
