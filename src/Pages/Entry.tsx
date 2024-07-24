import { React, useState, useMemo } from "react";
import EntryHome from "../PageFunctions/EntryData/EntryHome.tsx";
import { getEntryFormData } from "../PageFunctions/EntryData/getEntryFormData.tsx";
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
