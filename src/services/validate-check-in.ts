import { CheckInRepository } from '@/repositories/check-ins-repository'

import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}
  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    const ditanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      dayjs(checkIn?.created_at),
      'minutes',
    )

    if (ditanceInMinutesFromCheckInCreation > 20) {
      throw new Error()
    }
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return {
      checkIn,
    }
  }
}
