import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
