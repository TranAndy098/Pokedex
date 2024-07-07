import { React, useState } from "react";
import Navbar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";
import DropDown from "./DropDown/DropDown/DropDown";
import DropDownItem from "./DropDown/DropDownItem/DropDownItem";
import "./App.css";

const App: React.FC = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [curPokemon, setPokemon] = useState("");

  const [curGen, setGen] = useState(0);

  return (
    <>
      <Navbar />
      <p>
        -- Curent Pokemon: {curPokemon}-- -- Curent Gen: {curGen}-- Need to do
      </p>
      <p>when dropdown is clicked, close it</p>
      <SearchBar curPokemon={curPokemon} setPokemon={setPokemon} />
      <div className="App">
        <DropDown
          buttonText={`Generation ${curGen !== 0 ? curGen : ""}`}
          content={
            <>
              {items.map((item) => (
                <DropDownItem content={item} setMode={setGen}></DropDownItem>
              ))}
            </>
          }
        />
        <DropDown
          buttonText={curPokemon}
          content={
            <>
              {names.map((name) => (
                <DropDownItem
                  content={curGen * name}
                  setMode={setPokemon}
                ></DropDownItem>
              ))}
            </>
          }
        />
        {/* Other components or content */}
      </div>
    </>
  );
};

export default App;

// add dropdown selecter
