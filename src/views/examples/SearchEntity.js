import React, { useState, useEffect, useRef } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { BsSearch, BsX } from "react-icons/bs";

function SearchEntity({
  handleSearch,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  onClearSearch,
}) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearchTerm !== searchTerm) {
        setDebouncedSearchTerm(searchTerm);
        handleSearch(searchTerm);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, handleSearch, debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBlur = () => {
    handleSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
      e.target.blur();
    }
  };

  return (
    <div className="mt-3">
      <InputGroup className="input-group-alternative">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <BsSearch />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          innerRef={inputRef}
        />
        {onClearSearch && (
          <InputGroupAddon addonType="append">
            <InputGroupText
              style={{ cursor: "pointer" }}
              onClick={onClearSearch}
            >
              <BsX />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}

export default SearchEntity;
