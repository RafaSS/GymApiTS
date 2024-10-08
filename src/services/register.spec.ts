import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositories'
import { compare } from 'bcryptjs'

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepositories = new PrismaUsersRepositories()
    const registerUseCase = new RegisterUseCase(prismaUsersRepositories)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
