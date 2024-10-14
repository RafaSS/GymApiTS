import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InmemoryGymsRepository implements GymsRepository {
  private Gyms: Gym[] = []
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude as number),
      longitude: new Decimal(data.longitude as number),
    }
    this.Gyms.push(gym)
    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.Gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }
    return gym
  }
}
