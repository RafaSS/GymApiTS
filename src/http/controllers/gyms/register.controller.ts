import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createGymBody = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymBody.parse(request.body)

  try {
    const registerUseCase = makeCreateGymUseCase()
    await registerUseCase.execute({
      description,
      latitude,
      longitude,
      phone,
      title,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
