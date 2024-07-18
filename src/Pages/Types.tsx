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

  const [typeTo, setTypeTo] = useState("");
  const [typeFrom, setTypeFrom] = useState("[]");

  const typingList = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];
  const typingListIndex = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

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

      // this type effective to other types
      let typeEffectiveTo = [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
      ];

      for (let i = 0; i < allTypeData[typing].StrongTo.length; i++) {
        let cur_typing = allTypeData[typing].StrongTo[i];
        typeEffectiveTo[allTypeData[cur_typing].ID - 1] = "2";
      }

      for (let i = 0; i < allTypeData[typing].WeakTo.length; i++) {
        let cur_typing = allTypeData[typing].WeakTo[i];
        typeEffectiveTo[allTypeData[cur_typing].ID - 1] = "1/2";
      }

      for (let i = 0; i < allTypeData[typing].ImmuneTo.length; i++) {
        let cur_typing = allTypeData[typing].ImmuneTo[i];
        typeEffectiveTo[allTypeData[cur_typing].ID - 1] = "0";
      }

      setTypeTo(typeEffectiveTo);
      // types effective to this type
      let typeEffectiveFrom = [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
      ];

      for (let i = 0; i < allTypeData[typing].StrongFrom.length; i++) {
        let cur_typing = allTypeData[typing].StrongFrom[i];
        typeEffectiveFrom[allTypeData[cur_typing].ID - 1] = "2";
      }

      for (let i = 0; i < allTypeData[typing].WeakFrom.length; i++) {
        let cur_typing = allTypeData[typing].WeakFrom[i];
        typeEffectiveFrom[allTypeData[cur_typing].ID - 1] = "1/2";
      }

      for (let i = 0; i < allTypeData[typing].ImmuneFrom.length; i++) {
        let cur_typing = allTypeData[typing].ImmuneFrom[i];
        typeEffectiveFrom[allTypeData[cur_typing].ID - 1] = "0";
      }

      setTypeFrom(typeEffectiveFrom);

      return ["Success"];
    } catch (error) {
      console.log("Error");
      return ["Error"];
    }
  }

  const reRending = useMemo(() => fetchData(curType), [curType, shinyMode]);

  return (
    <div>
      <h1>Types Page</h1>
      <div className="type-dropdown">
        <div className="dropdown-label">Type:</div>
        <DropDown
          buttonText={`${curType === "" ? "Type" : typeAPIToDisplay[curType]}`}
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
      <div>{curType !== "" ? allTypeLogos[curType].DisplayName : ""}</div>

      <div>
        {curType !== "" ? <img src={allTypeLogos[curType].TypeTextLogo} /> : ""}
      </div>
      {curType !== "" ? (
        <div className="thisTypeToOthers">
          <h1>Effectiveness To Other Types</h1>
          <ul>
            {typingListIndex.map((index) => (
              <li>
                <img
                  src={allTypeLogos[typingList[index]].TypeTextLogo}
                  onClick={() => clickType(typingList[index])}
                />
                {typeAPIToDisplay[typingList[index]]}:{typeTo[index]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}

      {curType !== "" ? (
        <div className="thisTypeFromOthers">
          <h1>Effectiveness From Other Types</h1>
          <ul>
            {typingListIndex.map((index) => (
              <li>
                <img
                  src={allTypeLogos[typingList[index]].TypeTextLogo}
                  onClick={() => clickType(typingList[index])}
                />
                {typeAPIToDisplay[typingList[index]]}:{typeFrom[index]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
      {curType !== "" ? (
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
                          ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
                          : allPokemonSprites[typePokemon[mon_num]].FrontDefault
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
                            ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
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
                <div className="move-type-entry-box">
                  <div className="move-type-display">
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

export default Types;
