import fastify, { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import hahowService from "./services/hahow-hero.js";
import authValidate from './auth-hook.js'

async function heroRoutes(server: FastifyInstance) {
  server.addHook('onRequest', authValidate)

  server.get('/heroes', async function (req, reply) {
    const heroes = await hahowService.getHeroes()
    if (!req.isAuthUser) {
      reply.send(heroes)
      return
    }

    const heroIds = heroes.map((hero) => hero.id)
    const profiles = await Promise.all(
      heroIds.map((id) => hahowService.getHeroProfile(id))
    )
    const heroesWithProfile = heroes.map((hero, index) => ({
      ...hero,
      profile: profiles[index],
    }))

    reply.send(heroesWithProfile)
  })

  server.get<{ Params: { heroId: string } }>(
    '/heroes/:heroId',
    async function (req, reply) {
      const hero = await hahowService.getSingleHeroById(req.params.heroId)
      if (!req.isAuthUser) {
        reply.send(hero)
        return
      }

      const profile = await hahowService.getHeroProfile(hero.id)
      const heroWithProfile = { ...hero, profile }

      reply.send(heroWithProfile)
    }
  )
}

export default heroRoutes
