import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userid: string, page: number): Promise<CheckIn[]>
  countByUserId(userid: string): Promise<number>
  findById(id: string): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  frist(): Promise<CheckIn | null>
}
