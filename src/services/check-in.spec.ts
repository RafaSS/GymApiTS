import { expect, describe, it, beforeEach } from 'vitest'
import { InmemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let sut: CheckInUseCase
let checkinsRepository: InmemoryCheckInsRepository

describe('checkin use case', () => {
  beforeEach(() => {
    checkinsRepository = new InmemoryCheckInsRepository()
    sut = new CheckInUseCase(checkinsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
