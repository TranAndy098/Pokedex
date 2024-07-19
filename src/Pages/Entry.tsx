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
import EntryHome from "./EntryHome.tsx";
import nationalPokedexNames from "../data/pokemonData/nationalPokedexNames.json";
import "../PageStyle/MovesPokemon.css";
import "../PageStyle/EntryEncounters.css";
import "../PageStyle/Entry.css";

function Entry({
  curPokemon,
  clickPokemon,
  clickLocation,
  clickMove,
  clickType,
  clickGame,
  shinyMode,
}) {
  const [value, setValue] = useState([]);
  const [evolutionLine, setEvolutionLine] = useState([]);
  const [differentForms, setDifferentForms] = useState([]);
  const [forms, setForms] = useState(false);
  const [gameLocations, setGameLocations] = useState([]);
  console.log(curPokemon);

  function fetchMoveData(APImove) {
    return (
      <div className="move-pokemon-entry-box">
        <div className="move-pokemon-display">
          <div className="move-pokemon-display-header">
            <div
              className="move-pokemon-display-name move-pokemon-display-header-item"
              onClick={() => clickMove(APImove)}
            >
              <div>{moveAPIToDisplay[APImove]}</div>
            </div>
            <div className="move-pokemon-display-damage-class move-pokemon-display-header-item">
              <img
                className="move-pokemon-display-damage-class-logo"
                src={
                  allDamageClassLogos[allMoveData[APImove]["Damage Class"]]
                    .TypeLogoBDSP
                }
              />
            </div>
          </div>
          <div className="move-pokemon-display-footer">
            <div className="move-display-typing move-display-footer-item">
              <img
                className="move-pokemon-display-types"
                src={allTypeLogos[allMoveData[APImove].Type].TypeTextLogo}
                onClick={() => clickType(allMoveData[APImove].Type)}
              />
            </div>

            <div className="move-pokemon-display-pp move-pokemon-display-footer-item">
              <div className="move-pokemon-display-footer-subitem move-pokemon-display-font">
                PP
              </div>
              <div className="move-pokemon-display-footer-subitem move-pokemon-display-font">
                {allMoveData[APImove].PP}/{allMoveData[APImove].PP}
              </div>
            </div>
          </div>
        </div>
        <div className="move-pokemon-entry">
          <div className="move-pokemon-header">
            <div
              className="move-pokemon-name move-pokemon-header-item"
              onClick={() => clickMove(APImove)}
            >
              <div>{moveAPIToDisplay[APImove]}</div>
            </div>

            <div className="move-pokemon-typing move-pokemon-header-item">
              <img
                className="move-pokemon-types"
                src={allTypeLogos[allMoveData[APImove].Type].TypeTextLogo}
                onClick={() => clickType(allMoveData[APImove].Type)}
              />
            </div>

            <div className="move-pokemon-pp move-pokemon-header-item">
              <div className="move-pokemon-header-subitem move-pokemon-font-title">
                PP
              </div>
              <div className="move-pokemon-header-subitem move-pokemon-font-text">
                {allMoveData[APImove].PP}
              </div>
            </div>

            <div className="move-pokemon-power move-pokemon-header-item">
              <div className="move-pokemon-header-subitem move-pokemon-font-title">
                Power
              </div>
              <div className="move-pokemon-header-subitem move-pokemon-font-text">
                {allMoveData[APImove].Power}
              </div>
            </div>

            <div className="move-pokemon-accuracy move-pokemon-header-item">
              <div className="move-pokemon-header-subitem move-pokemon-font-title">
                Accuracy
              </div>
              <div className="move-pokemon-header-subitem move-pokemon-font-text">
                {allMoveData[APImove].Accuracy}
              </div>
            </div>

            <div className="move-pokemon-damage-class move-pokemon-header-item">
              <img
                className="move-pokemon-damage-class-logo"
                src={
                  allDamageClassLogos[allMoveData[APImove]["Damage Class"]]
                    .TypeLogoBDSP
                }
              />
            </div>
          </div>

          <div className="move-pokemon-footer">
            <div className="move-pokemon-effects move-pokemon-footer-item">
              <div className="move-pokemon-footer-subitem move-pokemon-font-title">
                Effects
              </div>
              <div className="move-pokemon-footer-subitem move-pokemon-font-text">
                {allMoveData[APImove].Effects}
              </div>
            </div>

            <div className="move-pokemon-effect-chance move-pokemon-footer-item">
              <div className="move-pokemon-footer-subitem  move-pokemon-font-title">
                Effect Chance
              </div>
              <div className="move-pokemon-footer-subitem move-pokemon-font-text">
                {allMoveData[APImove]["Effect Chance"]}
              </div>
            </div>

            <div className="move-pokemon-target move-pokemon-footer-item">
              <div className="move-pokemon-footer-subitem move-pokemon-font-title">
                Target
              </div>
              <div className="move-pokemon-footer-subitem move-pokemon-font-text">
                {moveTargetAPIToDisplay[allMoveData[APImove].Target]}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function fetchFormData(pokemon) {
    setForms(true);
    // evolve

    let mid = [];

    let allForms = allSpecialPokemonForms[pokemon];

    for (let i = 0; i < allForms.length; i++) {
      let name = Object.keys(allForms[i]);
      mid.push(
        <div className="pokemon-form">
          <div className="pokemon-form-name">
            {allForms[i][name].DisplayName}
          </div>
          <img
            className="pokemon-form-sprite"
            src={
              shinyMode
                ? allForms[i][name].FrontShiny
                : allForms[i][name].FrontDefault
            }
          />
        </div>
      );
    }

    setDifferentForms(mid);
  }

  function fetchLocationData(pokemon) {
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
                        {gamesAPIToDisplay[games[i]]}
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
                          <div className="entry-encounter-body-item">
                            <div className="entry-encounter-min">
                              <div className="entry-encounter-min-title">
                                {" "}
                                MinLevel
                              </div>
                              <div className="entry-encounter-min-data">
                                {allLocations[games[i]][area][method].MinLevel}
                              </div>
                            </div>
                          </div>

                          <div className="entry-encounter-body-item">
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
                          <div className="entry-encounter-body-item">
                            <div className="entry-encounter-chance">
                              <div className="entry-encounter-chance-title">
                                {" "}
                                Chance
                              </div>
                              <div className="entry-encounter-chance-data">
                                {allLocations[games[i]][area][method].Chance}
                              </div>
                            </div>
                          </div>
                        </div>

                        {allLocations[games[i]][area][method].Conditions
                          .length > 0 ? (
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
                    {gamesAPIToDisplay[games[i]]}
                  </div>
                  <div
                    className="entry-encounter-box"
                    onClick={() => clickPokemon(allLocations[games[i]][area])}
                  >
                    Evolve from{" "}
                    {pokemonAPIToDisplay[allLocations[games[i]][area]]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      );

      areas = Object.keys(allLocations[games[i]]);
    }
    setGameLocations(mid);
  }

  function fetchEvolutionLine(curPokemon) {
    // evolve
    let mid = [];
    let chains = allPokemonEvolutions[curPokemon].EvolveChain;

    for (let i = 0; i < allPokemonEvolutions[curPokemon].Size; i++) {
      let interm = [];
      for (let j = 0; j < chains[i].length; j++) {
        interm.push(
          <div className="pokemon-evolution">
            <div className="pokemon-evolution-name">
              {pokemonAPIToDisplay[chains[i][j]]}
            </div>

            <img
              className="pokemon-evolution-sprite"
              src={
                shinyMode
                  ? allPokemonSprites[chains[i][j]].FrontShiny
                  : allPokemonSprites[chains[i][j]].FrontDefault
              }
              onClick={() => clickPokemon(chains[i][j])}
            />
          </div>
        );
      }
      mid.push(interm);
    }

    setEvolutionLine(mid);
  }

  async function fetchData(pokemon) {
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
        cur.push(fetchMoveData(response.data.moves[i].move.name));
      }

      overall.push([...cur]);

      setValue(overall);
      setForms(false);
      setDifferentForms([]);

      console.log(9);

      if (Object.keys(allSpecialPokemonForms).includes(curPokemon)) {
        fetchFormData(curPokemon.toLowerCase());
      }

      // evolve
      fetchEvolutionLine(curPokemon);
      fetchLocationData(curPokemon);

      return overall;
    } catch (error) {
      setValue([]);
      return ["Error"];
    }
  }

  const reRending = useMemo(
    () => fetchData(curPokemon),
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
          <div>
            <h1>
              {Object.keys(nationalPokedexNames).includes(curPokemon)
                ? nationalPokedexNames[curPokemon]
                : pokemonAPIToDisplay[curPokemon]}
              's Entry Page
            </h1>
          </div>

          {value.length > 0 ? (
            <div className="entry-data">
              <div className="entry-header">
                <div className="entry-header-front">
                  <img className="entry-front-sprite" src={value[0][0]} />
                </div>

                <div className="entry-header-box">
                  <div className="entry-name-types">
                    <div className="entry-name">
                      <div>{pokemonAPIToDisplay[curPokemon]}</div>
                    </div>
                    <div className="entry-types">
                      {value[1].map((name) => (
                        <img
                          className="entry-type"
                          onClick={() => clickType(name)}
                          src={allTypeLogos[name].TypeTextLogo}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="entry-box-bottom">
                    <img className="entry-back-sprite" src={value[0][1]} />

                    <div className="entry-abilities">
                      <div className="entry-ability">
                        <div className="entry-ability-title">Abilities</div>
                        <div className="entry-ability-data">
                          {value[2].map((name) => (
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
                        {value[3].map((name) => (
                          <div className="entry-hidden-ability-data">
                            {abilitiesAPIToDisplay[name]}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="entry-stats">
                      <div className="entry-stat-title">Stats</div>

                      <div className="entry-stat-data">
                        {value[4].map((name) => name)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="entry-body">
                {forms ? (
                  <div className="forms">
                    <div className="entry-forms">
                      <div className="entry-forms-title">Forms</div>
                      <div className="entry-forms-data">
                        {differentForms.map((differentForm) => {
                          return <div>{differentForm}</div>;
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="entry-footer">
                <div className="evolutions">
                  {evolutionLine.map((evolveLine) => {
                    return (
                      <div className="entry-evolutions">
                        <div className="entry-evolutions-title">Evolution</div>
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

              <div className="entry-moves">
                <div className="moves">
                  <h2>Moves</h2>
                  <div className="move-pokemon-container">
                    {value[5].map((name) => (
                      <div>{name}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="entry-locations">
                <div className="locations">
                  <h2>Locations</h2>

                  {gameLocations.map((data) => data)}
                </div>
              </div>
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
