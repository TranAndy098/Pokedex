import { React, useState, useMemo } from "react";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import gamesDisplayToAPI from "../data/gameNameData/gamesDisplayToAPI.json";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import gamesPerGen from "../data/gameNameData/gamesPerGen.json";
import pokedexPerGame from "../data/gameNameData/pokedexPerGame.json";
import pokedexAPIToDisplay from "../data/gameNameData/pokedexAPIToDisplay.json";
import GameHome from "./GameHome";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import pokemonTypingChart from "../data/pokemonData/pokemonTypingChart.json";

function Games({
  curGame,
  setGame,

  curGenGame,
  setGenGame,

  openGenGame,
  setOpenGenGame,

  curGameForGen,
  setGameForGen,

  openGameForGen,
  setOpenGameForGen,

  curDropGameForGen,
  setDropGameForGen,

  setScratch,
  shinyMode,
}) {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [gameData, setGameData] = useState([]);

  function goClick(curDropGameForGen) {
    console.log(curDropGameForGen);
    if (curDropGameForGen !== "") {
      setGame(gamesDisplayToAPI[curDropGameForGen]);

      setGenGame("");
      setOpenGameForGen("");

      setGameForGen("");
      setOpenGameForGen("");
      setDropGameForGen("");
    }
  }

  function fetchData(curGame) {
    if (curGame === "") {
      return;
    }
    let overall = [];

    let pokedexes = Object.keys(pokedexPerGame[curGame]);

    for (let i = 0; i < pokedexes.length; i++) {
      let pokedex = pokedexes[i];
      overall.push(
        <ul>
          <h3>{pokedexAPIToDisplay[pokedex]}</h3>
          <ul>
            {Object.keys(pokedexPerGame[curGame][pokedex]).map((id) => (
              <li>
                <h3>{id}</h3>
                <h3>{id}</h3>

                <img
                  src={
                    shinyMode
                      ? allPokemonSprites[pokedexPerGame[curGame][pokedex][id]]
                          .FrontShiny
                      : allPokemonSprites[pokedexPerGame[curGame][pokedex][id]]
                          .FrontDefault
                  }
                />
                {pokemonTypingChart[pokedexPerGame[curGame][pokedex][id]].map(
                  (type) => (
                    <img src={allTypeLogos[type].TypeTextLogo} />
                  )
                )}
              </li>
            ))}
          </ul>
        </ul>
      );
    }

    setGameData(overall);
  }

  const reRending = useMemo(() => fetchData(curGame), [curGame, shinyMode]);

  return (
    <div>
      <h1>Games Page</h1>
      <h1>{curGame === "" ? "" : gamesAPIToDisplay[curGame]}</h1>
      <DropDown
        buttonText={` ${curGenGame !== "" ? curGenGame : ""}`}
        open={openGenGame}
        setOpen={setOpenGenGame}
        content={
          <>
            {genNumbers.map((gen) => (
              <DropDownItem
                content={gen}
                check={curGenGame}
                setMode1={setGenGame}
                setMode2={setOpenGameForGen}
                setOpen={setOpenGenGame}
              ></DropDownItem>
            ))}
          </>
        }
      />
      <DropDown
        buttonText={curDropGameForGen}
        open={openGameForGen}
        setOpen={setOpenGameForGen}
        content={
          curGenGame !== "" ? (
            <>
              {gamesPerGen[curGenGame].map((game) => (
                <DropDownItem
                  content={gamesAPIToDisplay[game]}
                  check={curDropGameForGen}
                  setMode1={setDropGameForGen}
                  setMode2={setScratch}
                  setOpen={setOpenGameForGen}
                ></DropDownItem>
              ))}
            </>
          ) : (
            <>
              {Object.keys(gamesDisplayToAPI).map((game) => (
                <DropDownItem
                  content={game}
                  check={curDropGameForGen}
                  setMode1={setDropGameForGen}
                  setMode2={setScratch}
                  setOpen={setOpenGameForGen}
                ></DropDownItem>
              ))}
            </>
          )
        }
      />
      <button className="go-btn" onClick={() => goClick(curDropGameForGen)}>
        Go
      </button>
      {curGame === "" ? (
        <GameHome></GameHome>
      ) : (
        <div>{gameData.map((pokemon) => pokemon)}</div>
      )}
    </div>
  );
}

export default Games;
