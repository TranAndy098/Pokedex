import { React } from "react";
import pokemonPerLocation from "../../data/locationData/pokemonPerLocation.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import encounterConditionsAPIToDisplay from "../../data/encounterConditionData/encounterConditionsAPIToDisplay.json";
import encounterMethodsAPIToDisplay from "../../data/encounterMethodData/encounterMethodsAPIToDisplay.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import "../../PageStyle/LocationEncounters.css";
import "../../PageStyle/LocationMenu.css";

export function getLocationData(
  curLocation,
  clickPokemon,
  clickType,
  shinyMode
) {
  console.log("Getting Location Data");
  if (curLocation === "") {
    return;
  }
  let mid = [];

  let pokemons = Object.keys(pokemonPerLocation[curLocation]);

  for (let i = 0; i < pokemons.length; i++) {
    let methods = Object.keys(pokemonPerLocation[curLocation][pokemons[i]]);

    if (Object.keys(allPokemonSprites).includes(pokemons[i])) {
      if (allPokemonSprites[pokemons[i]].FrontDefault === null) {
        pokemons[i] = allPokemonSprites[pokemons[i]].EntryMainName;
      }

      for (let j = 0; j < methods.length; j++) {
        mid.push(
          <div className="encounter-box">
            <div className="encounter-header">
              <div className="encounter-header-name-type">
                <div
                  className="encounter-name"
                  onClick={() => clickPokemon(pokemons[i])}
                >
                  {" "}
                  {pokemonAPIToDisplay[pokemons[i]]}{" "}
                </div>
                <div className="encounter-typings">
                  {" "}
                  {Object.keys(pokemonTypingChart).includes(pokemons[i]) ? (
                    pokemonTypingChart[pokemons[i]].map((typing) => (
                      <img
                        className="encounter-type"
                        src={allTypeLogos[typing].TypeTextLogo}
                        onClick={() => clickType(typing)}
                      ></img>
                    ))
                  ) : (
                    <></>
                  )}{" "}
                </div>
              </div>

              <div className="encounter-header-sprite">
                <img
                  className="encounter-sprite"
                  src={
                    shinyMode
                      ? allPokemonSprites[pokemons[i]].FrontShiny
                      : allPokemonSprites[pokemons[i]].FrontDefault
                  }
                  onClick={() => clickPokemon(pokemons[i])}
                />
              </div>

              <div className="encounter-header-method">
                <div className="encounter-method-title">Method</div>
                <div className="encounter-method-data">
                  {encounterMethodsAPIToDisplay[methods[j]]}
                </div>
              </div>

              <div className="encounter-header-level-chance">
                <div className="encounter-header-level">
                  <div className="encounter-min">
                    <div className="encounter-header-subitem-title">
                      MinLevel
                    </div>
                    <div className="encounter-header-subitem-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .MinLevel
                      }
                    </div>
                  </div>
                  <div className="encounter-max">
                    <div className="encounter-header-subitem-title">
                      MaxLevel
                    </div>
                    <div className="encounter-header-subitem-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .MaxLevel
                      }
                    </div>
                  </div>
                </div>
                <div className="encounter-header-chance">
                  <div className="encounter-chance">
                    <div className="encounter-chance-title">Chance</div>
                    <div className="encounter-chance-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .Chance
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="encounter-footer">
              {pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                .Conditions.length > 0 ? (
                <div className="encounter-footer-item">
                  <div className="encounter-footer-item-title">Conditions</div>
                  <div className="encounter-condtion-box">
                    {pokemonPerLocation[curLocation][pokemons[i]][
                      methods[j]
                    ].Conditions.map((condition) => (
                      <div className="encounter-footer-subitem">
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
        );
      }
    } else {
      console.log("Location: Cannot Find Sprite for", pokemons[i]);
    }
  }
  return mid;
}
