import { React } from "react";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import "../../PageStyle/Pokedex.css";

export function showTypePokemonData(
  curType,
  shinyMode,
  clickPokemon,
  clickType,
  typePokemon,
  typePokemonNames,
  typePokemonLength
) {
  return (
    <div>
      <div className="types-pokemon">
        <h1>Pokemon</h1>
        <div className="pokedex-container">
          {typePokemonLength.map((mon_num) => (
            <div key={mon_num} className="pokedex-entry-box">
              <div className="pokedex-display">
                <img
                  className="pokedex-sprite-display"
                  src={
                    shinyMode
                      ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
                      : allPokemonSprites[typePokemon[mon_num]].FrontDefault
                  }
                  onClick={() => clickPokemon(typePokemon[mon_num])}
                />
              </div>
              <div className="pokedex-entry">
                <div className="pokedex-header">
                  <h2
                    className="pokedex-name pokedex-header-item"
                    onClick={() => clickPokemon(typePokemon[mon_num])}
                  >
                    {pokemonAPIToDisplay[typePokemonNames[mon_num]]}
                  </h2>
                </div>
                <div className="pokedex-body">
                  <img
                    className="pokedex-sprite"
                    src={
                      shinyMode
                        ? allPokemonSprites[typePokemon[mon_num]].FrontShiny
                        : allPokemonSprites[typePokemon[mon_num]].FrontDefault
                    }
                    onClick={() => clickPokemon(typePokemon[mon_num])}
                  />
                </div>
                <div className="pokedex-footer">
                  {Object.keys(pokemonTypingChart).includes(
                    typePokemon[mon_num]
                  ) ? (
                    pokemonTypingChart[typePokemonNames[mon_num]].map(
                      (mon_type) => (
                        <img
                          key={mon_type}
                          className="pokedex-type"
                          src={allTypeLogos[mon_type].TypeTextLogo}
                          onClick={() => clickType(mon_type)}
                        />
                      )
                    )
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
