import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          created_at: new Date(),
          password_hash: data.password_hash,
        }
      },
    })

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
