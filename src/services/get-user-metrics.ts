import { CheckInRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserMetricsUseCaseHistory {
  user_id: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}
export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    user_id,
  }: GetUserMetricsUseCaseHistory): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(user_id)
    if (!checkInsCount) {
      throw new ResourceNotFoundError()
    }

    return { checkInsCount }
  }
}
