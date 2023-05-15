interface Hero {
  id: string;
  name: string;
  image: string;
}

class HahowHeroService {
  constructor() {
  }

  async auth(name: string, password: string) { 
    const data = {
      name,
      password,
    }
    const response = await fetch('https://hahow-recruit.herokuapp.com/auth', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    const result = await response.text()
    // response seldom occur {"code":1000,"message":"Backend Error"} with status 200, even the password is correct
    return response.status === 200 && result === 'OK'
  }

  async getHeroes(): Promise<Array<Hero>> {
    const response = await fetch('https://hahow-recruit.herokuapp.com/heroes')
    const result = await response.json()
    return result
  }
  async getSingleHeroById(heroId: string): Promise<Hero> {
    const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}`)
    const result = await response.json()
    return result
  }

  async getHeroProfile(heroId: string) {
    const response = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
    const result = await response.json()
    return result
  }

}

const hahowHeroService = new HahowHeroService()

export default hahowHeroService

