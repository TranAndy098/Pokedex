import { React, useState } from "react";
import axios from "axios";

function Entry({ curPokemon }) {
  const [value, setValue] = useState([]);

  async function fetchData(pokemon) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`,
        {
          responseType: "json",
        }
      );
      let overall = [];
      let cur = [];

      // Sprites
      cur.push(response.data.sprites.front_default);
      cur.push(response.data.sprites.back_default);
      cur.push(response.data.sprites.front_shiny);
      cur.push(response.data.sprites.back_shiny);

      overall.push([...cur]);
      cur = [];

      // types
      for (let i = 0; i < response.data.types.length; i++) {
        cur.push(response.data.types[i].type.name);
      }

      overall.push([...cur]);
      cur = [];

      // abilities
      for (let i = 0; i < response.data.abilities.length; i++) {
        if (response.data.abilities[i].is_hidden) {
          cur.push(`${response.data.abilities[i].ability.name} - hidden`);
        } else {
          cur.push(`${response.data.abilities[i].ability.name}`);
        }
      }

      overall.push([...cur]);
      cur = [];

      // stats
      for (let i = 0; i < response.data.stats.length; i++) {
        cur.push(
          `${response.data.stats[i].stat.name} ${response.data.stats[i].base_stat}`
        );
      }

      overall.push([...cur]);
      cur = [];

      // moves
      for (let i = 0; i < response.data.moves.length; i++) {
        cur.push(response.data.moves[i].move.name);
      }

      overall.push([...cur]);

      setValue(overall);
      console.log(value);
    } catch (error) {
      setValue([]);
    }
  }

  fetchData(curPokemon);

  return (
    <>
      <div>
        <h1>{curPokemon}'s Entry Page</h1>
      </div>

      {value.length > 0 ? (
        <div className="entry-data">
          <div className="sprites">
            <h2>Sprites</h2>
            <ul>
              {value[0].map((name) => (
                <img src={name}></img>
              ))}
            </ul>
          </div>
          <div className="types">
            <h2>Types</h2>
            <ul>
              {value[1].map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
          <div className="abilities">
            <h2>Abilities</h2>
            <ul>
              {value[2].map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
          <div className="stats">
            <h2>Stats</h2>
            <ul>
              {value[3].map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
          <div className="moves">
            <h2>Moves</h2>
            <ul>
              {value[4].map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h2>Error Entry</h2>
      )}
    </>
  );
}

export default Entry;
