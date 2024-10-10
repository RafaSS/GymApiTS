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
  constructor(private usersRepository: CheckInRepository) {}
  async execute({
    user_id,
    gymId,
  }: CheckinUsecase): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.usersRepository.create({
      gymId,
      user_id,
    })

    return { checkIn }
  }
}
