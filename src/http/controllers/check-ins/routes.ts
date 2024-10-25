import { FastifyInstance } from 'fastify'
import { jwtVerify } from '../../middleweres/verify-jwt'
import { create } from './register.controller'
import { validate } from './validate.controller'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
