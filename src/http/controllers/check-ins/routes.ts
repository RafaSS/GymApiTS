import { FastifyInstance } from 'fastify'

import { jwtVerify } from '../../middleweres/verify-jwt'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)
}
