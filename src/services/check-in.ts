import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'

interface CheckinUsecase {
  user_id: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}
export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}
  async execute({
    user_id,
    gymId,
  }: CheckinUsecase): Promise<CheckInUseCaseResponse> {
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
