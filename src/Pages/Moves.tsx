import { React, useState, useMemo } from "react";
import axios from "axios";
import MoveSearchBar from "../MoveSearchBar/MoveSearchBar";
import allMoveData from "../data/moveData/allMoveData.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import allDamageClassLogos from "../data/moveData/allDamageClassLogos.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import moveTargetAPIToDisplay from "../data/moveTargetData/moveTargetAPIToDisplay.json";

function Moves({ curMove, setMove, moveSearch, setMoveSearch, shinyMode }) {
  console.log(curMove);
  const [movePokemon, setMovePokemon] = useState([]);
  const [moveData, setMoveData] = useState("");

  async function fetchData(move) {
    if (move === "") {
      return "";
    }
    try {
      let moveURL = allMoveData[move].URL;

      const response = await axios.get(moveURL, {
        responseType: "json",
      });

      let cur = [];

      // learned by pokemon
      for (let i = 0; i < response.data.learned_by_pokemon.length; i++) {
        let currentPokemonForMove = response.data.learned_by_pokemon[i].name;

        if (Object.keys(allPokemonSprites).includes(currentPokemonForMove)) {
          cur.push(currentPokemonForMove);
        } else {
          console.log("Move: Cannot Find Sprite for", currentPokemonForMove);
        }
      }
      let moveInfo = (
        <div>
          <div className="name">
            <h1>{moveAPIToDisplay[curMove]}</h1>
          </div>

          <div className="accuracy">
            <h1>Accuracy</h1>
            <h3>{allMoveData[curMove].Accuracy}</h3>
          </div>

          <div className="effect-chance">
            <h1>Effect Chance</h1>
            <h3>{allMoveData[curMove]["Effect Chance"]}</h3>
          </div>

          <div className="damage-class">
            <h1>Damage Class</h1>
            <img
              src={
                allDamageClassLogos[allMoveData[curMove]["Damage Class"]]
                  .TypeLogoBDSP
              }
            />
          </div>

          <div className="effects">
            <h1>Effects</h1>
            <h3>{allMoveData[curMove].Effects}</h3>
          </div>

          <div className="power">
            <h1>Power</h1>
            <h3>{allMoveData[curMove].Power}</h3>
          </div>

          <div className="pp">
            <h1>PP</h1>
            <h3>{allMoveData[curMove].PP}</h3>
          </div>

          <div className="target">
            <h1>Target</h1>
            <h3>{moveTargetAPIToDisplay[allMoveData[curMove].Target]}</h3>
          </div>

          <div className="typing">
            <h1>Type</h1>
            <img src={allTypeLogos[allMoveData[curMove].Type].TypeTextLogo} />
          </div>
        </div>
      );

      setMovePokemon(cur);
      setMoveData(moveInfo);

      return cur;
    } catch (error) {
      console.log("Error");
      setMoveData([]);
      return ["Error"];
    }
  }

  const reRending = useMemo(() => fetchData(curMove), [curMove, shinyMode]);

  return (
    <div>
      <h1>Moves Page</h1>
      <MoveSearchBar
        setMove={setMove}
        moveSearch={moveSearch}
        setMoveSearch={setMoveSearch}
      ></MoveSearchBar>

      {curMove !== "" ? (
        <div>
          <div>{moveData}</div>

          <ul>
            {movePokemon.map((mon) => (
              <li>
                {pokemonAPIToDisplay[mon]}
                <img
                  src={
                    shinyMode
                      ? allPokemonSprites[mon].FrontShiny
                      : allPokemonSprites[mon].FrontDefault
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Moves;
