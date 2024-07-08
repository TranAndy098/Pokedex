import React from "react";
import "./DropDownItem.css";

const DropDownItem = ({ content, check, setMode1, setMode2, setOpen }) => {
  function selectOption(value) {
    if (check !== value) {
      setMode1(value);
      setMode2("");
    }
    setOpen(false);
  }

  return (
    <div onClick={() => selectOption(content)} className="dropdown-item">
      {content}
    </div>
  );
};

export default DropDownItem;
