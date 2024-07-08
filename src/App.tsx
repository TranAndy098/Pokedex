import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import Display from "./Display/Display";
import "./App.css";
import gens from "./data/gen.json";
import Entry from "./NavBar/Entry";
import Locations from "./NavBar/Locations";
import Scan from "./NavBar/Scan";
import Home from "./NavBar/Home";
import all_mon from "./data/all.json";

const App: React.FC = () => {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [curPokemon, setPokemon] = useState("");
  const [curDropPokemon, setDropPokemon] = useState("");
  const [scratch, setScratch] = useState("");

  const [search, setSearch] = useState("");

  const [curGen, setGen] = useState(0);

  const [openGen, setOpenGen] = useState(false);
  const [openPokemon, setOpenPokemon] = useState(false);

  const [pageState, setpageState] = useState("");

  function goClick(curDropPokemon) {
    if (curDropPokemon !== "") {
      setPokemon(curDropPokemon);
      setDropPokemon("");
      setGen(0);
      setSearch("");

      if (pageState !== "Entry" && pageState !== "Locations") {
        setpageState("Entry");
      }
    }
  }

  return (
    <>
      <Navbar
        setpageState={setpageState}
        curPokemon={curPokemon}
        setPokemon={setPokemon}
      />
      <div className="container">
        <div className="box left-box">
          <SearchBar
            setPokemon={setPokemon}
            setGen={setGen}
            setDropPokemon={setDropPokemon}
            value={search}
            setValue={setSearch}
            setpageState={setpageState}
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
                    {gens[curGen].map((name) => (
                      <DropDownItem
                        content={name}
                        check={curDropPokemon}
                        setMode1={setDropPokemon}
                        setMode2={setScratch}
                        setOpen={setOpenPokemon}
                      ></DropDownItem>
                    ))}
                  </>
                ) : (
                  <>
                    {all_mon.map((name) => (
                      <DropDownItem
                        content={name}
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
          </div>
        </div>
        {/* Other components or content */}
        <div className="box right-box">
          <div className="pokemon-data-box">
            {pageState === "" ? <Home /> : <p />}
            {pageState === "Entry" ? <Entry curPokemon={curPokemon} /> : <p />}
            {pageState === "Locations" ? (
              <Locations curPokemon={curPokemon} />
            ) : (
              <p />
            )}
            {pageState === "Scan" ? <Scan /> : <p />}
          </div>
          <div>
            <p>Curent Page: {pageState}</p>
            <p>Curent Pokemon: {curPokemon}</p>
            <p>Curent Gen: {curGen}</p>
            <p>Need to do: when dropdown is clicked, close it</p>
            <Display curPokemon={curPokemon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// add dropdown selecter
