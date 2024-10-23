import { FastifyInstance } from 'fastify'

import { jwtVerify } from '../../middleweres/verify-jwt'
import { searchController } from './search.controller'
import { nearbyController } from './nearby.controller'
import { registerController } from './register.controller'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)

  app.get('/gyms/search', searchController)

  app.get('/gyms/nearby', nearbyController)

  app.post('/gyms/register', registerController)
}
