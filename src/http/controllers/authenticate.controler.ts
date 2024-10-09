import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepositories } from '../../repositories/prisma/prisma-users-repositories'
import { AuthenticateUseCase } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/erros/invalid-credentials-error'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepositories = new PrismaUsersRepositories()
    const registerUseCase = new AuthenticateUseCase(prismaUsersRepositories)
    await registerUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send()
}
