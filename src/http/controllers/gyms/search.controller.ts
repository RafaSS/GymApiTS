import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case'

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsBody = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsBody.parse(request.body)

  try {
    const searchGymsUseCase = makeSearchGymsUseCase()
    const gyms = await searchGymsUseCase.execute({ query, page })

    return reply.status(200).send(gyms)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
