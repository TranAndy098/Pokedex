import { useState } from "react";
import allSpecialPokemonForms from "../../data/pokemonData/allSpecialPokemonForms.json";
import "../../PageStyle/Entry.css";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";

export function getEntryFormData(
  pokemon: string,
  setForms: typeof useState,
  shinyMode: boolean
) {
  console.log(`Getting ${pokemonAPIToDisplay[pokemon]} Form Data`);

  if (!Object.keys(allSpecialPokemonForms).includes(pokemon)) {
    return [];
  }

  let mid = [];

  let allForms = allSpecialPokemonForms[pokemon];

  for (let i = 0; i < allForms.length; i++) {
    let name = Object.keys(allForms[i]);
    mid.push(
      <div key={allForms[i][name].DisplayTitle} className="pokemon-form">
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
