import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InmemoryGymsRepository implements GymsRepository {
  private Gyms: Gym[] = []
  async findById(id: string): Promise<Gym | null> {
    const gym = this.Gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }
    return gym
  }
}
