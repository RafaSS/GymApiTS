import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase(new InmemoryUsersRepository())

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
  it('should not be able to register with an existing email', async () => {
    const registerUseCase = new RegisterUseCase(new InmemoryUsersRepository())

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: user.email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  it('should register a user', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
