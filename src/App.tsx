import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import Display from "./Display/Display";
import "./App.css";
import gens from "./data/gen.json";

const App: React.FC = () => {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [curPokemon, setPokemon] = useState("");
  const [curDropPokemon, setDropPokemon] = useState("");
  const [scratch, setScratch] = useState("");

  const [value, setValue] = useState("");

  const [curGen, setGen] = useState(0);

  const [openGen, setOpenGen] = useState(false);
  const [openPokemon, setOpenPokemon] = useState(false);

  function goClick(curDropPokemon) {
    if (curDropPokemon !== "") {
      setPokemon(curDropPokemon);
      setDropPokemon("");
      setGen(0);
      setValue("");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="box left-box">
          <SearchBar
            setPokemon={setPokemon}
            setGen={setGen}
            setDropPokemon={setDropPokemon}
            value={value}
            setValue={setValue}
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
              }
            />
            <button className="go-btn" onClick={() => goClick(curDropPokemon)}>
              Go
            </button>
          </div>
        </div>
        {/* Other components or content */}
        <div className="box right-box">
          <p>Curent Pokemon: {curPokemon}</p>
          <p>Curent Gen: {curGen}</p>
          <p>Need to do: when dropdown is clicked, close it</p>
          <Display curPokemon={curPokemon} />
        </div>
      </div>
    </>
  );
};

export default App;

// add dropdown selecter
