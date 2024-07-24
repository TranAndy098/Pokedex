import { React, useState, useMemo } from "react";
import axios from "axios";
import DropDown from "../../DropDown/DropDown/DropDown";
import DropDownItem from "../../DropDown/DropDownItem/DropDownItem";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import allTypes from "../../data/typeData/allTypes.json";
import allTypeData from "../../data/typeData/allTypeData.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import typeAPIToDisplay from "../../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import "../../PageStyle/MovesForTypes.css";
import allMoveData from "../../data/moveData/allMoveData.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import "../../PageStyle/Types.css";
import "../../PageStyle/MoveColors.css";

export function showTypePokemonData(
  curType,
  shinyMode,
  clickPokemon,
  clickType,
  typePokemon,
  typePokemonNames,
  typePokemonLength
) {
  console.log("Showing Type Pokemon Data");
  if (curType === "") {
    return "";
  }
  return (
    <div>
      <div className="types-pokemon">
        <h1>Pokemon</h1>
        <div className="pokedex-container">
          {typePokemonLength.map((mon_num) => (
            <div className="pokedex-entry-box">
              <div className="pokedex-display">
                <img
                  className="pokedex-sprite-display"
                  src={
                    shinyMode
                      ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
                      : allPokemonSprites[typePokemon[mon_num]].FrontDefault
                  }
                  onClick={() => clickPokemon(typePokemon[mon_num])}
                />
              </div>
              <div className="pokedex-entry">
                <div className="pokedex-header">
                  <h2
                    className="pokedex-name pokedex-header-item"
                    onClick={() => clickPokemon(typePokemon[mon_num])}
                  >
                    {pokemonAPIToDisplay[typePokemonNames[mon_num]]}
                  </h2>
                </div>
                <div className="pokedex-body">
                  <img
                    className="pokedex-sprite"
                    src={
                      shinyMode
                        ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
                        : allPokemonSprites[typePokemon[mon_num]].FrontDefault
                    }
                    onClick={() => clickPokemon(typePokemon[mon_num])}
                  />
                </div>
                <div className="pokedex-footer">
                  {Object.keys(pokemonTypingChart).includes(
                    typePokemon[mon_num]
                  ) ? (
                    pokemonTypingChart[typePokemonNames[mon_num]].map(
                      (mon_type) => (
                        <img
                          className="pokedex-type"
                          src={allTypeLogos[mon_type].TypeTextLogo}
                          onClick={() => clickType(mon_type)}
                        />
                      )
                    )
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
