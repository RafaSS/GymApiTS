import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/services/factories/make-get-user-metrics-use-case'
export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    user_id: request.user.sub,
  })
  return reply.status(200).send({
    checkInsCount,
  })
}