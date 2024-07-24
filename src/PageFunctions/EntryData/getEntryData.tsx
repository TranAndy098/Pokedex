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
import { getEntryFormData } from "./getEntryFormData.tsx";
import { getEntryMoveData } from "./getEntryMoveData.tsx";
import { getEntryEvolutionData } from "./getEntryEvolutionData.tsx";
import { getEntryLocationData } from "./getEntryLocationData.tsx";

export async function getEntryData(pokemon, shinyMode, clickMove, clickType) {
  console.log("Getting Pokemon Entry Data");
  try {
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
        <div className="entry-stat-entry">
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
