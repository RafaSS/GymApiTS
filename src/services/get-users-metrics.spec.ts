import { InmemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'
let checkInsRepository: InmemoryCheckInsRepository
let sut: GetUserMetricsUseCase
describe('Ger User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InmemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })
  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      user_id: 'user-01',
    })
    expect(checkInsCount).toEqual(2)
  })
})
