import { useState, useMemo } from "react";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import typeDisplayToAPI from "../data/typeData/typeDisplayToAPI.json";
import "../PageStyle/Types.css";
import { getTypeData } from "../PageFunctions/TypeData/getTypeData";
import { showTypeData } from "../PageFunctions/TypeData/showTypeData";
import { showTypePokemonData } from "../PageFunctions/TypeData/showTypePokemonData";
import { showTypeMoveData } from "../PageFunctions/TypeData/showTypeMoveData";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function Types({
  openType,
  setOpenType,
  curDropType,
  setDropType,
  clickPokemon,
  clickMove,
  clickType,
  shinyMode,
  setScratch,
}: {
  openType: boolean;
  setOpenType: (type: boolean) => void;
  curDropType: string;
  setDropType: (type: string) => void;
  clickPokemon: CallableFunction;
  clickMove: CallableFunction;
  clickType: CallableFunction;
  shinyMode: boolean;
  setScratch: (scratch: string) => void;
}) {
  let { curType } = useParams();

  const [typePokemonNames, setTypePokemonNames] = useState([]);
  const [typePokemon, setTypePokemon] = useState([]);
  const [typePokemonLength, setTypePokemonLength] = useState([]);
  const [typeMoves, setTypeMoves] = useState([]);

  const navigate = useNavigate();

  function typeSelect(curDropType: string) {
    if (curDropType !== "") {
      curType = typeDisplayToAPI[curDropType];
      setDropType(typeAPIToDisplay[curType]);

      navigate(`/type/${typeDisplayToAPI[curDropType]}`);
    }
  }

  async function fetchData(curType: string) {
    if (
      curType === "home" ||
      !Object.keys(typeAPIToDisplay).includes(curType)
    ) {
      return;
    }
    try {
      await getTypeData(
        curType,
        setTypePokemon,
        setTypePokemonLength,
        setTypePokemonNames,
        setTypeMoves
      );
      console.log(`Showing ${typeAPIToDisplay[curType]}`);
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
            buttonText={`${curDropType === "" ? "Type" : curDropType}`}
            open={openType}
            setOpen={setOpenType}
            content={
              <>
                {Object.keys(typeAPIToDisplay).map((typing) => (
                  <DropDownItem
                    key={typing}
                    content={typeAPIToDisplay[typing]}
                    check={curDropType}
                    setMode1={typeSelect}
                    setMode2={setScratch}
                    setOpen={setOpenType}
                  ></DropDownItem>
                ))}
              </>
            }
          />
        </div>

        <h1 className="type-name">
          {curType === "home" ? (
            ""
          ) : (
            <div className="type-name-logo">
              {Object.keys(typeAPIToDisplay).includes(curType) ? (
                <img src={allTypeLogos[curType].TypeTextLogo} />
              ) : (
                <></>
              )}
            </div>
          )}
        </h1>
      </div>

      <div>
        {curType !== "home" ? (
          <div>
            {Object.keys(typeAPIToDisplay).includes(curType) ? (
              <div>
                <div>{showTypeData(curType, clickType)}</div>
                <div>
                  {showTypePokemonData(
                    shinyMode,
                    clickPokemon,
                    clickType,
                    typePokemon,
                    typePokemonNames,
                    typePokemonLength
                  )}
                </div>
                <div>{showTypeMoveData(typeMoves, clickMove, clickType)}</div>
              </div>
            ) : (
              <h2>Entry Not Valid</h2>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Types;
