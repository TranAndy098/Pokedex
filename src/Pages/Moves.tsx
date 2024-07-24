import { React, useState, useMemo } from "react";
import MoveSearchBar from "../MoveSearchBar/MoveSearchBar";
import "../PageStyle/Moves.css";
import { getMoveInfoData } from "../PageFunctions/MoveData/getMoveInfoData";
import { getMoveData } from "../PageFunctions/MoveData/getMoveData";
import { showMoveData } from "../PageFunctions/MoveData/showMoveData";

function Moves({
  curMove,
  setMove,
  moveSearch,
  setMoveSearch,
  clickPokemon,
  clickType,
  shinyMode,
}) {
  console.log(curMove);

  const [movePokemonNames, setMovePokemonNames] = useState([]);
  const [movePokemon, setMovePokemon] = useState([]);
  const [movePokemonLength, setMovePokemonLength] = useState([]);
  const [moveData, setMoveData] = useState("");

  async function fetchMoveData(move) {
    if (move === "") {
      return "";
    }
    try {
      await getMoveData(
        curMove,
        setMovePokemon,
        setMovePokemonNames,
        setMovePokemonLength
      );

      setMoveData(getMoveInfoData(curMove, clickType));
    } catch (error) {
      console.log("Error");
    }
  }

  const reRending = useMemo(() => fetchMoveData(curMove), [curMove, shinyMode]);

  return (
    <div>
      <h1>{curMove === "" ? "Moves Page" : ""}</h1>

      <div className="move-menu">
        <div className="move-search">
          <MoveSearchBar
            setMove={setMove}
            moveSearch={moveSearch}
            setMoveSearch={setMoveSearch}
          ></MoveSearchBar>
        </div>
      </div>
      <div>{curMove !== "" ? <div>{moveData}</div> : ""}</div>

      {curMove !== "" ? (
        <div>
          {showMoveData(
            movePokemonLength,
            shinyMode,
            clickPokemon,
            movePokemon,
            clickType,
            movePokemonNames
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Moves;
