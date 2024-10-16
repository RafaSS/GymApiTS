import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepositories()
  return new AuthenticateUseCase(usersRepository)
}
