import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

async function addIsAuthUserOnRequest(server: FastifyInstance) {
  server.decorateRequest('isAuthUser', false)
}

const addIsAuthUserPlugin = fp(addIsAuthUserOnRequest)

export { addIsAuthUserPlugin } 

