import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from '../../services/register'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserBody.parse(request.body)

  try {
    await registerUseCase({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send({ message: error })
  }

  return reply.status(201).send()
}
