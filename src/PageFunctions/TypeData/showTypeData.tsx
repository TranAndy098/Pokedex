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

export function showTypeData(curType, clickType) {
  console.log("Showing Type Data");
  if (curType === "") {
    return "";
  }
  return (
    <div>
      <div className="effective-container">
        <div className="effective-item">
          <div className="effective-title">Effectiveness To</div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">2x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].StrongTo.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].NormalTo.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1/2x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].WeakTo.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">0x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].ImmuneTo.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="effective-container">
        <div className="effective-item">
          <div className="effective-title">Effectiveness From</div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">2x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].StrongFrom.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].NormalFrom.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1/2x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].WeakFrom.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">0x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].ImmuneFrom.map((typing) => (
              <img
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
