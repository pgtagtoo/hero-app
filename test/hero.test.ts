import {
  beforeAll,
  afterAll,
  test,
  afterEach,
  describe,
  expect,
} from 'vitest'

import buildServer from '../src/server'
import { mswServer } from '../mocks/hahow-service'

const heroes = [
  {
    id: '1',
    name: 'Daredevil',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
  },
  {
    id: '2',
    name: 'Thor',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
  },
  {
    id: '3',
    name: 'Iron Man',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg',
  },
  {
    id: '4',
    name: 'Hulk',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
  },
]

const hero1 = {
  id: '1',
  name: 'Daredevil',
  image:
    'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
}

const heroesWithProfile = [
  {
    id: '1',
    name: 'Daredevil',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
    profile: { str: 2, int: 7, agi: 9, luk: 7 },
  },
  {
    id: '2',
    name: 'Thor',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg',
    profile: { str: 8, int: 2, agi: 5, luk: 9 },
  },
  {
    id: '3',
    name: 'Iron Man',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg',
    profile: { str: 6, int: 9, agi: 6, luk: 9 },
  },
  {
    id: '4',
    name: 'Hulk',
    image:
      'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg',
    profile: { str: 10, int: 1, agi: 4, luk: 2 },
  },
]

const hero1WithProfile = {
  id: '1',
  name: 'Daredevil',
  image:
    'http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg',
  profile: { str: 2, int: 7, agi: 9, luk: 7 },
}

function build() {
  const server = buildServer()

  beforeAll(async () => {
    mswServer.listen()
    await server.ready()
  })

  afterAll(async () => {
    mswServer.close()
    await server.close()
  })

  return server
}

describe('Hero tests', () => {
  const server = build()

  afterEach(() => mswServer.resetHandlers())

  test('request get heroes', async () => {
    const res = await server.inject({
      url: 'heroes',
    })
    expect(res.statusCode).toBe(200)
    const data = await res.json()
    expect(data).toEqual(heroes)
  })

  test('Get Single hero', async () => {
    const res = await server.inject({
      url: 'heroes/1',
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual(hero1)
  })

  test('request get heroes with auth', async () => {
    const res = await server.inject({
      method: 'GET',
      url: 'heroes',
      headers: {
        name: 'hahow',
        Password: 'rocks',
      },
    })
    expect(res.statusCode).toBe(200)
    const data = await res.json()
    expect(data).toEqual(heroesWithProfile)
  })

  test('Get Single hero with auth', async () => {
    const res = await server.inject({
      url: 'heroes/1',
      headers: {
        name: 'hahow',
        password: 'rocks',
      },
    })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual(hero1WithProfile)
  })
})

