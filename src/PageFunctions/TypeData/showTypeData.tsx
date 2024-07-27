import allTypeData from "../../data/typeData/allTypeData.json";
import allTypeLogos from "../../data/typeData/allTypeLogos.json";
import "../../PageStyle/Types.css";

export function showTypeData(curType: string, clickType: CallableFunction) {
  return (
    <div>
      <div className="effective-container">
        <div className="effective-item">
          <div className="effective-title">Effectiveness To</div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">2x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].StrongTo.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].NormalTo.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1/2x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].WeakTo.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">0x To</div>
          <div className="effective-item-types">
            {allTypeData[curType].ImmuneTo.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="effective-container">
        <div className="effective-item">
          <div className="effective-title">Effectiveness From</div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">2x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].StrongFrom.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].NormalFrom.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">1/2x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].WeakFrom.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
        <div className="effective-item">
          <div className="effective-item-title">0x From</div>
          <div className="effective-item-types">
            {allTypeData[curType].ImmuneFrom.map((typing) => (
              <img
                key={typing}
                src={allTypeLogos[typing].TypeTextLogo}
                onClick={() => clickType(typing)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
