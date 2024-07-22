import { React, useState, useMemo } from "react";
import axios from "axios";
import MoveSearchBar from "../MoveSearchBar/MoveSearchBar";
import allMoveData from "../data/moveData/allMoveData.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import allDamageClassLogos from "../data/moveData/allDamageClassLogos.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import moveTargetAPIToDisplay from "../data/moveTargetData/moveTargetAPIToDisplay.json";
import pokemonTypingChart from "../data/pokemonData/pokemonTypingChart.json";
import "../PageStyle/Moves.css";
import "../PageStyle/MoveColors.css";

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
      let names = [];
      let indexes = [];

      // learned by pokemon
      for (let i = 0; i < response.data.learned_by_pokemon.length; i++) {
        let currentPokemonForMove = response.data.learned_by_pokemon[i].name;

        if (Object.keys(allPokemonSprites).includes(currentPokemonForMove)) {
          if (
            allPokemonSprites[currentPokemonForMove].FrontDefault !== null &&
            allPokemonSprites[currentPokemonForMove].FrontShiny !== null
          ) {
            cur.push(currentPokemonForMove);
          } else {
            cur.push(allPokemonSprites[currentPokemonForMove].EntryMainName);
          }
          names.push(currentPokemonForMove);
        } else {
          console.log("Move: Cannot Find Sprite for", currentPokemonForMove);
        }
      }

      for (let i = 0; i < names.length; i++) {
        indexes.push(i);
      }

      setMovePokemon(cur);
      setMovePokemonNames(names);
      setMovePokemonLength(indexes);
      let moveInfo = (
        <div className={`move-container ${allMoveData[curMove].Type}`}>
          <div className="move-header">
            <div className="move-name">{moveAPIToDisplay[curMove]}</div>
            <img
              className="move-typing"
              src={allTypeLogos[allMoveData[curMove].Type].TypeTextLogo}
              onClick={() => clickType(allMoveData[curMove].Type)}
            />

            <div className="move-pp">
              <div className="move-item-title">PP</div>
              <div className="move-item-text">{allMoveData[curMove].PP}</div>
            </div>
            <div className="move-power">
              <div className="move-item-title">Power</div>
              <div className="move-item-text">{allMoveData[curMove].Power}</div>
            </div>
            <div className="move-damage-class">
              <img
                src={
                  allDamageClassLogos[allMoveData[curMove]["Damage Class"]]
                    .TypeLogoBDSP
                }
              />
            </div>
          </div>

          <div className="move-body">
            <div className="move-accuracy">
              <div className="move-item-title">Accuracy</div>
              <div className="move-item-text">
                {allMoveData[curMove].Accuracy}
              </div>
            </div>
            <div className="move-target">
              <div className="move-item-title">Target</div>
              <div className="move-item-text">
                {moveTargetAPIToDisplay[allMoveData[curMove].Target]}
              </div>
            </div>

            <div className="move-effect-chance">
              <div className="move-item-title">Effect Chance</div>
              <div className="move-item-text">
                {allMoveData[curMove]["Effect Chance"]}
              </div>
            </div>
          </div>

          <div className="move-footer">
            <div className="move-effects">
              <div className="move-item-title">Effects</div>
              <div className="move-item-text">
                {allMoveData[curMove].Effects}
              </div>
            </div>
          </div>
        </div>
      );

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
          <h1>Pokemon</h1>
          <div className="pokedex-container">
            {movePokemonLength.map((mon_num) => (
              <div className="pokedex-entry-box">
                <div className="pokedex-display">
                  <img
                    className="pokedex-sprite-display"
                    src={
                      shinyMode
                        ? allPokemonSprites[movePokemon[mon_num]].FrontShiny
                        : allPokemonSprites[movePokemon[mon_num]].FrontDefault
                    }
                    onClick={() => clickPokemon(movePokemon[mon_num])}
                  />
                </div>
                <div className="pokedex-entry">
                  <div className="pokedex-header">
                    <h2
                      className="pokedex-name pokedex-header-item"
                      onClick={() => clickPokemon(movePokemon[mon_num])}
                    >
                      {pokemonAPIToDisplay[movePokemonNames[mon_num]]}
                    </h2>
                  </div>
                  <div className="pokedex-body">
                    <img
                      className="pokedex-sprite"
                      src={
                        shinyMode
                          ? allPokemonSprites[movePokemon[mon_num]].FrontShiny
                          : allPokemonSprites[movePokemon[mon_num]].FrontDefault
                      }
                      onClick={() => clickPokemon(movePokemon[mon_num])}
                    />
                  </div>

                  <div className="pokedex-footer">
                    {Object.keys(pokemonTypingChart).includes(
                      movePokemon[mon_num]
                    ) ? (
                      pokemonTypingChart[movePokemon[mon_num]].map((typing) => (
                        <img
                          className="pokedex-type"
                          src={allTypeLogos[typing].TypeTextLogo}
                          onClick={() => clickType(typing)}
                        ></img>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Moves;
