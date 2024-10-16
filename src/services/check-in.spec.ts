import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InmemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-checkins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let sut: CheckInUseCase

let gymsRepository: InmemoryGymsRepository
let checkinsRepository: InmemoryCheckInsRepository

describe('checkin use case', () => {
  beforeEach(() => {
    checkinsRepository = new InmemoryCheckInsRepository()
    gymsRepository = new InmemoryGymsRepository()
    sut = new CheckInUseCase(checkinsRepository, gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { checkIn } = await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(async () => {
      await sut.execute({
        user_id: 'user-1',
        gymId: 'gym-1',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      user_id: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    await expect(() =>
      sut.execute({
        user_id: 'user-1',
        gymId: 'gym-1',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
    await expect(() =>
      sut.execute({
        user_id: 'user-1',
        gymId: 'gym-1',
        userLatitude: -27.2092052,
        userLongitude: -49.1111111,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
