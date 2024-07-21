import express from "express";
import { getPeople, getPokemon } from "./peopleService";

const router = express.Router();

router.get("/people", async (req, res) => {
  const people = await getPeople();
  res.send(people);
});

router.get("/pokemon", async (req, res) => {
  const pokemon = await getPokemon();
  res.send(pokemon);
});

export default router;
