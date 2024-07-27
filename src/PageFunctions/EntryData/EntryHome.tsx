import { React, useState, useMemo } from "react";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import nationalPokedexTyping from "../../data/pokemonData/nationalPokedexTyping.json";
import nationalPokedexNames from "../../data/pokemonData/nationalPokedexNames.json";
import "../../PageStyle/Pokedex.css";

function EntryHome({ clickPokemon, clickType, shinyMode }) {
  const [value, setValue] = useState([]);

  async function fetchData() {
    try {
      console.log("Getting National Pokedex");
      let overall = [];

      let pokemons = Object.keys(nationalPokedexTyping);

      // pokemons
      for (let i = 0; i < pokemons.length; i++) {
        overall.push(
          <div className="pokedex-entry-box" key={pokemons[i]}>
            <div className="pokedex-display">
              <img
                className="pokedex-sprite-display"
                src={
                  shinyMode
                    ? allPokemonSprites[pokemons[i]].FrontShiny
                    : allPokemonSprites[pokemons[i]].FrontDefault
                }
                onClick={() => clickPokemon(pokemons[i])}
              />
            </div>
            <div className="pokedex-entry">
              <div className="pokedex-header">
                <h2
                  className="pokedex-id pokedex-header-item"
                  onClick={() => clickPokemon(pokemons[i])}
                >
                  {i + 1}
                </h2>
                <h2
                  className="pokedex-name pokedex-header-item"
                  onClick={() => clickPokemon(pokemons[i])}
                >
                  {nationalPokedexNames[pokemons[i]]}
                </h2>
              </div>
              <div className="pokedex-body">
                <img
                  className="pokedex-sprite"
                  src={
                    shinyMode
                      ? allPokemonSprites[pokemons[i]].FrontShiny
                      : allPokemonSprites[pokemons[i]].FrontDefault
                  }
                  onClick={() => clickPokemon(pokemons[i])}
                />
              </div>
              <div className="pokedex-footer">
                {nationalPokedexTyping[pokemons[i]].map((type) => (
                  <img
                    key={type}
                    className="pokedex-type"
                    src={allTypeLogos[type].TypeTextLogo}
                    onClick={() => clickType(type)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      }

      setValue(overall);
    } catch (error) {
      setValue([]);
      return ["Error"];
    }
  }

  const reRending = useMemo(() => fetchData(), [shinyMode]);
  return (
    <div>
      <h1>National Pokedex</h1>
      <div className="pokedex-container">{value.map((pokemon) => pokemon)}</div>
    </div>
  );
}

export default EntryHome;
