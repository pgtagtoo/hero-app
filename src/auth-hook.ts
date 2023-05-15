import { FastifyReply, FastifyRequest } from 'fastify'
import hahowService from "./services/hahow-hero.js";

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
}

export default authValidate

