import { FastifyReply, FastifyRequest } from 'fastify'
// import server from './index.js'
import hahowService from "./services/hahow-service.js";

declare module "fastify" {
  interface FastifyRequest {
    isAuthUser: boolean;
  }
}

const authValidate = async (req: FastifyRequest, reply: FastifyReply) => {
  const name = req?.headers?.name
  const password = req?.headers?.password

  if (!name || !password) {
    req.isAuthUser = false
    return
  }

  if (Array.isArray(name) || Array.isArray(password)) {
    req.isAuthUser = false
    return
  }

  const isAuth = await hahowService.auth(name, password)
  req.isAuthUser = isAuth ? true : false
  // server.log.info(`Is Auth: ${isAuth}`)
}

export default authValidate

