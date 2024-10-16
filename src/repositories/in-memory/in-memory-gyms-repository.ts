import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/services/utils/get-distance'

export class InmemoryGymsRepository implements GymsRepository {
  private Gyms: Gym[] = []
  async findManyNearby(params: {
    latitude: number
    longitude: number
  }): Promise<Gym[]> {
    return this.Gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.Gyms.filter((gym) => gym.title.includes(query)).slice(
      (page - 1) * 20,
      page * 20,
    )
  }

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

  async findById(id: string) {
    const gym = this.Gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }
    return gym
  }
}
