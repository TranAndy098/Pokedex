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

export function showEntryData(
  entryInfo,
  curPokemon,
  clickType,
  forms,
  differentForms,
  evolutionLine,
  gameLocations
) {
  console.log("Showing Pokemon Entry Data");
  return (
    <div>
      <div className="entry-data">
        <div className="entry-header">
          <div className="entry-header-front">
            <img className="entry-front-sprite" src={entryInfo[0][0]} />
          </div>

          <div className="entry-header-box">
            <div className="entry-name-types">
              <div className="entry-name">
                <div>{pokemonAPIToDisplay[curPokemon]}</div>
              </div>
              <div className="entry-types">
                {entryInfo[1].map((name) => (
                  <img
                    className="entry-type"
                    onClick={() => clickType(name)}
                    src={allTypeLogos[name].TypeTextLogo}
                  />
                ))}
              </div>
            </div>

            <div className="entry-box-bottom">
              <img className="entry-back-sprite" src={entryInfo[0][1]} />

              <div className="entry-abilities">
                <div className="entry-ability">
                  <div className="entry-ability-title">Abilities</div>
                  <div className="entry-ability-data">
                    {entryInfo[2].map((name) => (
                      <div className="entry-ability-entry">
                        {abilitiesAPIToDisplay[name]}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="entry-hidden-ability">
                  <div className="entry-hidden-ability-title">
                    Hidden Abilities
                  </div>{" "}
                  {entryInfo[3].map((name) => (
                    <div className="entry-hidden-ability-data">
                      {abilitiesAPIToDisplay[name]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="entry-stats">
                <div className="entry-stat-title">Stats</div>

                <div className="entry-stat-data">
                  {entryInfo[4].map((name) => name)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="entry-body">
          {forms ? (
            <div className="entry-forms">
              <div className="entry-forms-title">Forms</div>
              <div className="entry-forms-data">
                {differentForms.map((differentForm) => {
                  return <div>{differentForm}</div>;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="entry-footer">
          {evolutionLine.map((evolveLine) => {
            return (
              <div className="entry-evolutions">
                <div className="entry-evolutions-title">Evolutions</div>
                <div className="entry-evolutions-data">
                  {evolveLine.map((member) => {
                    return <div>{member}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="entry-moves">
          <h2>Moves</h2>
          <div className="move-pokemon-container">
            {entryInfo[5].map((name) => (
              <div>{name}</div>
            ))}
          </div>
        </div>

        <div className="entry-locations">
          {gameLocations.length > 0 ? (
            <div className="locations">
              <h2>Locations</h2>
              <div className="locations-pokemon-container">
                {gameLocations.map((data) => data)}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
