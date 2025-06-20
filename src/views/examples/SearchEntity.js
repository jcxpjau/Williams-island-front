import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { BsX } from "react-icons/bs";

function SearchEntity({
  handleSearch,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  onClearSearch
}) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        {onClearSearch && searchTerm && (
          <InputGroupAddon addonType="append">
            <InputGroupText
              style={{ cursor: "pointer" }}
              onClick={onClearSearch}
            >
              <BsX />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Button color="primary" onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchEntity;
