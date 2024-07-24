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

export function getEntryMoveData(APImove, clickMove, clickType) {
  console.log("Getting Pokemon Move Data");
  return (
    <div className={`move-pokemon-entry-box ${allMoveData[APImove].Type}`}>
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
              PP {allMoveData[APImove].PP}/{allMoveData[APImove].PP}
            </div>
          </div>
        </div>
      </div>
      <div className={`move-pokemon-entry ${allMoveData[APImove].Type}`}>
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
