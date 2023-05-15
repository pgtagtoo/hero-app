import fastify, {
  FastifyReply,
  FastifyRequest,
  FastifyInstance,
} from "fastify";

import heroRoutes from './hero-route.js'

declare module "fastify" {
  interface FastifyRequest {
    isAuthUser: boolean;
  }
}

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

  server.get("/", async (request, reply) => {
    return "Hero App\n";
  });

  server.decorateRequest('isAuthUser', false)

  server.register(heroRoutes);

  return server;
}

export default buildServer;

