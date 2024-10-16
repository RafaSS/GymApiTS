import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: {
        validated_at: data.validated_at ? new Date() : null,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userid: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userid,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }

  async countByUserId(userid: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userid,
      },
    })

    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    return checkIn
  }

  async frist() {
    const checkIn = await prisma.checkIn.findFirst()
    return checkIn
  }
}
