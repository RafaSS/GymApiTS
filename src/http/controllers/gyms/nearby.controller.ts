import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeFetchNearbyGymsUseCase } from '@/services/factories/make-fetch-nearby-gym-use-case'

export async function nearbyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyGymsBody = z.object({
    userLatitude: z.number(),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = fetchNearbyGymsBody.parse(
    request.body,
  )

  try {
    const fetchNearbyGymsUseCase = MakeFetchNearbyGymsUseCase()
    const gyms = await fetchNearbyGymsUseCase.execute({
      userLatitude,
      userLongitude,
    })

    return reply.status(200).send(gyms)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
