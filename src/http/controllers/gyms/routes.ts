import { FastifyInstance } from 'fastify'

import { jwtVerify } from '../../middleweres/verify-jwt'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)
}
