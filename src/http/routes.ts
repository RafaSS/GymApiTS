import { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register.controler'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.get('/users', async () => {})

  app.get('/users/:id', async () => {})
}
