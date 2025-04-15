// src/components/Custom/SimpleFilterDropdown.jsx

import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const SimpleFilterDropdown = ({ label = "Filter", options = [] }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setDropdownOpen((prev) => !prev);

  const Select = (option) => {
    setSelected(option);
    setDropdownOpen(false);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="secondary" caret>
        {selected || label}
      </DropdownToggle>
      <DropdownMenu>
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
