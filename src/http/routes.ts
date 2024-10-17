import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controler'
import { authenticateController } from './controllers/authenticate.controler'
import { profileController } from './controllers/profile.controler'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/auth', authenticateController)

  app.get('/users', async () => {})

  app.get('/users/:id', async () => {})

  app.get('/me', profileController)
}
