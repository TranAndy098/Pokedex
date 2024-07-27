import { React, useState, useMemo } from "react";
import LocationSearchBar from "../LocationSearchBar/LocationSearchBar";
import locationNamesDisplayToAPI from "../data/locationData/locationNamesDisplayToAPI.json";
import locationNamesAPIToDisplay from "../data/locationData/locationNamesAPIToDisplay.json";
import DropDown from "../DropDown/DropDown/DropDown";
import DropDownItem from "../DropDown/DropDownItem/DropDownItem";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";
import gamesDisplayToAPI from "../data/gameNameData/gamesDisplayToAPI.json";
import locationsPerGame from "../data/locationData/locationsPerGame.json";
import "../PageStyle/LocationEncounters.css";
import "../PageStyle/LocationMenu.css";
import { getLocationData } from "../PageFunctions/LocationData/getLocationData";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function Locations({
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
  const { curLocation } = useParams();

  const navigate = useNavigate();

  function goClick(curDropLocationForGame) {
    console.log(curDropLocationForGame);
    if (curDropLocationForGame !== "") {
      setLocationGame("");

      setLocationSearch("");
      setDropLocationForGame("");
      navigate(
        `/location/${locationNamesDisplayToAPI[curDropLocationForGame]}`
      );
    }
  }

  function fetchData(curLocation) {
    if (
      curLocation === "home" ||
      !Object.keys(locationNamesAPIToDisplay).includes(curLocation)
    ) {
      return;
    }
    setLocationData(
      getLocationData(curLocation, clickPokemon, clickType, shinyMode)
    );
    console.log(`Showing ${locationNamesAPIToDisplay[curLocation]}`);
  }

  const reRending = useMemo(
    () => fetchData(curLocation),
    [curLocation, shinyMode]
  );

  return (
    <div className="location-menu">
      <h1 className="location-title">
        {curLocation === "home"
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
                    key={game}
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
                      key={locations}
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
          locationSearch={locationSearch}
          setLocationSearch={setLocationSearch}
          setLocationGame={setLocationGame}
          setDropLocationForGame={setDropLocationForGame}
        ></LocationSearchBar>
      </div>

      {curLocation !== "home" ? (
        <div>
          <div>
            {Object.keys(locationNamesAPIToDisplay).includes(curLocation) ? (
              <div>
                <div className="encounter-title">Encounters</div>
                <div className="encounter-container">
                  {locationData.map((pokemon) => (
                    <div key={pokemon.key}>{pokemon}</div>
                  ))}
                </div>
              </div>
            ) : (
              <h2>Entry Not Valid</h2>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Locations;
