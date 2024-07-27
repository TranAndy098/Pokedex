import { useState } from "react";
import "./DropDownItem.css";

const DropDownItem = ({
  content,
  check,
  setMode1,
  setMode2,
  setOpen,
}: {
  content: string | number;
  check: string | number;
  setMode1: (mode1: string | number) => void;
  setMode2: (mode2: string) => void;
  setOpen: (open: boolean) => void;
}) => {
  function selectOption(value: string) {
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
