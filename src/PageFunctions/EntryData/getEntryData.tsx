import axios from "axios";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import statsAPIToDisplayShort from "../../data/statsData/statsAPIToDisplayShort.json";
import "../../PageStyle/Entry.css";
import { getEntryMoveData } from "./getEntryMoveData.tsx";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";

export async function getEntryData(
  pokemon: string,
  shinyMode: boolean,
  clickMove: CallableFunction,
  clickType: CallableFunction
) {
  try {
    console.log(`Getting ${pokemonAPIToDisplay[pokemon]} Entry Data`);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
      {
        responseType: "json",
      }
    );
    let overall = [];
    let cur = [];

    // Sprites
    if (shinyMode) {
      cur.push(allPokemonSprites[pokemon].FrontShiny);
      cur.push(allPokemonSprites[pokemon].BackShiny);
    } else {
      cur.push(allPokemonSprites[pokemon].FrontDefault);
      cur.push(allPokemonSprites[pokemon].BackDefault);
    }

    overall.push([...cur]);
    cur = [];

    // types
    for (let i = 0; i < response.data.types.length; i++) {
      cur.push(response.data.types[i].type.name);
    }

    overall.push([...cur]);
    cur = [];
    let hiddenAbilities = [];

    // abilities
    for (let i = 0; i < response.data.abilities.length; i++) {
      if (response.data.abilities[i].is_hidden) {
        hiddenAbilities.push(`${response.data.abilities[i].ability.name}`);
      } else {
        cur.push(`${response.data.abilities[i].ability.name}`);
      }
    }

    overall.push([...cur]);
    overall.push([...hiddenAbilities]);
    cur = [];

    // stats
    for (let i = 0; i < response.data.stats.length; i++) {
      cur.push(
        <div
          key={response.data.stats[i].stat.name}
          className="entry-stat-entry"
        >
          <div className="entry-stat-entry-name">
            {statsAPIToDisplayShort[response.data.stats[i].stat.name]}
          </div>
          <div className="entry-stat-entry-amount">
            {response.data.stats[i].base_stat}
          </div>
        </div>
      );
    }

    overall.push([...cur]);
    cur = [];

    // moves
    for (let i = 0; i < response.data.moves.length; i++) {
      cur.push(
        getEntryMoveData(response.data.moves[i].move.name, clickMove, clickType)
      );
    }

    overall.push([...cur]);

    return overall;
  } catch (error) {
    return ["Error"];
  }
}
