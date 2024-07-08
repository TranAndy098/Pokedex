import React, { forwardRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./DropDownButton.css";

const DropDownButton = forwardRef((props, ref) => {
  const { toggle, open, buttonText } = props;

  return (
    <div
      onClick={toggle}
      className={`dropdown-btn ${open ? "button-open" : null}`}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="outer-wrapper">
        <div className="inner-wrapper">{buttonText}</div>
      </div>
      <span className="toggle-icon">
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
});

export default DropDownButton;
