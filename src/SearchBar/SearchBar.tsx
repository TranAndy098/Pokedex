import { useState } from "react";
import "./SearchBar.css";
import data from "../data/data.json";
import allMons from "../data/all.json";
import { all } from "axios";

export default function SearchBar({
  setPokemon,
  setGen,
  setDropPokemon,
  value,
  setValue,
  pageState,
  setPageState,
}) {
  function onChange(event: any) {
    setValue(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    // call api to get poke data
    setValue(searchTerm);
    console.log("Search", searchTerm);
  }

  function validMon(pokemon) {
    for (let i = 0; i < allMons.length; i++) {
      if (allMons[i].toLowerCase() === pokemon.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function properMon(pokemon) {
    for (let i = 0; i < allMons.length; i++) {
      if (allMons[i].toLowerCase() === pokemon.toLowerCase()) {
        return allMons[i];
      }
    }
  }

  function searchClick(searchTerm: string) {
    if (searchTerm !== "" && validMon(searchTerm)) {
      setPokemon(properMon(searchTerm));
      setValue("");
      setGen(0);
      setDropPokemon("");
      if (pageState !== "Entry" && pageState !== "Locations") {
        setPageState("Entry");
      }
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
