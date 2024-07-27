import { React } from "react";
import pokemonAPIToDisplay from "../../data/pokemonData/pokemonAPIToDisplay.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import abilitiesAPIToDisplay from "../../data/abilitiesData/abilitiesAPIToDisplay.json";
import "../../PageStyle/MovesPokemon.css";
import "../../PageStyle/EntryEncounters.css";
import "../../PageStyle/Entry.css";
import "../../PageStyle/MoveColors.css";

export function showEntryData(
  entryInfo,
  curPokemon,
  clickType,
  forms,
  differentForms,
  evolutionLine,
  gameLocations
) {
  return (
    <div>
      <div className="entry-data">
        <div className="entry-header">
          <div className="entry-header-front">
            <img className="entry-front-sprite" src={entryInfo[0][0]} />
          </div>

          <div className="entry-header-box">
            <div className="entry-name-types">
              <div className="entry-name">
                <div>{pokemonAPIToDisplay[curPokemon]}</div>
              </div>
              <div className="entry-types">
                {entryInfo[1].map((name) => (
                  <img
                    key={name}
                    className="entry-type"
                    onClick={() => clickType(name)}
                    src={allTypeLogos[name].TypeTextLogo}
                  />
                ))}
              </div>
            </div>

            <div className="entry-box-bottom">
              <img className="entry-back-sprite" src={entryInfo[0][1]} />

              <div className="entry-abilities">
                <div className="entry-ability">
                  <div className="entry-ability-title">Abilities</div>
                  <div className="entry-ability-data">
                    {entryInfo[2].map((name) => (
                      <div key={name} className="entry-ability-entry">
                        {abilitiesAPIToDisplay[name]}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="entry-hidden-ability">
                  <div className="entry-hidden-ability-title">
                    Hidden Abilities
                  </div>{" "}
                  {entryInfo[3].map((name) => (
                    <div key={name} className="entry-hidden-ability-data">
                      {abilitiesAPIToDisplay[name]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="entry-stats">
                <div className="entry-stat-title">Stats</div>

                <div className="entry-stat-data">
                  {entryInfo[4].map((name) => name)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="entry-body">
          {forms ? (
            <div className="entry-forms">
              <div className="entry-forms-title">Forms</div>
              <div className="entry-forms-data">
                {differentForms.map((differentForm) => {
                  return <div key={differentForm.key}>{differentForm}</div>;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="entry-footer">
          {evolutionLine.map((evolveLine) => {
            return (
              <div key={evolveLine.key} className="entry-evolutions">
                <div className="entry-evolutions-title">Evolutions</div>
                <div className="entry-evolutions-data">{evolveLine}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="entry-moves">
          <h2>Moves</h2>
          <div className="move-pokemon-container">
            {entryInfo[5].map((name) => (
              <div key={name.key}>{name}</div>
            ))}
          </div>
        </div>

        <div className="entry-locations">
          {gameLocations.length > 0 ? (
            <div className="locations">
              <h2>Locations</h2>
              <div className="locations-pokemon-container">
                {gameLocations.map((data) => (
                  <div key={data.key}>{data}</div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
