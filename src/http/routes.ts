import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controller'
import { authenticateController } from './controllers/authenticate.controller'
import { profileController } from './controllers/profile.controller'
import { jwtVerify } from './middleweres/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/auth', authenticateController)

  app.get('/me', { onRequest: [jwtVerify] }, profileController)
}
