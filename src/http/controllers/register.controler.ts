import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'

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

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
