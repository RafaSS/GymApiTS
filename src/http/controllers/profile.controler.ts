import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(200).send()
}
