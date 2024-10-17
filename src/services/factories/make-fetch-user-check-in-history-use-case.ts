import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FecthUserCheckInsUseCase } from '../fetch-user-checkins-history'
export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FecthUserCheckInsUseCase(checkInsRepository)
  return useCase
}
