import { React, useState, useMemo } from "react";
import EntryHome from "../PageFunctions/EntryData/EntryHome.tsx";
import { getEntryFormData } from "../PageFunctions/EntryData/getEntryFormData.tsx";
import { getEntryEvolutionData } from "../PageFunctions/EntryData/getEntryEvolutionData.tsx";
import { getEntryLocationData } from "../PageFunctions/EntryData/getEntryLocationData.tsx";
import { getEntryData } from "../PageFunctions/EntryData/getEntryData.tsx";
import { showEntryData } from "../PageFunctions/EntryData/showEntryData.tsx";
import nationalPokedexNames from "../data/pokemonData/nationalPokedexNames.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import { useParams } from "react-router";

function Entry({
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

  const { curPokemon } = useParams();

  async function fetchEntryData(pokemon) {
    if (
      pokemon === "home" ||
      !Object.keys(nationalPokedexNames).includes(pokemon)
    ) {
      return;
    }

    try {
      setEntryInfo(
        await getEntryData(pokemon, shinyMode, clickMove, clickType)
      );
      setForms(false);

      setDifferentForms([]);

      setDifferentForms(
        getEntryFormData(pokemon.toLowerCase(), setForms, shinyMode)
      );
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
      console.log(`Showing ${pokemonAPIToDisplay[pokemon]}`);
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
      {curPokemon === "home" ? (
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
            <div>
              {!Object.keys(nationalPokedexNames).includes(curPokemon) ? (
                <h2>Entry Not Valid</h2>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Entry;
