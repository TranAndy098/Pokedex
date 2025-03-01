import allMoveData from "../../data/moveData/allMoveData.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import moveTargetAPIToDisplay from "../../data/moveTargetData/moveTargetAPIToDisplay.json";
import "../../PageStyle/MovesPokemon.css";
import "../../PageStyle/MoveColors.css";

export function getEntryMoveData(
  APImove: string,
  clickMove: CallableFunction,
  clickType: CallableFunction
) {
  console.log("Getting Pokemon Move Data");
  return (
    <div
      key={APImove}
      className={`move-pokemon-entry-box ${allMoveData[APImove].Type}`}
    >
      <div className="move-pokemon-display">
        <div className="move-pokemon-display-header">
          <div
            className="move-pokemon-display-name move-pokemon-display-header-item"
            onClick={() => clickMove(APImove)}
          >
            <div>{moveAPIToDisplay[APImove]}</div>
          </div>
          <div className="move-pokemon-display-damage-class move-pokemon-display-header-item">
            <img
              className="move-pokemon-display-damage-class-logo"
              src={
                allDamageClassLogos[allMoveData[APImove]["Damage Class"]]
                  .TypeLogoBDSP
              }
            />
          </div>
        </div>
        <div className="move-pokemon-display-footer">
          <div className="move-display-typing move-display-footer-item">
            <img
              className="move-pokemon-display-types"
              src={allTypeLogos[allMoveData[APImove].Type].TypeTextLogo}
              onClick={() => clickType(allMoveData[APImove].Type)}
            />
          </div>

          <div className="move-pokemon-display-pp move-pokemon-display-footer-item">
            <div className="move-pokemon-display-footer-subitem move-pokemon-display-font">
              PP {allMoveData[APImove].PP}/{allMoveData[APImove].PP}
            </div>
          </div>
        </div>
      </div>
      <div className={`move-pokemon-entry ${allMoveData[APImove].Type}`}>
        <div className="move-pokemon-header">
          <div
            className="move-pokemon-name move-pokemon-header-item"
            onClick={() => clickMove(APImove)}
          >
            <div>{moveAPIToDisplay[APImove]}</div>
          </div>

          <div className="move-pokemon-typing move-pokemon-header-item">
            <img
              className="move-pokemon-types"
              src={allTypeLogos[allMoveData[APImove].Type].TypeTextLogo}
              onClick={() => clickType(allMoveData[APImove].Type)}
            />
          </div>

          <div className="move-pokemon-pp move-pokemon-header-item">
            <div className="move-pokemon-header-subitem move-pokemon-font-title">
              PP
            </div>
            <div className="move-pokemon-header-subitem move-pokemon-font-text">
              {allMoveData[APImove].PP}
            </div>
          </div>

          <div className="move-pokemon-power move-pokemon-header-item">
            <div className="move-pokemon-header-subitem move-pokemon-font-title">
              Power
            </div>
            <div className="move-pokemon-header-subitem move-pokemon-font-text">
              {allMoveData[APImove].Power}
            </div>
          </div>

          <div className="move-pokemon-accuracy move-pokemon-header-item">
            <div className="move-pokemon-header-subitem move-pokemon-font-title">
              Accuracy
            </div>
            <div className="move-pokemon-header-subitem move-pokemon-font-text">
              {allMoveData[APImove].Accuracy}
            </div>
          </div>

          <div className="move-pokemon-damage-class move-pokemon-header-item">
            <img
              className="move-pokemon-damage-class-logo"
              src={
                allDamageClassLogos[allMoveData[APImove]["Damage Class"]]
                  .TypeLogoBDSP
              }
            />
          </div>
        </div>

        <div className="move-pokemon-footer">
          <div className="move-pokemon-effects move-pokemon-footer-item">
            <div className="move-pokemon-footer-subitem move-pokemon-font-title">
              Effects
            </div>
            <div className="move-pokemon-footer-subitem move-pokemon-font-text">
              {allMoveData[APImove].Effects}
            </div>
          </div>

          <div className="move-pokemon-effect-chance move-pokemon-footer-item">
            <div className="move-pokemon-footer-subitem  move-pokemon-font-title">
              Effect Chance
            </div>
            <div className="move-pokemon-footer-subitem move-pokemon-font-text">
              {allMoveData[APImove]["Effect Chance"]}
            </div>
          </div>

          <div className="move-pokemon-target move-pokemon-footer-item">
            <div className="move-pokemon-footer-subitem move-pokemon-font-title">
              Target
            </div>
            <div className="move-pokemon-footer-subitem move-pokemon-font-text">
              {moveTargetAPIToDisplay[allMoveData[APImove].Target]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
