import { expect, describe, it, beforeEach } from 'vitest'
import { InmemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FecthUserCheckInsUseCase } from './fetch-user-checkins-history'

let sut: FecthUserCheckInsUseCase

let checkinsRepository: InmemoryCheckInsRepository

describe('Fetch User history', () => {
  beforeEach(() => {
    checkinsRepository = new InmemoryCheckInsRepository()
    sut = new FecthUserCheckInsUseCase(checkinsRepository)
  })

  it('should be able to fetch check ins', async () => {
    await checkinsRepository.create({
      user_id: 'user-1',
      gymId: 'gym-1',
    })
    await checkinsRepository.create({
      user_id: 'user-1',
      gymId: 'gym-2',
    })

    const { checkIns } = await sut.execute({
      user_id: 'user-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-1' }),
      expect.objectContaining({ gymId: 'gym-2' }),
    ])
  })
  it('should be able to fetch paginated check ins', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinsRepository.create({
        gymId: `gym-${i}`,
        user_id: 'user-1',
      })
    }
    const { checkIns } = await sut.execute({
      user_id: 'user-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
