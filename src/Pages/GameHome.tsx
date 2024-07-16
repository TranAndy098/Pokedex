import { React, useState, useMemo } from "react";
import gamesLogos from "../data/gameNameData/gamesLogos.json";
import gamesPerGen from "../data/gameNameData/gamesPerGen.json";
import gamesAPIToDisplay from "../data/gameNameData/gamesAPIToDisplay.json";

function GameHome({ clickGame }) {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <h1>GameHome Page</h1>
      <div>
        {genNumbers.map((num) => (
          <div>
            <h2>Generation: {num}</h2>
            <ul>
              {gamesPerGen[num].map((game) => (
                <li>
                  <h4>{gamesAPIToDisplay[game]}</h4>
                  <img src={gamesLogos[game]} onClick={() => clickGame(game)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameHome;
