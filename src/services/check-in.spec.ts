import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InmemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let sut: CheckInUseCase
let checkinsRepository: InmemoryCheckInsRepository

describe('checkin use case', () => {
  beforeEach(() => {
    checkinsRepository = new InmemoryCheckInsRepository()
    sut = new CheckInUseCase(checkinsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
    })

    expect(async () => {
      await sut.execute({
        user_id: 'user-1',
        gymId: 'gym-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    await expect(() =>
      sut.execute({
        user_id: 'user-1',
        gymId: 'gym-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
