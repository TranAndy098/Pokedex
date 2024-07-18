import { React, useState, useMemo } from "react";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import gamesDisplayToAPI from "../data/gameNameData/gamesDisplayToAPI.json";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import gamesPerGen from "../data/gameNameData/gamesPerGen.json";
import pokedexPerGame from "../data/gameNameData/pokedexPerGame.json";
import pokedexAPIToDisplay from "../data/gameNameData/pokedexAPIToDisplay.json";
import GameHome from "./GameHome";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import pokemonTypingChart from "../data/pokemonData/pokemonTypingChart.json";
import locationPerGame from "../data/locationData/locationsPerGame.json";
import locationNamesAPIToDisplay from "../data/locationData/locationNamesAPIToDisplay.json";
import "../PageStyle/Pokedex.css";

function Games({
  curGame,
  setGame,

  curGenGame,
  setGenGame,

  openGenGame,
  setOpenGenGame,

  openGameForGen,
  setOpenGameForGen,

  curDropGameForGen,
  setDropGameForGen,

  clickPokemon,
  clickLocation,
  clickType,

  setScratch,
  shinyMode,
}) {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [gameData, setGameData] = useState([]);

  function goClick(curDropGameForGen) {
    console.log(curDropGameForGen);
    if (curDropGameForGen !== "") {
      window.scrollTo(0, 0);
      setGame(gamesDisplayToAPI[curDropGameForGen]);

      setGenGame("");
      setDropGameForGen("");
    }
  }

  function clickGame(game) {
    window.scrollTo(0, 0);
    setGame(game);

    setGenGame("");
    setDropGameForGen("");
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
        <div>
          <h3>{pokedexAPIToDisplay[pokedex]}</h3>
          <div className="pokedex-container">
            {Object.keys(pokedexPerGame[curGame][pokedex]).map((id) => (
              <div className="pokedex-entry-box">
                <div className="pokedex-display">
                  <img
                    className="pokedex-sprite-display"
                    src={
                      shinyMode
                        ? allPokemonSprites[
                            pokedexPerGame[curGame][pokedex][id]
                          ].FrontShiny
                        : allPokemonSprites[
                            pokedexPerGame[curGame][pokedex][id]
                          ].FrontDefault
                    }
                    onClick={() =>
                      clickPokemon(pokedexPerGame[curGame][pokedex][id])
                    }
                  />
                </div>
                <div className="pokedex-entry">
                  <div className="pokedex-header">
                    <h2
                      className="pokedex-id pokedex-header-item"
                      onClick={() =>
                        clickPokemon(pokedexPerGame[curGame][pokedex][id])
                      }
                    >
                      {id}
                    </h2>
                    <h2
                      className="pokedex-name pokedex-header-item"
                      onClick={() =>
                        clickPokemon(pokedexPerGame[curGame][pokedex][id])
                      }
                    >
                      {
                        pokemonAPIToDisplay[
                          pokedexPerGame[curGame][pokedex][id]
                        ]
                      }
                    </h2>
                  </div>
                  <div className="pokedex-body">
                    <img
                      className="pokedex-sprite"
                      src={
                        shinyMode
                          ? allPokemonSprites[
                              pokedexPerGame[curGame][pokedex][id]
                            ].FrontShiny
                          : allPokemonSprites[
                              pokedexPerGame[curGame][pokedex][id]
                            ].FrontDefault
                      }
                      onClick={() =>
                        clickPokemon(pokedexPerGame[curGame][pokedex][id])
                      }
                    />
                  </div>
                  <div className="pokedex-footer">
                    {pokemonTypingChart[
                      pokedexPerGame[curGame][pokedex][id]
                    ].map((type) => (
                      <img
                        className="pokedex-type"
                        src={allTypeLogos[type].TypeTextLogo}
                        onClick={() => clickType(type)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <GameHome clickGame={clickGame}></GameHome>
      ) : (
        <div>
          <div>{gameData.map((pokemon) => pokemon)}</div>
          <div>
            {locationPerGame[curGame].map((location) => (
              <p onClick={() => clickLocation(location)}>
                {locationNamesAPIToDisplay[location]}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
