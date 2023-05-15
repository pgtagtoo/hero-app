import { rest } from "msw";
import { setupServer } from "msw/node";

const heroes = [
  {
    id: "1",
    name: "Daredevil",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba6d49472b/standard_xlarge.jpg",
  },
  {
    id: "2",
    name: "Thor",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02/standard_xlarge.jpg",
  },
  {
    id: "3",
    name: "Iron Man",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/55b6a25e654e6/standard_xlarge.jpg",
  },
  {
    id: "4",
    name: "Hulk",
    image:
      "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_xlarge.jpg",
  },
];

const profiles = [
  { str: 2, int: 7, agi: 9, luk: 7 },
  { str: 8, int: 2, agi: 5, luk: 9 },
  { str: 6, int: 9, agi: 6, luk: 9 },
  { str: 10, int: 1, agi: 4, luk: 2 },
];

const mswServer = setupServer(
  rest.post(
    "https://hahow-recruit.herokuapp.com/auth",
    async (req, res, ctx) => {
      const data = await req.json();
      const { name, password } = data;

      if (!name || !password) {
        return res(ctx.status(400));
      }

      if (name === "hahow" && password === "rocks") {
        return res(ctx.text("OK"));
      }

      return res(ctx.status(401));
    }
  ),

  rest.get("https://hahow-recruit.herokuapp.com/heroes", (req, res, ctx) => {
    return res(ctx.json(heroes));
  }),

  rest.get(
    "https://hahow-recruit.herokuapp.com/heroes/:heroId",
    (req, res, ctx) => {
      const { heroId } = req.params;
      const hero = heroes.find((hero) => hero.id === heroId);
      return res(ctx.json(hero));
    }
  ),

  rest.get(
    "https://hahow-recruit.herokuapp.com/heroes/:heroId/profile",
    (req, res, ctx) => {
      const { heroId } = req.params;
      const profile = profiles[Number(heroId) - 1];
      return res(ctx.json(profile));
    }
  )
);

export { mswServer };
