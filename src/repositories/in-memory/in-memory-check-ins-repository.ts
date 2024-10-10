import { CheckIn,Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'

interface CreateCheckInParams {
  name: string
  email: string
  password_hash: string
}

export class InmemoryUsersRepository implements CreateCheckInParams {
  name: string
  email: string
  password_hash: string
  private checkIns: CheckIn[] = []

  async create(data: ): Promise<User> {
    const checkIn = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    }

    this.checkIns.push(checkIn)
    return checkIn
  }
}
