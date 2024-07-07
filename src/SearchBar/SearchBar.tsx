import { useState } from "react";
import "./SearchBar.css";
import data from "./data.json";

export default function SearchBar({ curPokemon, setPokemon }) {
  const [value, setValue] = useState("");

  function onChange(event: any) {
    setValue(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    // call api to get poke data
    setValue(searchTerm);
    setPokemon(searchTerm);
    console.log("Search", searchTerm);
  }

  return (
    <div className="SearchBar Menu">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-index">
          <input type="text" value={value} onChange={onChange}></input>
          <button onClick={() => onSearch(value)}>Search</button>
        </div>
        <div className="dropDown">
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const name = item.name.toLowerCase();
              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
