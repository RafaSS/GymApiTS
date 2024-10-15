import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCaseCase } from './create-gym'

let sut: CreateGymUseCaseCase
let gymsRepository: InmemoryGymsRepository

describe('Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InmemoryGymsRepository()
    sut = new CreateGymUseCaseCase(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.title).toEqual(expect.any(String))
  })
})
