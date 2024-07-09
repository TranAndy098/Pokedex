import { React, useState } from "react";
import data from "../data/data.json";
import axios from "axios";

function Locations({ curPokemon }) {
  const [value, setValue] = useState([]);

  interface locationStruct {
    Game: string;
    Location: string;
    Method: string;
  }

  async function fetchData(pokemon) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/encounters`,
        {
          responseType: "json",
        }
      );
      let cur: string[] = [];
      for (let item in response.data) {
        //
        let game = response.data[item].version_details[0].version.name;
        let where = response.data[item].location_area.name;
        let method =
          response.data[item].version_details[0].encounter_details[0].method
            .name;

        let newLocation: locationStruct = {
          Game: game,
          Location: where,
          Method: method,
        };

        cur.push(newLocation);
        //cur.push(`Game:${game}, Where:${where}, Method:${method}\n`);
      }
      setValue(cur);
    } catch (error) {
      setValue([error.toString()]);
    }
  }

  fetchData(curPokemon);

  return (
    <div>
      <h1>{curPokemon}'s Locations Page</h1>
      <ul>
        {value.map((mon) => (
          <li>
            Game:{mon.Game}, Where:{mon.Location}, Method:{mon.Method}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
