import React from "react";
import "./DropDownItem.css";

const DropDownItem = ({ content, setMode, key }) => {
  function selectOption(value) {
    setMode(value);
  }

  return (
    <div onClick={() => selectOption(content)} className="dropdown-item">
      {content}
    </div>
  );
};

export default DropDownItem;
