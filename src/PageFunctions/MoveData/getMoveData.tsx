import { React, useState, useMemo } from "react";
import axios from "axios";
import MoveSearchBar from "../../MoveSearchBar/MoveSearchBar";
import allMoveData from "../../data/moveData/allMoveData.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import moveTargetAPIToDisplay from "../../data/moveTargetData/moveTargetAPIToDisplay.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import "../../PageStyle/Moves.css";
import "../../PageStyle/MoveColors.css";

export async function getMoveData(
  curMove,
  setMovePokemon,
  setMovePokemonNames,
  setMovePokemonLength
) {
  console.log("Getting Move Data");
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

    return cur;
  } catch (error) {
    console.log("Error");
  }
}
