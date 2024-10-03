import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.get('/users', async () => {})

  app.get('/users/:id', async (request) => {})
}
