import { React, useState, useMemo } from "react";
import axios from "axios";
import allMoveData from "../data/moveData/allMoveData.json";
import allPokemonEvolutions from "../data/pokemonData/allPokemonEvolutions.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import allSpecialPokemonForms from "../data/pokemonData/allSpecialPokemonForms.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import allDamageClassLogos from "../data/moveData/allDamageClassLogos.json";
import abilitiesAPIToDisplay from "../data/abilitiesData/abilitiesAPIToDisplay.json";
import statsAPIToDisplayShort from "../data/statsData/statsAPIToDisplayShort.json";
import moveTargetAPIToDisplay from "../data/moveTargetData/moveTargetAPIToDisplay.json";
import pokemonGameLocations from "../data/locationData/pokemonGameLocations.json";
import encounterConditionsAPIToDisplay from "../data/encounterConditionData/encounterConditionsAPIToDisplay.json";
import encounterMethodsAPIToDisplay from "../data/encounterMethodData/encounterMethodsAPIToDisplay.json";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import locationNamesAPIToDisplay from "../data/locationData/locationNamesAPIToDisplay.json";
import EntryHome from "../PageFunctions/EntryData/EntryHome.tsx";
import nationalPokedexNames from "../data/pokemonData/nationalPokedexNames.json";
import "../PageStyle/MovesPokemon.css";
import "../PageStyle/EntryEncounters.css";
import "../PageStyle/Entry.css";
import "../PageStyle/MoveColors.css";
import gamesMascots from "../data/gameNameData/gamesMascots.json";
import { getEntryFormData } from "../PageFunctions/EntryData/getEntryFormData.tsx";
import { getEntryMoveData } from "../PageFunctions/EntryData/getEntryMoveData.tsx";
import { getEntryEvolutionData } from "../PageFunctions/EntryData/getEntryEvolutionData.tsx";
import { getEntryLocationData } from "../PageFunctions/EntryData/getEntryLocationData.tsx";
import { getEntryData } from "../PageFunctions/EntryData/getEntryData.tsx";
import { showEntryData } from "../PageFunctions/EntryData/showEntryData.tsx";

function Entry({
  curPokemon,
  clickPokemon,
  clickLocation,
  clickMove,
  clickType,
  clickGame,
  shinyMode,
}) {
  const [entryInfo, setEntryInfo] = useState([]);
  const [evolutionLine, setEvolutionLine] = useState([]);
  const [differentForms, setDifferentForms] = useState([]);
  const [forms, setForms] = useState(false);
  const [gameLocations, setGameLocations] = useState([]);
  console.log(curPokemon);

  async function fetchEntryData(pokemon) {
    if (pokemon === "") {
      return;
    }
    try {
      setEntryInfo(
        await getEntryData(pokemon, shinyMode, clickMove, clickType)
      );
      setForms(false);

      setDifferentForms([]);

      if (Object.keys(allSpecialPokemonForms).includes(pokemon)) {
        setDifferentForms(
          getEntryFormData(pokemon.toLowerCase(), setForms, shinyMode)
        );
      }

      // evolve
      setEvolutionLine(getEntryEvolutionData(pokemon, shinyMode, clickPokemon));

      setGameLocations(
        getEntryLocationData(
          pokemon,
          shinyMode,
          clickGame,
          clickLocation,
          clickPokemon
        )
      );
    } catch (error) {
      console.log("Error");
    }
  }

  const reRending = useMemo(
    () => fetchEntryData(curPokemon),
    [curPokemon, shinyMode]
  );

  return (
    <div>
      {curPokemon === "" ? (
        <EntryHome
          clickPokemon={clickPokemon}
          clickType={clickType}
          shinyMode={shinyMode}
        />
      ) : (
        <>
          {entryInfo.length > 0 ? (
            <div>
              {showEntryData(
                entryInfo,
                curPokemon,
                clickType,
                forms,
                differentForms,
                evolutionLine,
                gameLocations
              )}
            </div>
          ) : (
            <h2>Error Entry</h2>
          )}
        </>
      )}
    </div>
  );
}

export default Entry;
