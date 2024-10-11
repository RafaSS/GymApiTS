import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

describe('authenticate use case', () => {
  it('should authenticate with valid credentials', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'bqjUe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      authenticateUseCase.execute({
        email: 'wY9tZ@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    usersRepository.create({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'bqjUe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
