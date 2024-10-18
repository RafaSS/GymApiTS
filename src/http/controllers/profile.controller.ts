import { makeGetUserProfileUseCase } from '@/services/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  await req.jwtVerify()
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: req.user.sub,
  })
  return reply.status(200).send({ ...user, password_hash: undefined })
}
