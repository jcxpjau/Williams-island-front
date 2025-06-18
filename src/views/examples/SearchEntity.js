import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";

function SearchEntity({
  handleSearch,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  foundMembers = [],
  onMemberSelect,
  setFoundMembers, 
}) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (foundMembers.length > 0) {
      setFoundMembers([]);
    }
  };

  const handleMemberClick = (member) => {
    onMemberSelect(member);
    setFoundMembers([]); 
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
        <Button color="primary" onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </InputGroup>

      {foundMembers.length > 0 && (
        <div className="list-group mt-2"> 
          {foundMembers.map((member) => (
            <button
              key={member.id || member.memberId} members
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => handleMemberClick(member)}
              style={{ cursor: 'pointer' }} 
            >
              {member.name} {member.surname} (ID: {member.id || member.memberId})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEntity;