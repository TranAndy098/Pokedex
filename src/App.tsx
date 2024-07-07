import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import Display from "./Display/Display";
import "./App.css";
import gens from "./data/gen.json";

const App: React.FC = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [curPokemon, setPokemon] = useState("");
  const [curDropPokemon, setDropPokemon] = useState("");

  const [value, setValue] = useState("");

  const [curGen, setGen] = useState(0);

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
            <DropDown
              buttonText={`Generation ${curGen !== 0 ? curGen : ""}`}
              content={
                <>
                  {items.map((item) => (
                    <DropDownItem
                      content={item}
                      setMode={setGen}
                    ></DropDownItem>
                  ))}
                </>
              }
            />
            <DropDown
              buttonText={curDropPokemon}
              content={
                <>
                  {gens[curGen].map((name) => (
                    <DropDownItem
                      content={name}
                      setMode={setDropPokemon}
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
