import { CheckIn, Prisma } from '@prisma/client'

import { randomUUID } from 'crypto'
import { CheckInRepository } from '../check-ins-repository'

export class InmemoryCheckInsRepository implements CheckInRepository {
  private checkIns: CheckIn[] = []

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkInOnSameDate = this.checkIns.find(
      (checkIn) =>
        checkIn.user_id === userId &&
        checkIn.created_at.toDateString() === date.toDateString(),
    )

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gymId: data.gymId,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)
    return checkIn
  }
}
