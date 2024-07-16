import { React, useState, useMemo } from "react";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import nationalPokedexTyping from "../data/pokemonData/nationalPokedexTyping.json";

function EntryHome({ clickPokemon, clickType, shinyMode }) {
  const [value, setValue] = useState([]);

  async function fetchData() {
    try {
      let overall = [];

      let pokemons = Object.keys(nationalPokedexTyping);

      // pokemons
      for (let i = 0; i < pokemons.length; i++) {
        overall.push(
          <div>
            <h2 onClick={() => clickPokemon(pokemons[i])}>ID: {i + 1}</h2>
            <h2 onClick={() => clickPokemon(pokemons[i])}>
              Name: {pokemonAPIToDisplay[pokemons[i]]}
            </h2>
            <img
              src={
                shinyMode
                  ? allPokemonSprites[pokemons[i]].FrontShiny
                  : allPokemonSprites[pokemons[i]].FrontDefault
              }
              onClick={() => clickPokemon(pokemons[i])}
            />
            {nationalPokedexTyping[pokemons[i]].map((type) => (
              <img
                src={allTypeLogos[type].TypeTextLogo}
                onClick={() => clickType(type)}
              />
            ))}
          </div>
        );
      }

      console.log("move data 2");

      setValue(overall);

      console.log(9);
    } catch (error) {
      setValue([]);
      return ["Error"];
    }
  }

  const reRending = useMemo(() => fetchData(), [shinyMode]);
  return (
    <div>
      <h1>EntryHome: Shiny: {shinyMode}</h1>
      <div>{value.map((pokemon) => pokemon)}</div>
    </div>
  );
}

export default EntryHome;
