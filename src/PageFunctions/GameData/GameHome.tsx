import gamesLogos from "../../data/gameNameData/gamesLogos.json";
import gameVersionsPerGen from "../../data/gameNameData/gameVersionsPerGen.json";
import gamesAPIToDisplay from "../../data/gameNameData/gamesAPIToDisplay.json";
import "../../PageStyle/Games.css";

function GameHome({ clickGame }: { clickGame: CallableFunction }) {
  console.log("Getting Game Home");
  const genNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      {genNumbers.map((num) => (
        <div key={num}>
          <h2>Generation: {num}</h2>
          <div>
            {gameVersionsPerGen[num].map((versions) => (
              <div key={versions}>
                <div className="version-groups">
                  {versions.map((game) => (
                    <div key={game} className="version-items">
                      <div className="version-header">
                        <h4 className="game-name version-header-item">
                          {gamesAPIToDisplay[game]}
                        </h4>
                      </div>
                      <div className="version-body">
                        <img
                          className="game-art version-body-item"
                          src={gamesLogos[game]}
                          onClick={() => clickGame(game)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameHome;
