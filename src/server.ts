import fastify, {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import heroRoutes from './hero-route.js'
import { addIsAuthUserPlugin } from './decorator.js'

function buildServer() {
  const envToLogger = {
    development: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
    production: true,
  };

  const server = fastify({ logger: envToLogger["development"] ?? true });

  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return "Hero App\n";
  });

  // decorators
  server.register(addIsAuthUserPlugin)

  // routes
  server.register(heroRoutes);

  return server;
}

export default buildServer

