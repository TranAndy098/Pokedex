import { React, useState, useMemo } from "react";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import "../PageStyle/MovesForTypes.css";
import "../PageStyle/Types.css";
import "../PageStyle/MoveColors.css";
import { getTypeData } from "../PageFunctions/TypeData/getTypeData";
import { showTypeData } from "../PageFunctions/TypeData/showTypeData";
import { showTypePokemonData } from "../PageFunctions/TypeData/showTypePokemonData";
import { showTypeMoveData } from "../PageFunctions/TypeData/showTypeMoveData";

function Types({
  curType,
  setType,
  openType,
  setOpenType,
  curDropType,
  clickPokemon,
  clickMove,
  clickType,
  shinyMode,
  setScratch,
}) {
  console.log(curType);

  setType(curType.toLowerCase());
  const [typePokemonNames, setTypePokemonNames] = useState([]);
  const [typePokemon, setTypePokemon] = useState([]);
  const [typePokemonLength, setTypePokemonLength] = useState([]);
  const [typeMoves, setTypeMoves] = useState([]);

  async function fetchData(curType) {
    if (curType === "") {
      return "";
    }
    try {
      await getTypeData(
        curType,
        setTypePokemon,
        setTypePokemonLength,
        setTypePokemonNames,
        setTypeMoves
      );
    } catch (error) {
      console.log("Error");
    }
  }

  const reRending = useMemo(() => fetchData(curType), [curType, shinyMode]);

  return (
    <div>
      <div className="type-menu">
        <div className="type-dropdown">
          <DropDown
            buttonText={`${
              curType === "" ? "Type" : typeAPIToDisplay[curType]
            }`}
            open={openType}
            setOpen={setOpenType}
            content={
              <>
                {Object.keys(typeAPIToDisplay).map((typing) => (
                  <DropDownItem
                    content={typeAPIToDisplay[typing]}
                    check={curDropType}
                    setMode1={setType}
                    setMode2={setScratch}
                    setOpen={setOpenType}
                  ></DropDownItem>
                ))}
              </>
            }
          />
        </div>

        <h1 className="type-name">
          {curType === "" ? (
            ""
          ) : (
            <img src={allTypeLogos[curType].TypeTextLogo} />
          )}
        </h1>
      </div>

      <div>
        {curType !== "" ? (
          <div>
            <div>{showTypeData(curType, clickType)}</div>
            <div>
              {showTypePokemonData(
                curType,
                shinyMode,
                clickPokemon,
                clickType,
                typePokemon,
                typePokemonNames,
                typePokemonLength
              )}
            </div>
            <div>
              {showTypeMoveData(curType, typeMoves, clickMove, clickType)}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Types;
