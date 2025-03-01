import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import moveAPIToDisplay from "../../data/moveData/moveAPIToDisplay.json";
import "../../PageStyle/MovesForTypes.css";
import allMoveData from "../../data/moveData/allMoveData.json";
import allDamageClassLogos from "../../data/moveData/allDamageClassLogos.json";
import "../../PageStyle/MoveColors.css";

export function showTypeMoveData(
  typeMoves: string[],
  clickMove: CallableFunction,
  clickType: CallableFunction
) {
  return (
    <div>
      <div className="types-moves">
        <h1>Moves</h1>
        <div className="move-type-container">
          {typeMoves.map((moves) => (
            <div
              key={moves}
              className={`move-type-display ${allMoveData[moves].Type}`}
            >
              <div className="move-type-display-header">
                <div
                  className="move-type-display-name move-type-display-header-item"
                  onClick={() => clickMove(moves)}
                >
                  <div>{moveAPIToDisplay[moves]}</div>
                </div>
                <div className="move-type-display-damage-class move-type-display-header-item">
                  <img
                    className="move-type-display-damage-class-logo"
                    src={
                      allDamageClassLogos[allMoveData[moves]["Damage Class"]]
                        .TypeLogoBDSP
                    }
                  />
                </div>
              </div>
              <div className="move-type-display-footer">
                <div className="move-type-display-typing move-type-display-footer-item">
                  <img
                    className="move-type-display-types"
                    src={allTypeLogos[allMoveData[moves].Type].TypeTextLogo}
                    onClick={() => clickType(allMoveData[moves].Type)}
                  />
                </div>

                <div className="move-type-display-pp move-type-display-footer-item">
                  <div className="move-type-display-footer-subitem move-type-display-font">
                    PP {allMoveData[moves].PP}/{allMoveData[moves].PP}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
