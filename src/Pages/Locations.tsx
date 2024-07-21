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
    let mid = [];
    console.log(9);
    console.log(curLocation);
    let pokemons = Object.keys(pokemonPerLocation[curLocation]);
    console.log(8);
    console.log(pokemons);
    for (let i = 0; i < pokemons.length; i++) {
      let methods = Object.keys(pokemonPerLocation[curLocation][pokemons[i]]);

      if (Object.keys(allPokemonSprites).includes(pokemons[i])) {
        if (allPokemonSprites[pokemons[i]].FrontDefault === null) {
          pokemons[i] = allPokemonSprites[pokemons[i]].EntryMainName;
        }

        for (let j = 0; j < methods.length; j++) {
          mid.push(
            <div className="encounter-box">
              <div className="encounter-header">
                <div className="encounter-header-name-type">
                  <div
                    className="encounter-name"
                    onClick={() => clickPokemon(pokemons[i])}
                  >
                    {" "}
                    {pokemonAPIToDisplay[pokemons[i]]}{" "}
                  </div>
                  <div className="encounter-typings">
                    {" "}
                    {Object.keys(pokemonTypingChart).includes(pokemons[i]) ? (
                      pokemonTypingChart[pokemons[i]].map((typing) => (
                        <img
                          className="encounter-type"
                          src={allTypeLogos[typing].TypeTextLogo}
                          onClick={() => clickType(typing)}
                        ></img>
                      ))
                    ) : (
                      <></>
                    )}{" "}
                  </div>
                </div>

                <div className="encounter-header-sprite">
                  <img
                    className="encounter-sprite"
                    src={
                      shinyMode
                        ? allPokemonSprites[pokemons[i]].FrontShiny
                        : allPokemonSprites[pokemons[i]].FrontDefault
                    }
                    onClick={() => clickPokemon(pokemons[i])}
                  />
                </div>

                <div className="encounter-header-method">
                  <div className="encounter-method-title">Method</div>
                  <div className="encounter-method-data">
                    {encounterMethodsAPIToDisplay[methods[j]]}
                  </div>
                </div>

                <div className="encounter-header-level-chance">
                  <div className="encounter-min">
                    <div className="encounter-header-subitem-title">
                      MinLevel
                    </div>
                    <div className="encounter-header-subitem-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .MinLevel
                      }
                    </div>
                  </div>
                  <div className="encounter-max">
                    <div className="encounter-header-subitem-title">
                      MaxLevel
                    </div>
                    <div className="encounter-header-subitem-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .MaxLevel
                      }
                    </div>
                  </div>
                  <div className="encounter-chance">
                    <div className="encounter-chance-title">Chance</div>
                    <div className="encounter-chance-data">
                      {
                        pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                          .Chance
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="encounter-footer">
                {pokemonPerLocation[curLocation][pokemons[i]][methods[j]]
                  .Conditions.length > 0 ? (
                  <div className="encounter-footer-item">
                    <div className="encounter-footer-item-title">
                      Conditions
                    </div>
                    <div className="encounter-condtion-box">
                      {pokemonPerLocation[curLocation][pokemons[i]][
                        methods[j]
                      ].Conditions.map((condition) => (
                        <div className="encounter-footer-subitem">
                          {encounterConditionsAPIToDisplay[condition]}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        }
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
