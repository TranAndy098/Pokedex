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

function Locations({
  curLocation,
  setLocation,

  curLocationGame,
  setLocationGame,

  openGameLocations,
  setOpenGameLocations,

  curLocationForGame,
  setLocationForGame,

  openLocationForGame,
  setOpenLocationForGame,

  locationSearch,
  setLocationSearch,

  curDropLocationForGame,
  setDropLocationForGame,

  setScratch,
  shinyMode,
}) {
  const [locationData, setLocationData] = useState([]);

  function goClick(curDropLocationForGame) {
    console.log(curDropLocationForGame);
    if (curDropLocationForGame !== "") {
      setLocation(locationNamesDisplayToAPI[curDropLocationForGame]);

      setLocationGame("");
      setOpenLocationForGame("");

      setLocationForGame("");
      setOpenLocationForGame("");
      setLocationSearch("");
      setDropLocationForGame("");
    }
  }

  function fetchData(curLocation) {
    if (curLocation === "") {
      return;
    }
    let mid = [];
    let pokemons = Object.keys(pokemonPerLocation[curLocation]);
    console.log(pokemons);
    for (let i = 0; i < pokemons.length; i++) {
      let methods = Object.keys(pokemonPerLocation[curLocation][pokemons[i]]);

      if (Object.keys(allPokemonSprites).includes(pokemons[i])) {
        mid.push(
          <li>
            <h3>{pokemonAPIToDisplay[pokemons[i]]}</h3>
            <img
              src={
                shinyMode
                  ? allPokemonSprites[pokemons[i]].FrontShiny
                  : allPokemonSprites[pokemons[i]].FrontDefault
              }
            />
            {methods.map((method) => (
              <div>
                <h4>Method: {method}</h4>
                <h4>
                  MinLevel:
                  {
                    pokemonPerLocation[curLocation][pokemons[i]][method]
                      .MinLevel
                  }
                </h4>
                <h4>
                  MaxLevel:
                  {
                    pokemonPerLocation[curLocation][pokemons[i]][method]
                      .MaxLevel
                  }
                </h4>
                <h4>
                  Chance:
                  {pokemonPerLocation[curLocation][pokemons[i]][method].Chance}
                </h4>
                {pokemonPerLocation[curLocation][pokemons[i]][
                  method
                ].Conditions.map((condition) => (
                  <h4>{encounterConditionsAPIToDisplay[condition]}</h4>
                ))}
              </div>
            ))}
          </li>
        );
      } else {
        console.log("Location: Cannot Find Sprite for", pokemons[i]);
      }
    }
    setLocationData(mid);
  }

  const reRending = useMemo(
    () => fetchData(curLocation),
    [curLocation, shinyMode]
  );

  return (
    <div>
      <h1>Locations Page</h1>
      <h1>
        {curLocation === "" ? "" : locationNamesAPIToDisplay[curLocation]}
      </h1>
      <LocationSearchBar
        setLocation={setLocation}
        locationSearch={locationSearch}
        setLocationSearch={setLocationSearch}
        setLocationGame={setLocationGame}
        setDropLocationForGame={setDropLocationForGame}
      ></LocationSearchBar>
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
      <button
        className="go-btn"
        onClick={() => goClick(curDropLocationForGame)}
      >
        Go
      </button>
      {curLocation !== "" ? (
        <ul>{locationData.map((pokemon) => pokemon)}</ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Locations;
