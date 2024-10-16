import { RegisterUseCase } from '../register'
import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepositories()
  return new RegisterUseCase(usersRepository)
}
