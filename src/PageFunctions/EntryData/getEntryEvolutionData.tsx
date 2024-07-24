import { React } from "react";
import allPokemonEvolutions from "../../data/pokemonData/allPokemonEvolutions.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import "../../PageStyle/MovesPokemon.css";
import "../../PageStyle/EntryEncounters.css";
import "../../PageStyle/Entry.css";
import "../../PageStyle/MoveColors.css";

export function getEntryEvolutionData(curPokemon, shinyMode, clickPokemon) {
  console.log("Getting Pokemon Evolution Data");
  // evolve
  let mid = [];
  let chains = allPokemonEvolutions[curPokemon].EvolveChain;

  for (let i = 0; i < allPokemonEvolutions[curPokemon].Size; i++) {
    let interm = [];
    for (let j = 0; j < chains[i].length; j++) {
      interm.push(
        <div className="pokemon-evolution">
          <img
            className="pokemon-evolution-sprite"
            src={
              shinyMode
                ? allPokemonSprites[chains[i][j]].FrontShiny
                : allPokemonSprites[chains[i][j]].FrontDefault
            }
            onClick={() => clickPokemon(chains[i][j])}
          />
          <div className="pokemon-evolution-name">
            {pokemonAPIToDisplay[chains[i][j]]}
          </div>
        </div>
      );
    }
    mid.push(interm);
  }

  return mid;
}
