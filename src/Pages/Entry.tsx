import { React, useState, useMemo } from "react";
import axios from "axios";
import allMoveData from "../data/moveData/allMoveData.json";
import allPokemonEvolutions from "../data/pokemonData/allPokemonEvolutions.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import allSpecialPokemonForms from "../data/pokemonData/allSpecialPokemonForms.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";

function Entry({ curPokemon, shinyMode }) {
  const [value, setValue] = useState([]);
  const [evolutionLine, setEvolutionLine] = useState([]);
  const [differentForms, setDifferentForms] = useState([]);
  const [forms, setForms] = useState(false);
  console.log(curPokemon);

  interface moveStruct {
    Name: string;
    URL: string;
    Accuracy: number | string;
    EffectChance: number | string;
    DamageClass: string;
    Effect: string;
    Power: number | string;
    PP: number;
    Target: string;
    Type: string;
  }

  function fetchMoveData(APImove) {
    let cur: moveStruct = {
      Name: "",
      URL: "",
      Accuracy: "",
      EffectChance: "",
      DamageClass: "",
      Effect: "",
      Power: "",
      PP: 0,
      Target: "",
      Type: "",
    };
    cur.Name = allMoveData[APImove].realName;

    cur.Accuracy = allMoveData[APImove].Accuracy;
    cur.EffectChance = allMoveData[APImove]["Effect Chance"];
    cur.DamageClass = allMoveData[APImove]["Damage Class"];
    cur.EffectEntry = allMoveData[APImove].Effects;

    cur.Power = allMoveData[APImove].Power;
    cur.PP = allMoveData[APImove].PP;
    cur.Target = allMoveData[APImove].Target;
    cur.Type = allMoveData[APImove].Type;

    return `Name: ${cur.Name}, Accuracy: ${
      typeof cur.Accuracy === "number" ? cur.Accuracy : "---"
    }, EffectChance: ${
      typeof cur.EffectChance === "number" ? cur.EffectChance : "---"
    }, DamageClass: ${cur.DamageClass}, Effect: ${cur.EffectEntry}, Power: ${
      typeof cur.Power === "number" ? cur.Power : "---"
    }, PP: ${cur.PP}, Target: ${cur.Target}, Type: ${
      typeAPIToDisplay[cur.Type]
    }`;
  }

  function fetchFormData(pokemon) {
    console.log("form line");
    setForms(true);
    // evolve

    let mid = [];

    let allForms = allSpecialPokemonForms[pokemon];

    for (let i = 0; i < allForms.length; i++) {
      let name = Object.keys(allForms[i]);
      mid.push(
        <div>
          <p>{allForms[i][name].DisplayName}</p>
          <img
            src={
              shinyMode
                ? allForms[i][name].FrontShiny
                : allForms[i][name].FrontDefault
            }
          />
        </div>
      );
    }

    setDifferentForms(mid);
  }

  function fetchEvolutionLine(curPokemon) {
    console.log("Evolve line");
    // evolve
    let mid = [];
    let chains = allPokemonEvolutions[curPokemon].EvolveChain;

    for (let i = 0; i < allPokemonEvolutions[curPokemon].Size; i++) {
      let interm = [];
      for (let j = 0; j < chains[0].length; j++) {
        interm.push(
          <img
            src={
              shinyMode
                ? allPokemonSprites[chains[i][j]].FrontShiny
                : allPokemonSprites[chains[i][j]].FrontDefault
            }
          />
        );
      }
      mid.push(interm);
    }

    setEvolutionLine(mid);
  }

  async function fetchData(pokemon) {
    console.log("data line");
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        {
          responseType: "json",
        }
      );
      let overall = [];
      let cur = [];

      // Sprites
      if (shinyMode) {
        cur.push(allPokemonSprites[pokemon].FrontShiny);
        cur.push(allPokemonSprites[pokemon].BackShiny);
      } else {
        cur.push(allPokemonSprites[pokemon].FrontDefault);
        cur.push(allPokemonSprites[pokemon].BackDefault);
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
        cur.push(fetchMoveData(response.data.moves[i].move.name));
      }

      overall.push([...cur]);

      setValue(overall);
      setForms(false);
      setDifferentForms([]);

      console.log(9);

      if (Object.keys(allSpecialPokemonForms).includes(curPokemon)) {
        fetchFormData(curPokemon.toLowerCase());
      }
      console.log(8);
      // evolve
      fetchEvolutionLine(curPokemon);
      console.log(7);

      return overall;
    } catch (error) {
      setValue([]);
      return ["Error"];
    }
  }

  const reRending = useMemo(
    () => fetchData(curPokemon),
    [curPokemon, shinyMode]
  );

  return (
    <>
      <div>
        <h1>{pokemonAPIToDisplay[curPokemon]}'s Entry Page</h1>
      </div>

      {value.length > 0 ? (
        <div className="entry-data">
          <div className="sprites">
            <h2>Sprites</h2>
            <ul>
              {value[0].map((name) => (
                <img src={name} key={name}></img>
              ))}
            </ul>
          </div>
          {forms ? (
            <div className="forms">
              <h2>Forms</h2>
              <div>
                {differentForms.map((differentForm) => {
                  return <div>{differentForm}</div>;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="evolutions">
            <div>
              {evolutionLine.map((evolveLine) => {
                return (
                  <div>
                    <h2>Evolution</h2>
                    {evolveLine.map((member) => {
                      return <p>{member}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="types">
            <h2>Types</h2>
            <ul>
              {value[1].map((name) => (
                <li>{typeAPIToDisplay[name]}</li>
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
                <li>{[name]}</li>
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
