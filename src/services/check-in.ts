import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './erros/resource-not-found'

interface CheckinUsecase {
  user_id: string
  gymId: string
  userLatitude?: number
  userLongitude?: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    user_id,
    gymId,
  }: CheckinUsecase): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // const distance = Math.hypot(
    //   Number(gym.longitude) - Number(userLongitude),
    //   Number(gym.latitude) - Number(userLatitude),
    // )

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error('Check-in already exists')
    }
    const checkIn = await this.checkInsRepository.create({
      gymId,
      user_id,
    })

    return { checkIn }
  }
}
