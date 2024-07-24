import { React, useState, useMemo } from "react";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import gamesDisplayToAPI from "../data/gameNameData/gamesDisplayToAPI.json";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import gamesPerGen from "../data/gameNameData/gamesPerGen.json";
import GameHome from "../PageFunctions/GameData/GameHome";
import locationPerGame from "../data/locationData/locationsPerGame.json";
import locationNamesAPIToDisplay from "../data/locationData/locationNamesAPIToDisplay.json";
import "../PageStyle/GameLocations.css";
import { getGameData } from "../PageFunctions/GameData/getGameData";

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
  clickGame,

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

  function fetchData(curGame) {
    if (curGame === "") {
      return;
    }

    setGameData(getGameData(curGame, clickPokemon, clickType, shinyMode));
  }

  const reRending = useMemo(() => fetchData(curGame), [curGame, shinyMode]);

  return (
    <div>
      <h1 className="game-title">
        {curGame === "" ? "Games Page" : gamesAPIToDisplay[curGame]}
      </h1>

      <div className="game-select-menu">
        <div className="gen-dropdown">
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
        </div>
        <div className="game-dropdown">
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
        </div>
        <div className="games-go-button">
          <button className="go-btn" onClick={() => goClick(curDropGameForGen)}>
            Go
          </button>
        </div>
      </div>

      {curGame === "" ? (
        <GameHome clickGame={clickGame}></GameHome>
      ) : (
        <div>
          <div>{gameData.map((pokemon) => pokemon)}</div>

          <div>
            <div className="location-title">Game Locations</div>
            <div className="location-container">
              <div className="location-box">
                {locationPerGame[curGame].map((location) => (
                  <div
                    className="location-entry location-text"
                    onClick={() => clickLocation(location)}
                  >
                    {locationNamesAPIToDisplay[location]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
