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

export function getEntryLocationData(
  pokemon,
  shinyMode,
  clickGame,
  clickLocation,
  clickPokemon
) {
  console.log("Getting Pokemon Location Data");
  // evolve

  let mid = [];

  let allLocations = pokemonGameLocations[pokemon];
  if (!Object.keys(pokemonGameLocations).includes(pokemon)) {
    return;
  }

  let games = Object.keys(allLocations);
  let areas = [];

  for (let i = 0; i < games.length; i++) {
    mid.push(
      <div>
        {Object.keys(allLocations[games[i]]).map((area) => (
          <div>
            {area !== "evolutions" ? (
              <div>
                {Object.keys(allLocations[games[i]][area]).map((method) => (
                  <div className="entry-encounter-container">
                    <div
                      className="entry-encounter-game"
                      onClick={() => clickGame(games[i])}
                    >
                      <div className="entry-encounter-game-title">
                        {gamesAPIToDisplay[games[i]]}
                      </div>
                      <img
                        className="entry-encounter-game-mascot"
                        src={
                          shinyMode
                            ? allPokemonSprites[gamesMascots[games[i]]]
                                .FrontShiny
                            : allPokemonSprites[gamesMascots[games[i]]]
                                .FrontDefault
                        }
                      />
                    </div>
                    <div className="entry-encounter-box">
                      <div className="entry-encounter-header">
                        <div
                          className="entry-encounter-area"
                          onClick={() => clickLocation(area)}
                        >
                          {locationNamesAPIToDisplay[area]}
                        </div>
                        <div className="entry-encounter-method">
                          <div className="entry-encounter-method-title">
                            Method
                          </div>
                          <div className="entry-encounter-method-data">
                            {encounterMethodsAPIToDisplay[method]}
                          </div>
                        </div>
                      </div>

                      <div className="entry-encounter-body">
                        <div className="entry-encounter-chance">
                          <div className="entry-encounter-chance-title">
                            {" "}
                            Chance
                          </div>
                          <div className="entry-encounter-chance-data">
                            {allLocations[games[i]][area][method].Chance}
                          </div>
                        </div>
                        <div className="entry-encounter-min">
                          <div className="entry-encounter-min-title">
                            {" "}
                            MinLevel
                          </div>
                          <div className="entry-encounter-min-data">
                            {allLocations[games[i]][area][method].MinLevel}
                          </div>
                        </div>

                        <div className="entry-encounter-max">
                          <div className="entry-encounter-max-title">
                            {" "}
                            MaxLevel
                          </div>
                          <div className="entry-encounter-max-data">
                            {allLocations[games[i]][area][method].MaxLevel}
                          </div>
                        </div>
                      </div>

                      {allLocations[games[i]][area][method].Conditions.length >
                      0 ? (
                        <div className="entry-encounter-footer">
                          <div className="entry-encounter-footer-title">
                            Conditions
                          </div>
                          <div className="entry-encounter-footer-items">
                            {allLocations[games[i]][area][
                              method
                            ].Conditions.map((condition) => (
                              <div className="entry-encounter-footer-item">
                                {encounterConditionsAPIToDisplay[condition]}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="entry-encounter-container">
                <div
                  className="entry-encounter-game"
                  onClick={() => clickGame(games[i])}
                >
                  <div className="entry-encounter-game-title">
                    {gamesAPIToDisplay[games[i]]}
                  </div>
                  <img
                    className="entry-encounter-game-mascot"
                    src={
                      shinyMode
                        ? allPokemonSprites[gamesMascots[games[i]]].FrontShiny
                        : allPokemonSprites[gamesMascots[games[i]]].FrontDefault
                    }
                  />
                </div>

                <div
                  className="entry-encounter-box"
                  onClick={() => clickPokemon(allLocations[games[i]][area])}
                >
                  <div className="entry-encounter-header">
                    Evolve from{" "}
                    {pokemonAPIToDisplay[allLocations[games[i]][area]]}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );

    areas = Object.keys(allLocations[games[i]]);
  }
  return mid;
}
