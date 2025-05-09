import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../Filter/Filter.css";

const SimpleFilterDropdown = ({ label = "Filter", options = [], onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setDropdownOpen((prev) => !prev);

  const Select = (option) => {
    setSelected(option);
    onChange( option );
    setDropdownOpen(false);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="custom-dropdown" direction="down">
      <DropdownToggle color="secondary" caret>
        {selected || label}
      </DropdownToggle>
      <DropdownMenu className="dropdown-left">
        {options.map((opt, index) => (
          <DropdownItem key={index} onClick={() => Select(opt)}>
            {opt}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SimpleFilterDropdown;
