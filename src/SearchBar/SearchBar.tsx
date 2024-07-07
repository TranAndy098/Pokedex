import { useState } from "react";
import "./SearchBar.css";
import data from "./data.json";

export default function SearchBar({
  setPokemon,
  setGen,
  setDropPokemon,
  value,
  setValue,
}) {
  function onChange(event: any) {
    setValue(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    // call api to get poke data
    setValue(searchTerm);
    console.log("Search", searchTerm);
  }

  function searchClick(searchTerm: string) {
    if (searchTerm !== "") {
      setPokemon(searchTerm);
      setValue("");
      setGen(0);
      setDropPokemon("");
    }
  }

  return (
    <div className="SearchBar-Menu">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-index">
          <input
            className="search-bar"
            type="text"
            value={value}
            onChange={onChange}
          ></input>
          <button className="search-btn" onClick={() => searchClick(value)}>
            Search
          </button>
        </div>
        <div className="dropdown">
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
