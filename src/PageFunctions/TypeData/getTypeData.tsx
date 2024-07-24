import { React } from "react";
import axios from "axios";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import allTypeData from "../../data/typeData/allTypeData.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";

export async function getTypeData(
  curType,
  setTypePokemon,
  setTypePokemonLength,
  setTypePokemonNames,
  setTypeMoves
) {
  console.log("Getting Type Data");
  if (curType === "") {
    return "";
  }
  try {
    let typeURL = allTypeData[curType].URL;

    const response = await axios.get(typeURL, {
      responseType: "json",
    });

    let cur = [];
    let names = [];
    let indexes = [];

    // pokemon
    for (let i = 0; i < response.data.pokemon.length; i++) {
      let currentPokemonForType = response.data.pokemon[i].pokemon.name;

      if (Object.keys(allPokemonSprites).includes(currentPokemonForType)) {
        if (allPokemonSprites[currentPokemonForType].FrontDefault !== null) {
          // could add "allPokemonSprites[currentPokemonForType].FrontShiny !== null;" to make sure shiny has sprite too
          cur.push(currentPokemonForType);
        } else {
          cur.push(allPokemonSprites[currentPokemonForType].EntryMainName);
        }
        names.push(currentPokemonForType);
      } else {
        console.log("Type: Cannot Find Pokemon for", currentPokemonForType);
      }
    }

    for (let i = 0; i < names.length; i++) {
      indexes.push(i);
    }
    setTypePokemon(cur);
    setTypePokemonNames(names);
    setTypePokemonLength(indexes);

    cur = [];

    // moves
    for (let i = 0; i < response.data.moves.length; i++) {
      let currentMoveForType = response.data.moves[i].name;

      if (Object.keys(moveAPIToDisplay).includes(currentMoveForType)) {
        cur.push(currentMoveForType);
      } else {
        console.log("Type: Cannot Find Move for", currentMoveForType);
      }
    }

    setTypeMoves(cur);
  } catch (error) {
    console.log("Error");
  }
}
