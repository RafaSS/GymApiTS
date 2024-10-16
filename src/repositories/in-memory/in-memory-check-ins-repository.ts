import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { randomUUID } from 'crypto'
import { CheckInRepository } from '../check-ins-repository'

export class InmemoryCheckInsRepository implements CheckInRepository {
  async countByUserId(userid: string): Promise<number> {
    return this.checkIns.filter((item) => item.user_id === userid).length
  }

  private checkIns: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const isOnSameDate =
      dayjs(date).isAfter(startOfTheDay) && dayjs(date).isBefore(endOfTheDay)

    const userIdIsTheSame = this.checkIns.find((checkIn) => {
      return checkIn.user_id === userId
    })

    if (userIdIsTheSame && isOnSameDate) {
      return userIdIsTheSame
    }

    return null
  }

  async findManyByUserId(userid: string, page: number): Promise<CheckIn[]> {
    return this.checkIns
      .filter((item) => item.user_id === userid)
      .slice((page - 1) * 20, page * 20)
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
