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
            <img
              src={allTypeLogos[allMoveData[curMove].Type].TypeTextLogo}
              onClick={() => clickType(allMoveData[curMove].Type)}
            />
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
      <h1>Moves Page</h1>
      <MoveSearchBar
        setMove={setMove}
        moveSearch={moveSearch}
        setMoveSearch={setMoveSearch}
      ></MoveSearchBar>

      {curMove !== "" ? (
        <div>
          <div>{moveData}</div>
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
                            : allPokemonSprites[movePokemon[mon_num]]
                                .FrontDefault
                        }
                        onClick={() => clickPokemon(movePokemon[mon_num])}
                      />
                    </div>

                    <div className="pokedex-footer">
                      {Object.keys(pokemonTypingChart).includes(
                        movePokemon[mon_num]
                      ) ? (
                        pokemonTypingChart[movePokemon[mon_num]].map(
                          (typing) => (
                            <img
                              className="pokedex-type"
                              src={allTypeLogos[typing].TypeTextLogo}
                              onClick={() => clickType(typing)}
                            ></img>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Moves;
