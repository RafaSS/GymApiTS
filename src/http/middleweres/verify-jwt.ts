import { FastifyReply, FastifyRequest } from 'fastify'

export function jwtVerify() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
