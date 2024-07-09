import { React, useState } from "react";
import axios from "axios";

function Entry({ curPokemon, shinyMode }) {
  const [value, setValue] = useState([]);

  interface moveStruct {
    Name: string;
    URL: string;
    Accuracy: number | null;
    EffectChance: number | null;
    DamageClass: string;
    EffectEntry: string;
    Power: number | null;
    PP: number;
    Target: string;
    Type: string;
  }

  async function fetchMoveData(move) {
    try {
      let cur: moveStruct = {
        Name: "",
        URL: "",
        Accuracy: null,
        EffectChance: null,
        DamageClass: "",
        EffectEntry: "",
        Power: null,
        PP: 0,
        Target: "",
        Type: "",
      };

      cur.Name = move.name;
      cur.URL = move.url;
      const response = await axios.get(cur.URL, {
        responseType: "json",
      });

      cur.Accuracy = response.data.accuracy;
      cur.EffectChance = response.data.effect_chance;
      cur.DamageClass = response.data.damage_class.name;

      if (response.data.effect_entries.length > 0) {
        cur.EffectEntry = response.data.effect_entries[0].short_effect;
      }

      cur.Power = response.data.power;
      cur.PP = response.data.pp;
      cur.Target = response.data.target.name;
      cur.Type = response.data.type.name;

      return `Name: ${cur.Name}, Accuracy: ${
        cur.Accuracy ? typeof cur.Accuracy === "number" : "None"
      }, EffectChance: ${
        cur.EffectChance ? typeof cur.EffectChance === "number" : "None"
      }, DamageClass: ${cur.DamageClass}, EffectEntry: ${
        cur.EffectEntry
      }, Power: ${cur.Power ? typeof cur.Power === "number" : "None"}, PP: ${
        cur.PP
      }, Target: ${cur.Target}, Type: ${cur.Type}`;
    } catch (error) {
      return "";
    }
    return "";
  }

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
      if (shinyMode) {
        cur.push(response.data.sprites.front_shiny);
        cur.push(response.data.sprites.back_shiny);
      } else {
        cur.push(response.data.sprites.front_default);
        cur.push(response.data.sprites.back_default);
      }

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
        cur.push(await fetchMoveData(response.data.moves[i].move));
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
