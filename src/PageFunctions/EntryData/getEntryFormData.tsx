import { React } from "react";
import allSpecialPokemonForms from "../../data/pokemonData/allSpecialPokemonForms.json";
import "../../PageStyle/Entry.css";

export function getEntryFormData(pokemon, setForms, shinyMode) {
  console.log("Getting Pokemon Form Data");

  if (!Object.keys(allSpecialPokemonForms).includes(pokemon)) {
    return [];
  }

  let mid = [];

  let allForms = allSpecialPokemonForms[pokemon];

  for (let i = 0; i < allForms.length; i++) {
    let name = Object.keys(allForms[i]);
    mid.push(
      <div className="pokemon-form">
        <img
          className="pokemon-form-sprite"
          src={
            shinyMode
              ? allForms[i][name].FrontShiny
              : allForms[i][name].FrontDefault
          }
        />
        <div className="pokemon-form-name">{allForms[i][name].DisplayName}</div>
      </div>
    );
  }
  setForms(true);
  return mid;
}
