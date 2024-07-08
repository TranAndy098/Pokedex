import React, { useState, useEffect, useRef } from "react";
import DropDownButton from "../DropDownButton/DropDownButton";
import DropDownContent from "../DropDownContent/DropDownContent";
import "./DropDown.css";

const DropDown = ({ buttonText, content, open, setOpen }) => {
  const [dropdownTop, setDropdownTop] = useState(0);

  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();

  function toggleDropDown() {
    if (!open) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;

      const topPostion =
        spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;
      setDropdownTop(topPostion);
    }
    setOpen((open) => !open);
  }

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropDownButton
        ref={buttonRef}
        toggle={toggleDropDown}
        open={open}
        buttonText={buttonText}
      ></DropDownButton>{" "}
      <DropDownContent
        ref={contentRef}
        open={open}
        content={content}
        top={dropdownTop}
      ></DropDownContent>
    </div>
  );
};

export default DropDown;
