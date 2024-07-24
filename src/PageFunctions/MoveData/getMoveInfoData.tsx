import { React } from "react";
import allMoveData from "../../data/moveData/allMoveData.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import moveTargetAPIToDisplay from "../../data/moveTargetData/moveTargetAPIToDisplay.json";
import "../../PageStyle/Moves.css";
import "../../PageStyle/MoveColors.css";

export function getMoveInfoData(curMove, clickType) {
  console.log("Getting Move Info Data");
  if (curMove === "") {
    return "";
  }
  let moveInfo = (
    <div className={`move-container ${allMoveData[curMove].Type}`}>
      <div className="move-header">
        <div className="move-name">{moveAPIToDisplay[curMove]}</div>
        <img
          className="move-typing"
          src={allTypeLogos[allMoveData[curMove].Type].TypeTextLogo}
          onClick={() => clickType(allMoveData[curMove].Type)}
        />

        <div className="move-pp">
          <div className="move-item-title">PP</div>
          <div className="move-item-text">{allMoveData[curMove].PP}</div>
        </div>
        <div className="move-power">
          <div className="move-item-title">Power</div>
          <div className="move-item-text">{allMoveData[curMove].Power}</div>
        </div>
        <div className="move-damage-class">
          <img
            src={
              allDamageClassLogos[allMoveData[curMove]["Damage Class"]]
                .TypeLogoBDSP
            }
          />
        </div>
      </div>

      <div className="move-body">
        <div className="move-accuracy">
          <div className="move-item-title">Accuracy</div>
          <div className="move-item-text">{allMoveData[curMove].Accuracy}</div>
        </div>
        <div className="move-target">
          <div className="move-item-title">Target</div>
          <div className="move-item-text">
            {moveTargetAPIToDisplay[allMoveData[curMove].Target]}
          </div>
        </div>

        <div className="move-effect-chance">
          <div className="move-item-title">Effect Chance</div>
          <div className="move-item-text">
            {allMoveData[curMove]["Effect Chance"]}
          </div>
        </div>
      </div>

      <div className="move-footer">
        <div className="move-effects">
          <div className="move-item-title">Effects</div>
          <div className="move-item-text">{allMoveData[curMove].Effects}</div>
        </div>
      </div>
    </div>
  );

  return moveInfo;
}
