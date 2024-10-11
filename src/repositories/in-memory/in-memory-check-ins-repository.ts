import { CheckIn, Prisma } from '@prisma/client'

import { randomUUID } from 'crypto'
import { CheckInRepository } from '../check-ins-repository'

export class InmemoryCheckInsRepository implements CheckInRepository {
  private checkIns: CheckIn[] = []

  async findByUserIdOnDate(userId: string): Promise<CheckIn | null> {
    const checkInOnSameDate = await this.checkIns.find(
      (checkIn) => checkIn.user_id === userId,
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
