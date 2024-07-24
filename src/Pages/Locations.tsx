import { React, useState, useMemo } from "react";
import LocationSearchBar from "../LocationSearchBar/LocationSearchBar";
import locationNamesDisplayToAPI from "../data/locationData/locationNamesDisplayToAPI.json";
import locationNamesAPIToDisplay from "../data/locationData/locationNamesAPIToDisplay.json";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import gamesDisplayToAPI from "../data/gameNameData/gamesDisplayToAPI.json";
import locationsPerGame from "../data/locationData/locationsPerGame.json";
import pokemonPerLocation from "../data/locationData/pokemonPerLocation.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import encounterConditionsAPIToDisplay from "../data/encounterConditionData/encounterConditionsAPIToDisplay.json";
import encounterMethodsAPIToDisplay from "../data/encounterMethodData/encounterMethodsAPIToDisplay.json";
import pokemonTypingChart from "../data/pokemonData/pokemonTypingChart.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import "../PageStyle/LocationEncounters.css";
import "../PageStyle/LocationMenu.css";
import { getLocationData } from "../PageFunctions/LocationData/getLocationData";

function Locations({
  curLocation,
  setLocation,

  curLocationGame,
  setLocationGame,

  openGameLocations,
  setOpenGameLocations,

  openLocationForGame,
  setOpenLocationForGame,

  locationSearch,
  setLocationSearch,

  curDropLocationForGame,
  setDropLocationForGame,

  clickPokemon,
  clickType,
  setScratch,
  shinyMode,
}) {
  const [locationData, setLocationData] = useState([]);
  console.log(curLocation);

  function goClick(curDropLocationForGame) {
    console.log(curDropLocationForGame);
    if (curDropLocationForGame !== "") {
      setLocation(locationNamesDisplayToAPI[curDropLocationForGame]);

      setLocationGame("");

      setLocationSearch("");
      setDropLocationForGame("");
    }
  }

  function fetchData(curLocation) {
    if (curLocation === "") {
      return;
    }
    setLocationData(
      getLocationData(curLocation, clickPokemon, clickType, shinyMode)
    );
  }

  const reRending = useMemo(
    () => fetchData(curLocation),
    [curLocation, shinyMode]
  );

  return (
    <div className="location-menu">
      <h1 className="location-title">
        {curLocation === ""
          ? "Locations Page"
          : locationNamesAPIToDisplay[curLocation]}
      </h1>

      <div className="location-dropdown">
        <div className="location-game-dropdown">
          <DropDown
            buttonText={` ${curLocationGame !== "" ? curLocationGame : ""}`}
            open={openGameLocations}
            setOpen={setOpenGameLocations}
            content={
              <>
                {Object.keys(gamesAPIToDisplay).map((game) => (
                  <DropDownItem
                    content={gamesAPIToDisplay[game]}
                    check={curLocationGame}
                    setMode1={setLocationGame}
                    setMode2={setOpenLocationForGame}
                    setOpen={setOpenGameLocations}
                  ></DropDownItem>
                ))}
              </>
            }
          />
        </div>
        <div className="location-area-dropdown">
          <DropDown
            buttonText={curDropLocationForGame}
            open={openLocationForGame}
            setOpen={setOpenLocationForGame}
            content={
              curLocationGame !== "" ? (
                <>
                  {locationsPerGame[gamesDisplayToAPI[curLocationGame]].map(
                    (locations) => (
                      <DropDownItem
                        content={locationNamesAPIToDisplay[locations]}
                        check={curDropLocationForGame}
                        setMode1={setDropLocationForGame}
                        setMode2={setScratch}
                        setOpen={setOpenLocationForGame}
                      ></DropDownItem>
                    )
                  )}
                </>
              ) : (
                <>
                  {Object.keys(locationNamesDisplayToAPI).map((locations) => (
                    <DropDownItem
                      content={locations}
                      check={curDropLocationForGame}
                      setMode1={setDropLocationForGame}
                      setMode2={setScratch}
                      setOpen={setOpenLocationForGame}
                    ></DropDownItem>
                  ))}
                </>
              )
            }
          />
        </div>
        <div className="location-go-button">
          <button
            className="go-btn"
            onClick={() => goClick(curDropLocationForGame)}
          >
            Go
          </button>
        </div>
      </div>
      <div className="location-search">
        <LocationSearchBar
          setLocation={setLocation}
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          setLocationGame={setLocationGame}
          setDropLocationForGame={setDropLocationForGame}
        ></LocationSearchBar>
      </div>

      {curLocation !== "" ? (
        <div>
          <div className="encounter-title">Encounters</div>
          <div className="encounter-container">
            {locationData.map((pokemon) => pokemon)}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Locations;
