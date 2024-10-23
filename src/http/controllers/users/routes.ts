import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { jwtVerify } from '../../middleweres/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/auth', authenticateController)

  app.get('/me', { onRequest: [jwtVerify] }, profileController)
}
