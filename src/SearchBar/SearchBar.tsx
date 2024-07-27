import React, { useState } from "react";
import "./SearchBar.css";
import allPokemons from "../data/pokemonData/allPokemons.json";
import pokemonDisplayToAPI from "../data/pokemonData/pokemonDisplayToAPI.json";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  setGen,
  setDropPokemon,
  search,
  setSearch,
  setMoveSearch,
  setDropType,
  setPageState,
  pageState,
}: {
  setGen: (gen: number) => void;
  setDropPokemon: (pokemon: string) => void;
  search: string;
  setSearch: (pokemon: string) => void;
  setMoveSearch: (move: string) => void;
  setDropType: (type: string) => void;
  setPageState: (page: string) => void;
  pageState: string;
}) {
  const navigate = useNavigate();

  function onChange(event: any) {
    setSearch(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    // call api to get poke data
    setSearch(searchTerm);
    console.log("Search", searchTerm);
  }

  function validMon(pokemon: string) {
    for (let i = 0; i < allPokemons.length; i++) {
      if (allPokemons[i].toLowerCase() === pokemon.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  function searchClick(searchTerm: string) {
    if (searchTerm !== "" && validMon(searchTerm)) {
      setSearch("");
      setGen(0);
      setDropPokemon("");
      setMoveSearch("");
      setDropType("");
      navigate(`/entry/${pokemonDisplayToAPI[searchTerm]}`);
      if (pageState !== "Entry") {
        setPageState("Entry");
      }
    }
  }
  function enterPressed(
    searchTerm: string,
    event: React.KeyboardEvent<object>
  ) {
    if (event.keyCode === 13) {
      searchClick(searchTerm);
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
            value={search}
            onChange={onChange}
            onKeyDown={(keyPressed) => enterPressed(search, keyPressed)}
          ></input>
          <button className="search-btn" onClick={() => searchClick(search)}>
            Search
          </button>
        </div>
        <div className="search-dropdown">
          {allPokemons
            .filter((pokemon) => {
              const searchTerm = search.toLowerCase();
              const name = pokemon.toLowerCase();
              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .slice(0, 10)
            .map((pokemon) => (
              <div
                onClick={() => onSearch(pokemon)}
                className="dropdown-row"
                key={pokemon}
              >
                {pokemon}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
