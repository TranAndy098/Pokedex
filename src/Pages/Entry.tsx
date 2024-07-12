import { React, useState, useMemo } from "react";
import axios from "axios";
import allMoveData from "../data/moveData/allMoveData.json";
import allPokemonEvolutions from "../data/pokemonData/allPokemonEvolutions.json";
import allPokemonSprites from "../data/pokemonData/allPokemonSprites.json";
import allSpecialPokemonForms from "../data/pokemonData/allSpecialPokemonForms.json";
import pokemonAPIToDisplay from "../data/pokemonData/pokemonAPIToDisplay.json";
import typeAPIToDisplay from "../data/typeData/typeAPIToDisplay.json";
import moveAPIToDisplay from "../data/moveData/moveAPIToDisplay.json";
import allTypeLogos from "../data/typeData/allTypeLogos.json";
import allDamageClassLogos from "../data/moveData/allDamageClassLogos.json";
import abilitiesAPIToDisplay from "../data/abilitiesData/abilitiesAPIToDisplay.json";
import statsAPIToDisplay from "../data/statsData/statsAPIToDisplay.json";
import moveTargetAPIToDisplay from "../data/moveTargetData/moveTargetAPIToDisplay.json";

function Entry({ curPokemon, shinyMode }) {
  const [value, setValue] = useState([]);
  const [evolutionLine, setEvolutionLine] = useState([]);
  const [differentForms, setDifferentForms] = useState([]);
  const [forms, setForms] = useState(false);
  console.log(curPokemon);

  function fetchMoveData(APImove) {
    console.log("move data");
    return (
      <div>
        <div className="name">
          <h1>{moveAPIToDisplay[APImove]}</h1>
        </div>

        <div className="accuracy">
          <h1>Accuracy</h1>
          <h3>{allMoveData[APImove].Accuracy}</h3>
        </div>

        <div className="effect-chance">
          <h1>Effect Chance</h1>
          <h3>{allMoveData[APImove]["Effect Chance"]}</h3>
        </div>

        <div className="damage-class">
          <h1>Damage Class</h1>
          <img
            src={
              allDamageClassLogos[allMoveData[APImove]["Damage Class"]]
                .TypeLogoBDSP
            }
          />
        </div>

        <div className="effects">
          <h1>Effects</h1>
          <h3>{allMoveData[APImove].Effects}</h3>
        </div>

        <div className="power">
          <h1>Power</h1>
          <h3>{allMoveData[APImove].Power}</h3>
        </div>

        <div className="pp">
          <h1>PP</h1>
          <h3>{allMoveData[APImove].PP}</h3>
        </div>

        <div className="target">
          <h1>Target</h1>
          <h3>{moveTargetAPIToDisplay[allMoveData[APImove].Target]}</h3>
        </div>

        <div className="typing">
          <h1>Type</h1>
          <img src={allTypeLogos[allMoveData[APImove].Type].TypeTextLogo} />
        </div>
      </div>
    );
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
      let hiddenAbilities = [];

      // abilities
      for (let i = 0; i < response.data.abilities.length; i++) {
        if (response.data.abilities[i].is_hidden) {
          hiddenAbilities.push(`${response.data.abilities[i].ability.name}`);
        } else {
          cur.push(`${response.data.abilities[i].ability.name}`);
        }
      }

      overall.push([...cur]);
      overall.push([...hiddenAbilities]);
      cur = [];

      // stats
      for (let i = 0; i < response.data.stats.length; i++) {
        cur.push(
          `${statsAPIToDisplay[response.data.stats[i].stat.name]} : ${
            response.data.stats[i].base_stat
          }`
        );
      }

      overall.push([...cur]);
      cur = [];

      // moves
      for (let i = 0; i < response.data.moves.length; i++) {
        cur.push(fetchMoveData(response.data.moves[i].move.name));
      }

      console.log("move data 2");

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
                <li>
                  {typeAPIToDisplay[name]}
                  <img src={allTypeLogos[name].TypeTextLogo} />
                </li>
              ))}
            </ul>
          </div>
          <div className="abilities">
            <h2>Abilities</h2>
            <ul>
              {value[2].map((name) => (
                <li>{abilitiesAPIToDisplay[name]}</li>
              ))}
            </ul>
          </div>
          <div className="hidden-abilities">
            <h2>Hidden Abilities</h2>
            <ul>
              {value[3].map((name) => (
                <li>{abilitiesAPIToDisplay[name]}</li>
              ))}
            </ul>
          </div>
          <div className="stats">
            <h2>Stats</h2>
            <ul>
              {value[4].map((name) => (
                <li>{name}</li>
              ))}
            </ul>
          </div>
          <div className="moves">
            <h2>Moves</h2>
            <ul>
              {value[5].map((name) => (
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
