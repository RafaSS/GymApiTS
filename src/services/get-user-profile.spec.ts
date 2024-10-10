import { expect, describe, it } from 'vitest'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found'

describe('Get user profile use case', () => {
  it('should be able to get user profile', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const sut = new GetUserProfileUseCase(usersRepository)

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'bqjUe@example.com',
      password_hash: '123456',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
      }),
    )
  })

  it('should not be able to get user profile with wrong id', async () => {
    const usersRepository = new InmemoryUsersRepository()
    const sut = new GetUserProfileUseCase(usersRepository)

    expect(() => {
      return sut.execute({
        userId: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
