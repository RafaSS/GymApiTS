import { CheckInRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FecthUserCheckInsUseCaseHistory {
  user_id: string
  page: number
}

interface FecthUserCheckInsUseCaseHistoryResponse {
  checkIns: CheckIn[]
}
export class FecthUserCheckInsUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    user_id,
    page,
  }: FecthUserCheckInsUseCaseHistory): Promise<FecthUserCheckInsUseCaseHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      user_id,
      page,
    )
    if (!checkIns) {
      throw new ResourceNotFoundError()
    }

    return { checkIns }
  }
}
