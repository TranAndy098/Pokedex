import { useState } from "react";
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
import NoPage from "./Pages/NoPage";

import { useNavigate, Route, Routes } from "react-router-dom";

function App() {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [curDropPokemon, setDropPokemon] = useState("");
  const [scratch, setScratch] = useState("");

  const [search, setSearch] = useState("");

  const [curGen, setGen] = useState(0);

  const [openGen, setOpenGen] = useState(false);
  const [openPokemon, setOpenPokemon] = useState(false);

  const [pageState, setPageState] = useState("");

  const [shinyMode, setShinyMode] = useState(false);

  const [moveSearch, setMoveSearch] = useState("");

  const [openType, setOpenType] = useState(false);
  const [curDropType, setDropType] = useState("");

  const [curLocationGame, setLocationGame] = useState("");
  const [openGameLocations, setOpenGameLocations] = useState(false);

  const [openLocationForGame, setOpenLocationForGame] = useState(false);
  const [curDropLocationForGame, setDropLocationForGame] = useState("");

  const [locationSearch, setLocationSearch] = useState("");

  const [curGenGame, setGenGame] = useState("");
  const [openGenGame, setOpenGenGame] = useState(false);

  const [openGameForGen, setOpenGameForGen] = useState(false);
  const [curDropGameForGen, setDropGameForGen] = useState("");

  const navigate = useNavigate();

  function goClick(curDropPokemon: string) {
    if (curDropPokemon !== "") {
      setDropPokemon("");
      setGen(0);
      setSearch("");

      navigate(`/entry/${pokemonDisplayToAPI[curDropPokemon]}`);

      if (pageState !== "Entry") {
        setPageState("Entry");
      }
    }
  }

  function shinyClick() {
    setShinyMode(!shinyMode);
  }

  function blankSlate() {
    setOpenGen(false);
    setDropPokemon("");
    setSearch("");
    setMoveSearch("");
    setDropType("");
    setPageState("");
    setGenGame("");
    setDropGameForGen("");
    window.scrollTo(0, 0);
  }

  function clickPokemon(pokemon: string) {
    blankSlate();
    navigate(`/entry/${pokemon}`);
    setPageState("Entry");
  }

  function clickLocation(location: string) {
    console.log("click", location);
    blankSlate();
    navigate(`/location/${location}`);
    setPageState("Locations");
  }

  function clickMove(move: string) {
    blankSlate();
    navigate(`/move/${move}`);
    setPageState("Moves");
  }

  function clickType(typing: string) {
    blankSlate();
    navigate(`/type/${typing}`);
    setPageState("Types");
  }

  function clickGame(game: string) {
    blankSlate();
    navigate(`/game/${game}`);
    setPageState("Games");
  }
  function clickTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="page">
      <>
        <Navbar
          pageState={pageState}
          setPageState={setPageState}
          setSearch={setSearch}
          setMoveSearch={setMoveSearch}
          setDropType={setDropType}
          setLocationSearch={setLocationSearch}
          setLocationGame={setLocationGame}
          setDropLocationForGame={setDropLocationForGame}
          setGenGame={setGenGame}
          setDropGameForGen={setDropGameForGen}
        />
      </>

      <div className="container">
        <div className="box left-box">
          <div className="side-bar">
            <div className="side-bar-item">
              <div className="pokemon-search">
                <SearchBar
                  setGen={setGen}
                  setDropPokemon={setDropPokemon}
                  search={search}
                  setSearch={setSearch}
                  setMoveSearch={setMoveSearch}
                  setDropType={setDropType}
                  setPageState={setPageState}
                  pageState={pageState}
                />
              </div>
              <div className="pokemon-dropdown">
                <div className="dropdown-label">Generation:</div>
                <DropDown
                  buttonText={` ${curGen !== 0 ? curGen : ""}`}
                  open={openGen}
                  setOpen={setOpenGen}
                  content={
                    <>
                      {genNumbers.map((genNumbers) => (
                        <DropDownItem
                          key={genNumbers}
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
                            key={pokemons}
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
                            key={pokemon}
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
                <button
                  className="go-btn"
                  onClick={() => goClick(curDropPokemon)}
                >
                  Go
                </button>
              </div>

              <div className="shiny-box">
                <button
                  className={`shiny-btn ${shinyMode ? "is-active" : ""}`}
                  onClick={() => shinyClick()}
                >
                  <div>
                    Shiny
                    {shinyMode ? (
                      <img className="shiny-icon" src="shiny.png" />
                    ) : (
                      ""
                    )}
                  </div>
                </button>
              </div>
            </div>
            <button className="top-btn" onClick={() => clickTop()}>
              top
            </button>
          </div>
        </div>
        {/* Other components or content */}
        <div className="box right-box">
          <div className="pokemon-data-box">
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/entry/:curPokemon"
                  element={
                    <Entry
                      clickPokemon={clickPokemon}
                      clickLocation={clickLocation}
                      clickMove={clickMove}
                      clickType={clickType}
                      clickGame={clickGame}
                      shinyMode={shinyMode}
                    />
                  }
                />
                <Route
                  path="/location/:curLocation"
                  element={
                    <Locations
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
                  }
                />
                <Route
                  path="/game/:curGame"
                  element={
                    <Games
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
                      clickGame={clickGame}
                      setScratch={setSearch}
                      shinyMode={shinyMode}
                    />
                  }
                />
                <Route
                  path="/move/:curMove"
                  element={
                    <Moves
                      moveSearch={moveSearch}
                      setMoveSearch={setMoveSearch}
                      clickPokemon={clickPokemon}
                      clickType={clickType}
                      shinyMode={shinyMode}
                    />
                  }
                />
                <Route
                  path="/type/:curType"
                  element={
                    <Types
                      openType={openType}
                      setOpenType={setOpenType}
                      curDropType={curDropType}
                      setDropType={setDropType}
                      clickPokemon={clickPokemon}
                      clickMove={clickMove}
                      clickType={clickType}
                      shinyMode={shinyMode}
                      setScratch={setScratch}
                    />
                  }
                />
                <Route path="/scan" element={<Scan />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// add dropdown selecter
