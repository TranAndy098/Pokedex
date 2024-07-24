import { React } from "react";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import allPokemonSprites from "../../data/pokemonData/allPokemonSprites.json";
import pokedexPerGame from "../../data/gameNameData/pokedexPerGame.json";
import pokedexAPIToDisplay from "../../data/gameNameData/pokedexAPIToDisplay.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import pokemonTypingChart from "../../data/pokemonData/pokemonTypingChart.json";
import "../../PageStyle/Pokedex.css";

export function getGameData(
  curGame,

  clickPokemon,

  clickType,

  shinyMode
) {
  console.log("Getting Game Data");
  if (curGame === "") {
    return;
  }
  let overall = [];

  let pokedexes = Object.keys(pokedexPerGame[curGame]);

  for (let i = 0; i < pokedexes.length; i++) {
    let pokedex = pokedexes[i];
    overall.push(
      <div>
        <h3>{pokedexAPIToDisplay[pokedex]}</h3>
        <div className="pokedex-container">
          {Object.keys(pokedexPerGame[curGame][pokedex]).map((id) => (
            <div className="pokedex-entry-box">
              <div className="pokedex-display">
                <img
                  className="pokedex-sprite-display"
                  src={
                    shinyMode
                      ? allPokemonSprites[pokedexPerGame[curGame][pokedex][id]]
                          .FrontShiny
                      : allPokemonSprites[pokedexPerGame[curGame][pokedex][id]]
                          .FrontDefault
                  }
                  onClick={() =>
                    clickPokemon(pokedexPerGame[curGame][pokedex][id])
                  }
                />
              </div>
              <div className="pokedex-entry">
                <div className="pokedex-header">
                  <h2
                    className="pokedex-id pokedex-header-item"
                    onClick={() =>
                      clickPokemon(pokedexPerGame[curGame][pokedex][id])
                    }
                  >
                    {id}
                  </h2>
                  <h2
                    className="pokedex-name pokedex-header-item"
                    onClick={() =>
                      clickPokemon(pokedexPerGame[curGame][pokedex][id])
                    }
                  >
                    {pokemonAPIToDisplay[pokedexPerGame[curGame][pokedex][id]]}
                  </h2>
                </div>
                <div className="pokedex-body">
                  <img
                    className="pokedex-sprite"
                    src={
                      shinyMode
                        ? allPokemonSprites[
                            pokedexPerGame[curGame][pokedex][id]
                          ].FrontShiny
                        : allPokemonSprites[
                            pokedexPerGame[curGame][pokedex][id]
                          ].FrontDefault
                    }
                    onClick={() =>
                      clickPokemon(pokedexPerGame[curGame][pokedex][id])
                    }
                  />
                </div>
                <div className="pokedex-footer">
                  {pokemonTypingChart[pokedexPerGame[curGame][pokedex][id]].map(
                    (type) => (
                      <img
                        className="pokedex-type"
                        src={allTypeLogos[type].TypeTextLogo}
                        onClick={() => clickType(type)}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return overall;
}
