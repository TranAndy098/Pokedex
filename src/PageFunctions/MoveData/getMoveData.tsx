import { useState } from "react";
import axios from "axios";
import allMoveData from "../../data/moveData/allMoveData.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import nationalPokedexNames from "../../data/pokemonData/nationalPokedexNames.json";

export async function getMoveData(
  curMove: string,
  setMovePokemon: typeof useState,
  setMovePokemonEndpoint: typeof useState,
  setMovePokemonNames: typeof useState,
  setMovePokemonLength: typeof useState
) {
  console.log(`Getting ${moveAPIToDisplay[curMove]} Data`);
  if (curMove === "") {
    return "";
  }
  try {
    let moveURL = allMoveData[curMove].URL;

    const response = await axios.get(moveURL, {
      responseType: "json",
    });

    let cur = [];
    let names = [];
    let endpoints = [];
    let indexes = [];

    // learned by pokemon
    for (let i = 0; i < response.data.learned_by_pokemon.length; i++) {
      let currentPokemonForMove = response.data.learned_by_pokemon[i].name;

      if (Object.keys(allPokemonSprites).includes(currentPokemonForMove)) {
        if (
          allPokemonSprites[currentPokemonForMove].FrontDefault !== null &&
          allPokemonSprites[currentPokemonForMove].FrontShiny !== null
        ) {
          cur.push(currentPokemonForMove);
        } else {
          cur.push(allPokemonSprites[currentPokemonForMove].EntryMainName);
        }
        names.push(currentPokemonForMove);
        if (Object.keys(nationalPokedexNames).includes(currentPokemonForMove)) {
          endpoints.push(currentPokemonForMove);
        } else {
          endpoints.push(
            allPokemonSprites[currentPokemonForMove].EntryMainName
          );
        }
      } else {
        console.log("Move: Cannot Find Sprite for", currentPokemonForMove);
      }
    }

    for (let i = 0; i < names.length; i++) {
      indexes.push(i);
    }

    setMovePokemon(cur);
    setMovePokemonNames(names);
    setMovePokemonLength(indexes);
    setMovePokemonEndpoint(endpoints);

    return cur;
  } catch (error) {
    console.log("Error");
  }
}
