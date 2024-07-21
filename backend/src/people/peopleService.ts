import { PEOPLE_MOCK } from "./mocks";

export const getPeople = async () => {
  return PEOPLE_MOCK;
};

type Pokémon = {
  name: string;
  url?: string;
};

// Sort function that handles undefined values and sorts them to the bottom
const sortFunc = (a: Pokémon, b: Pokémon) => {
  if (!a.name) {
    return 1;
  } else if (!b.name) {
    return -1;
  } else {
    return a.name.localeCompare(b.name);
  }
};

export const getPokemon = async () => {
  let pokemon: Pokémon[] = [];
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();
    pokemon = data.results;
  } catch (error) {
    throw new Error("Error fetching data from Pokémon API");
  }

  return pokemon.sort((a: Pokémon, b: Pokémon) => sortFunc(a, b));
};
