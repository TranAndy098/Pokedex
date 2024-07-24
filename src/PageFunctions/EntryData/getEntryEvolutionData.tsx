import { React, useState, useMemo } from "react";
import axios from "axios";
import allMoveData from "../../data/moveData/allMoveData.json";
import allPokemonEvolutions from "../../data/pokemonData/allPokemonEvolutions.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import allSpecialPokemonForms from "../../data/pokemonData/allSpecialPokemonForms.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import typeAPIToDisplay from "../../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import abilitiesAPIToDisplay from "../../data/abilitiesData/abilitiesAPIToDisplay.json";
import statsAPIToDisplayShort from "../../data/statsData/statsAPIToDisplayShort.json";
import moveTargetAPIToDisplay from "../../data/moveTargetData/moveTargetAPIToDisplay.json";
import pokemonGameLocations from "../../data/locationData/pokemonGameLocations.json";
import encounterConditionsAPIToDisplay from "../../data/encounterConditionData/encounterConditionsAPIToDisplay.json";
import encounterMethodsAPIToDisplay from "../../data/encounterMethodData/encounterMethodsAPIToDisplay.json";
import gamesAPIToDisplay from "../../data/gameNameData/gamesAPIToDisplay.json";
import locationNamesAPIToDisplay from "../../data/locationData/locationNamesAPIToDisplay.json";
import EntryHome from "./EntryHome.tsx";
import nationalPokedexNames from "../../data/pokemonData/nationalPokedexNames.json";
import "../../PageStyle/MovesPokemon.css";
import "../../PageStyle/EntryEncounters.css";
import "../../PageStyle/Entry.css";
import "../../PageStyle/MoveColors.css";
import gamesMascots from "../../data/gameNameData/gamesMascots.json";

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
