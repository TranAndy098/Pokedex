import { useState } from "react";
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

  function validMon(pokemon) {
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
