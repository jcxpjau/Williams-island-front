import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { BsFillPersonFill, BsPeopleFill } from "react-icons/bs";

function SearchEntity({
  handleSearch,
  searchTerm,
  setSearchTerm,
  placeholder = "Search...",
  foundResults = [],
  onMemberSelect,
  setFoundResults,
}) {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (foundResults.length > 0) {
      setFoundResults([]);
    }
  };

  const handleResultClick = (item) => {
    onMemberSelect(item);
    setFoundResults([]);
  };

  const getIconForType = (type) => {
    if (type === "member") return <BsFillPersonFill className="mr-2" />;
    if (type === "dependant") return <BsPeopleFill className="mr-2" />;
    return null;
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

      {foundResults.length > 0 && (
        <div className="list-group mt-2">
          {foundResults.map((item) => (
            <button
              key={`${item.type}-${item.id || item.memberId}`}
              type="button"
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => handleResultClick(item)}
            >
              {getIconForType(item.type)}
              <span>
                {item.name} {item.surname} –{" "}
                {item.type === "member" ? "Member" : "Dependant"} (ID:{" "}
                {item.id || item.memberId})
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEntity;
