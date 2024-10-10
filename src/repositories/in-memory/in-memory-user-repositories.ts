import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

interface CreateUserParams {
  name: string
  email: string
  password_hash: string
}

export class InmemoryUsersRepository implements UsersRepository {
  private users: User[] = []
  async findByEmail(_email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === _email)

    if (!user) {
      return null
    }
    return user
  }

  async findById(_id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === _id)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: CreateUserParams): Promise<User> {
    const user = {
      id: '1',
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    }

    this.users.push(user)
    return user
  }
}
