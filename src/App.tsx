import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import Display from "./Display/Display";
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

  const [curLocationForGame, setLocationForGame] = useState("");
  const [openLocationForGame, setOpenLocationForGame] = useState(false);
  const [curDropLocationForGame, setDropLocationForGame] = useState("");

  const [locationSearch, setLocationSearch] = useState("");

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

  return (
    <>
      <Navbar
        curPokemon={curPokemon}
        setPokemon={setPokemon}
        pageState={pageState}
        setPageState={setPageState}
        setSearch={setSearch}
        setMove={setMove}
        setMoveSearch={setMoveSearch}
        setType={setType}
        setDropType={setDropType}
        setLocation={setLocation}
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
              <Entry curPokemon={curPokemon} shinyMode={shinyMode} />
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
                curLocationForGame={curLocationForGame}
                setLocationForGame={setLocationForGame}
                openLocationForGame={openLocationForGame}
                setOpenLocationForGame={setOpenLocationForGame}
                locationSearch={locationSearch}
                setLocationSearch={setLocationSearch}
                curDropLocationForGame={curDropLocationForGame}
                setDropLocationForGame={setDropLocationForGame}
                setScratch={setSearch}
                shinyMode={shinyMode}
              />
            ) : (
              <p />
            )}
            {pageState === "Games" ? <Games /> : <p />}
            {pageState === "Moves" ? (
              <Moves
                curMove={curMove}
                setMove={setMove}
                moveSearch={moveSearch}
                setMoveSearch={setMoveSearch}
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
                setDropType={setDropType}
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
            <p>Curent Drop Game: {curLocationGame}</p>
            <p>Shiny: {shinyMode ? "true" : "false"}</p>
            <p>Need to do: when dropdown is clicked, close it</p>
            <Display curPokemon={pokemonAPIToDisplay[curPokemon]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// add dropdown selecter
