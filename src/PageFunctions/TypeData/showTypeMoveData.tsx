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

export function showTypeMoveData(curType, typeMoves, clickMove, clickType) {
  console.log("Showing Type Move Data");
  if (curType === "") {
    return "";
  }
  return (
    <div>
      <div className="types-moves">
        <h1>Moves</h1>
        <div className="move-type-container">
          {typeMoves.map((moves) => (
            <div className={`move-type-display ${allMoveData[moves].Type}`}>
              <div className="move-type-display-header">
                <div
                  className="move-type-display-name move-type-display-header-item"
                  onClick={() => clickMove(moves)}
                >
                  <div>{moveAPIToDisplay[moves]}</div>
                </div>
                <div className="move-type-display-damage-class move-type-display-header-item">
                  <img
                    className="move-type-display-damage-class-logo"
                    src={
                      allDamageClassLogos[allMoveData[moves]["Damage Class"]]
                        .TypeLogoBDSP
                    }
                  />
                </div>
              </div>
              <div className="move-type-display-footer">
                <div className="move-type-display-typing move-type-display-footer-item">
                  <img
                    className="move-type-display-types"
                    src={allTypeLogos[allMoveData[moves].Type].TypeTextLogo}
                    onClick={() => clickType(allMoveData[moves].Type)}
                  />
                </div>

                <div className="move-type-display-pp move-type-display-footer-item">
                  <div className="move-type-display-footer-subitem move-type-display-font">
                    PP
                  </div>
                  <div className="move-type-display-footer-subitem move-type-display-font">
                    {allMoveData[moves].PP}/{allMoveData[moves].PP}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
