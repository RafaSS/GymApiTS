import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseCaseRequest {
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

interface CreateGymUseCaseCaseResponse {
  gym: Gym
}

export class CreateGymUseCaseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseCaseRequest): Promise<CreateGymUseCaseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude,
      longitude,
    })

    return { gym }
  }
}
