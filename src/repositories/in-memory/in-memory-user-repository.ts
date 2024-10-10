import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

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

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    }

    this.users.push(user)
    return user
  }
}
