import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import "./App.css";
import pokemonGenerations from "./data/pokemonData/pokemonGenerations.json";
import Entry from "./Pages/Entry";
import Locations from "./Pages/Locations";
import Scan from "./Pages/Scan";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import Types from "./Pages/Types";
import Moves from "./Pages/Moves";
import allPokemons from "./data/pokemonData/allPokemons.json";
import pokemonDisplayToAPI from "./data/pokemonData/pokemonDisplayToAPI.json";
import pokemonAPIToDisplay from "./data/pokemonData/pokemonAPIToDisplay.json";
import allPokemonSprites from "./data/pokemonData/allPokemonSprites.json";

const App: React.FC = () => {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [curPokemon, setPokemon] = useState("");
  const [curDropPokemon, setDropPokemon] = useState("");
  const [scratch, setScratch] = useState("");

  const [search, setSearch] = useState("");

  const [curGen, setGen] = useState(0);

  const [openGen, setOpenGen] = useState(false);
  const [openPokemon, setOpenPokemon] = useState(false);

  const [pageState, setPageState] = useState("");

  const [shinyMode, setShinyMode] = useState(false);

  const [curMove, setMove] = useState("");
  const [moveSearch, setMoveSearch] = useState("");

  const [curType, setType] = useState("");
  const [openType, setOpenType] = useState(false);
  const [curDropType, setDropType] = useState("");

  const [curLocation, setLocation] = useState("");

  const [curLocationGame, setLocationGame] = useState("");
  const [openGameLocations, setOpenGameLocations] = useState(false);

  const [openLocationForGame, setOpenLocationForGame] = useState(false);
  const [curDropLocationForGame, setDropLocationForGame] = useState("");

  const [locationSearch, setLocationSearch] = useState("");

  const [curGame, setGame] = useState("");

  const [curGenGame, setGenGame] = useState("");
  const [openGenGame, setOpenGenGame] = useState(false);

  const [openGameForGen, setOpenGameForGen] = useState(false);
  const [curDropGameForGen, setDropGameForGen] = useState("");

  function goClick(curDropPokemon) {
    if (curDropPokemon !== "") {
      setPokemon(pokemonDisplayToAPI[curDropPokemon]);
      setDropPokemon("");
      setGen(0);
      setSearch("");

      if (pageState !== "Entry" && pageState !== "Locations") {
        setPageState("Entry");
      }
    }
  }

  function shinyClick() {
    setShinyMode(!shinyMode);
  }

  function blankSlate() {
    setPokemon("");
    setSearch("");
    setMove("");
    setMoveSearch("");
    setType("");
    setDropType("");
    setLocation("");
    setGame("");
    setPageState("");
    window.scrollTo(0, 0);
  }

  function clickPokemon(pokemon) {
    blankSlate();
    setPokemon(allPokemonSprites[pokemon].EntryMainName);
    setPageState("Entry");
  }

  function clickLocation(location) {
    blankSlate();
    setLocation(location);
    setPageState("Locations");
  }

  function clickMove(move) {
    blankSlate();
    setMove(move);
    setPageState("Moves");
  }

  function clickType(typing) {
    blankSlate();
    setType(typing);
    setPageState("Types");
  }

  return (
    <>
      <Navbar
        setPokemon={setPokemon}
        pageState={pageState}
        setPageState={setPageState}
        setSearch={setSearch}
        setMove={setMove}
        setMoveSearch={setMoveSearch}
        setType={setType}
        setDropType={setDropType}
        setLocation={setLocation}
        setLocationSearch={setLocationSearch}
        setLocationGame={setLocationGame}
        setDropLocationForGame={setDropLocationForGame}
        setGame={setGame}
        setGenGame={setGenGame}
        setDropGameForGen={setDropGameForGen}
      />
      <div className="container">
        <div className="box left-box">
          <SearchBar
            setPokemon={setPokemon}
            setGen={setGen}
            setDropPokemon={setDropPokemon}
            search={search}
            setSearch={setSearch}
            setMove={setMove}
            setMoveSearch={setMoveSearch}
            setType={setType}
            setDropType={setDropType}
            setPageState={setPageState}
            pageState={pageState}
          />
          <div className="App">
            <div className="dropdown-label">Generation:</div>
            <DropDown
              buttonText={` ${curGen !== 0 ? curGen : ""}`}
              open={openGen}
              setOpen={setOpenGen}
              content={
                <>
                  {genNumbers.map((genNumbers) => (
                    <DropDownItem
                      content={genNumbers}
                      check={curGen}
                      setMode1={setGen}
                      setMode2={setDropPokemon}
                      setOpen={setOpenGen}
                    ></DropDownItem>
                  ))}
                </>
              }
            />
            <div className="dropdown-label">Pokemon:</div>
            <DropDown
              buttonText={curDropPokemon}
              open={openPokemon}
              setOpen={setOpenPokemon}
              content={
                curGen > 0 ? (
                  <>
                    {pokemonGenerations[curGen].map((pokemons) => (
                      <DropDownItem
                        content={pokemons}
                        check={curDropPokemon}
                        setMode1={setDropPokemon}
                        setMode2={setScratch}
                        setOpen={setOpenPokemon}
                      ></DropDownItem>
                    ))}
                  </>
                ) : (
                  <>
                    {allPokemons.map((pokemon) => (
                      <DropDownItem
                        content={pokemon}
                        check={curDropPokemon}
                        setMode1={setDropPokemon}
                        setMode2={setScratch}
                        setOpen={setOpenPokemon}
                      ></DropDownItem>
                    ))}
                  </>
                )
              }
            />
            <button className="go-btn" onClick={() => goClick(curDropPokemon)}>
              Go
            </button>
            <button
              className={`shiny-btn ${shinyMode ? "is-active" : ""}`}
              onClick={() => shinyClick()}
            >
              <div>
                Shiny
                {shinyMode ? (
                  <img className="shiny-icon" src="./shiny.png" />
                ) : (
                  ""
                )}
              </div>
            </button>
          </div>
        </div>
        {/* Other components or content */}
        <div className="box right-box">
          <div className="pokemon-data-box">
            {pageState === "" ? <Home /> : <p />}
            {pageState === "Entry" ? (
              <Entry
                curPokemon={curPokemon}
                clickPokemon={clickPokemon}
                clickLocation={clickLocation}
                clickMove={clickMove}
                clickType={clickType}
                shinyMode={shinyMode}
              />
            ) : (
              <p />
            )}
            {pageState === "Locations" ? (
              <Locations
                curLocation={curLocation}
                setLocation={setLocation}
                curLocationGame={curLocationGame}
                setLocationGame={setLocationGame}
                openGameLocations={openGameLocations}
                setOpenGameLocations={setOpenGameLocations}
                openLocationForGame={openLocationForGame}
                setOpenLocationForGame={setOpenLocationForGame}
                locationSearch={locationSearch}
                setLocationSearch={setLocationSearch}
                curDropLocationForGame={curDropLocationForGame}
                setDropLocationForGame={setDropLocationForGame}
                clickPokemon={clickPokemon}
                clickType={clickType}
                setScratch={setSearch}
                shinyMode={shinyMode}
              />
            ) : (
              <p />
            )}
            {pageState === "Games" ? (
              <Games
                curGame={curGame}
                setGame={setGame}
                curGenGame={curGenGame}
                setGenGame={setGenGame}
                openGenGame={openGenGame}
                setOpenGenGame={setOpenGenGame}
                openGameForGen={openGameForGen}
                setOpenGameForGen={setOpenGameForGen}
                curDropGameForGen={curDropGameForGen}
                setDropGameForGen={setDropGameForGen}
                clickPokemon={clickPokemon}
                clickLocation={clickLocation}
                clickType={clickType}
                setScratch={setSearch}
                shinyMode={shinyMode}
              />
            ) : (
              <p />
            )}
            {pageState === "Moves" ? (
              <Moves
                curMove={curMove}
                setMove={setMove}
                moveSearch={moveSearch}
                setMoveSearch={setMoveSearch}
                clickPokemon={clickPokemon}
                clickType={clickType}
                shinyMode={shinyMode}
              />
            ) : (
              <p />
            )}
            {pageState === "Types" ? (
              <Types
                curType={curType}
                setType={setType}
                openType={openType}
                setOpenType={setOpenType}
                curDropType={curDropType}
                clickPokemon={clickPokemon}
                clickMove={clickMove}
                clickType={clickType}
                shinyMode={shinyMode}
                setScratch={setScratch}
              />
            ) : (
              <p />
            )}
            {pageState === "Scan" ? <Scan /> : <p />}
          </div>
          <div>
            <p>Curent Page: {pageState}</p>
            <p>Curent Pokemon: {pokemonAPIToDisplay[curPokemon]}</p>
            <p>Curent Gen: {curGen}</p>
            <p>Curent Move: {curMove}</p>
            <p>Curent Location: {curLocation}</p>
            <p>Curent Game: {curGame}</p>
            <p>Shiny: {shinyMode ? "true" : "false"}</p>
            <p>Need to do: when dropdown is clicked, close it</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// add dropdown selecter
