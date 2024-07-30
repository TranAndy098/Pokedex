import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import "../../PageStyle/Pokedex.css";

export function showMoveData(
  movePokemonLength: string[],
  shinyMode: boolean,
  clickPokemon: CallableFunction,
  movePokemon: string[],
  clickType: CallableFunction,
  movePokemonNames: string[],
  movePokemonEndpoint: string[]
) {
  return (
    <div>
      <h1>Pokemon</h1>
      <div className="pokedex-container">
        {movePokemonLength.map((mon_num) => (
          <div key={mon_num} className="pokedex-entry-box">
            <div className="pokedex-display">
              <img
                className="pokedex-sprite-display"
                src={
                  shinyMode
                    ? allPokemonSprites[movePokemon[mon_num]].FrontShiny
                    : allPokemonSprites[movePokemon[mon_num]].FrontDefault
                }
                onClick={() => clickPokemon(movePokemonEndpoint[mon_num])}
              />
            </div>
            <div className="pokedex-entry">
              <div className="pokedex-header">
                <h2
                  className="pokedex-name pokedex-header-item"
                  onClick={() => clickPokemon(movePokemonEndpoint[mon_num])}
                >
                  {pokemonAPIToDisplay[movePokemonNames[mon_num]]}
                </h2>
              </div>
              <div className="pokedex-body">
                <img
                  className="pokedex-sprite"
                  src={
                    shinyMode
                      ? allPokemonSprites[movePokemon[mon_num]].FrontShiny
                      : allPokemonSprites[movePokemon[mon_num]].FrontDefault
                  }
                  onClick={() => clickPokemon(movePokemonEndpoint[mon_num])}
                />
              </div>

              <div className="pokedex-footer">
                {Object.keys(pokemonTypingChart).includes(
                  movePokemon[mon_num]
                ) ? (
                  pokemonTypingChart[movePokemon[mon_num]].map((typing) => (
                    <img
                      key={typing}
                      className="pokedex-type"
                      src={allTypeLogos[typing].TypeTextLogo}
                      onClick={() => clickType(typing)}
                    ></img>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
