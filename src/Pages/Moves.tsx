import { React, useState, useMemo } from "react";
import MoveSearchBar from "../MoveSearchBar/MoveSearchBar";
import "../PageStyle/Moves.css";
import { getMoveInfoData } from "../PageFunctions/MoveData/getMoveInfoData";
import { getMoveData } from "../PageFunctions/MoveData/getMoveData";
import { showMoveData } from "../PageFunctions/MoveData/showMoveData";
import { useParams } from "react-router";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";

function Moves({
  moveSearch,
  setMoveSearch,
  clickPokemon,
  clickType,
  shinyMode,
}) {
  const { curMove } = useParams();

  const [movePokemonNames, setMovePokemonNames] = useState([]);
  const [movePokemon, setMovePokemon] = useState([]);
  const [movePokemonLength, setMovePokemonLength] = useState([]);
  const [moveData, setMoveData] = useState("");

  async function fetchMoveData(move) {
    if (move === "home" || !Object.keys(moveAPIToDisplay).includes(move)) {
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
      console.log(`Showing ${moveAPIToDisplay[curMove]}`);
    } catch (error) {
      console.log("Error");
    }
  }

  const reRending = useMemo(() => fetchMoveData(curMove), [curMove, shinyMode]);

  return (
    <div>
      <h1>{curMove === "home" ? "Moves Page" : ""}</h1>

      <div className="move-menu">
        <div className="move-search">
          <MoveSearchBar
            moveSearch={moveSearch}
            setMoveSearch={setMoveSearch}
          ></MoveSearchBar>
        </div>
      </div>
      <div>
        {curMove !== "home" ? (
          <div>
            {Object.keys(moveAPIToDisplay).includes(curMove) ? (
              <div>{moveData}</div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {curMove !== "home" ? (
        <div>
          {Object.keys(moveAPIToDisplay).includes(curMove) ? (
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
            <h2>Entry Not Valid</h2>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Moves;
