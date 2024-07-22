import { React, useState, useMemo } from "react";
import axios from "axios";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import allTypes from "../data/typeData/allTypes.json";
import allTypeData from "../data/typeData/allTypeData.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import pokemonTypingChart from "../data/pokemonData/pokemonTypingChart.json";
import "../PageStyle/MovesForTypes.css";
import allMoveData from "../data/moveData/allMoveData.json";
import allDamageClassLogos from "../data/moveData/allDamageClassLogos.json";
import "../PageStyle/Types.css";
import "../PageStyle/MoveColors.css";

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

  async function fetchData(typing) {
    if (typing === "") {
      return "";
    }
    try {
      let typeURL = allTypeData[typing].URL;

      const response = await axios.get(typeURL, {
        responseType: "json",
      });

      let cur = [];
      let names = [];
      let indexes = [];

      // pokemon
      for (let i = 0; i < response.data.pokemon.length; i++) {
        let currentPokemonForType = response.data.pokemon[i].pokemon.name;

        if (Object.keys(allPokemonSprites).includes(currentPokemonForType)) {
          if (allPokemonSprites[currentPokemonForType].FrontDefault !== null) {
            // could add "allPokemonSprites[currentPokemonForType].FrontShiny !== null;" to make sure shiny has sprite too
            cur.push(currentPokemonForType);
          } else {
            cur.push(allPokemonSprites[currentPokemonForType].EntryMainName);
          }
          names.push(currentPokemonForType);
        } else {
          console.log("Type: Cannot Find Pokemon for", currentPokemonForType);
        }
      }

      for (let i = 0; i < cur.length; i++) {
        console.log(cur[i]);
        console.log(allPokemonSprites[cur[i]].FrontDefault);
        console.log(allPokemonSprites[cur[i]].FrontShiny);
      }
      console.log(cur);
      for (let i = 0; i < names.length; i++) {
        console.log(names[i]);
        console.log(pokemonTypingChart[names[i]]);
      }
      console.log(names);

      for (let i = 0; i < names.length; i++) {
        indexes.push(i);
      }
      setTypePokemon(cur);
      setTypePokemonNames(names);
      setTypePokemonLength(indexes);

      cur = [];

      // moves
      for (let i = 0; i < response.data.moves.length; i++) {
        let currentMoveForType = response.data.moves[i].name;

        if (Object.keys(moveAPIToDisplay).includes(currentMoveForType)) {
          cur.push(currentMoveForType);
        } else {
          console.log("Type: Cannot Find Move for", currentMoveForType);
        }
      }

      setTypeMoves(cur);

      return ["Success"];
    } catch (error) {
      console.log("Error");
      return ["Error"];
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

            <div className="effective-box effective-container">
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

            <div>
              <div className="types-pokemon">
                <h1>Pokemon</h1>
                <div className="pokedex-container">
                  {typePokemonLength.map((mon_num) => (
                    <div className="pokedex-entry-box">
                      <div className="pokedex-display">
                        <img
                          className="pokedex-sprite-display"
                          src={
                            shinyMode
                              ? allPokemonSprites[typePokemon[mon_num]]
                                  .FrontShiny
                              : allPokemonSprites[typePokemon[mon_num]]
                                  .FrontDefault
                          }
                          onClick={() => clickPokemon(typePokemon[mon_num])}
                        />
                      </div>
                      <div className="pokedex-entry">
                        <div className="pokedex-header">
                          <h2
                            className="pokedex-name pokedex-header-item"
                            onClick={() => clickPokemon(typePokemon[mon_num])}
                          >
                            {pokemonAPIToDisplay[typePokemonNames[mon_num]]}
                          </h2>
                        </div>
                        <div className="pokedex-body">
                          <img
                            className="pokedex-sprite"
                            src={
                              shinyMode
                                ? allPokemonSprites[typePokemon[mon_num]]
                                    .FrontShiny
                                : allPokemonSprites[typePokemon[mon_num]]
                                    .FrontDefault
                            }
                            onClick={() => clickPokemon(typePokemon[mon_num])}
                          />
                        </div>
                        <div className="pokedex-footer">
                          {Object.keys(pokemonTypingChart).includes(
                            typePokemon[mon_num]
                          ) ? (
                            pokemonTypingChart[typePokemonNames[mon_num]].map(
                              (mon_type) => (
                                <img
                                  className="pokedex-type"
                                  src={allTypeLogos[mon_type].TypeTextLogo}
                                  onClick={() => clickType(mon_type)}
                                />
                              )
                            )
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="types-moves">
                <h1>Moves</h1>
                <div className="move-type-container">
                  {typeMoves.map((moves) => (
                    <div
                      className={`move-type-display ${allMoveData[moves].Type}`}
                    >
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
                              allDamageClassLogos[
                                allMoveData[moves]["Damage Class"]
                              ].TypeLogoBDSP
                            }
                          />
                        </div>
                      </div>
                      <div className="move-type-display-footer">
                        <div className="move-type-display-typing move-type-display-footer-item">
                          <img
                            className="move-type-display-types"
                            src={
                              allTypeLogos[allMoveData[moves].Type].TypeTextLogo
                            }
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
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Types;
