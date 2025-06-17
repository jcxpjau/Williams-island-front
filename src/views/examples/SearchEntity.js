import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { BsSearch } from "react-icons/bs";
/* 
const familyData = [
  {
    propertyOwner: {
      firstName: "John",
      surname: "Doe",
      unit: "A101",
      birthday: "1980-05-15",
      dateJoined: "2020-01-01",
      address: "123 Main St",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      secondaryAddress: "456 Side Ave",
      city: "Springfield",
      country: "USA",
      postalCode: "12345",
    },
    dependants: [
      {
        firstName: "Jane",
        surname: "Doe",
        birthday: "2010-03-20",
        dateJoined: "2020-01-01",
        relationship: "child",
        email: "jane.doe@example.com",
        phone: "123-456-7890",
      },
      {
        firstName: "Robert",
        surname: "Doe",
        birthday: "1982-11-01",
        dateJoined: "2020-01-01",
        relationship: "spouse",
        email: "robert.doe@example.com",
        phone: "123-456-7890",
      },
    ],
  },
  {
    propertyOwner: {
      firstName: "Alice",
      surname: "Smith",
      unit: "B202",
      birthday: "1975-01-20",
      dateJoined: "2019-06-10",
      address: "789 Oak Ave",
      email: "alice.smith@example.com",
      phone: "987-654-3210",
      secondaryAddress: "",
      city: "Shelbyville",
      country: "USA",
      postalCode: "54321",
    },
    dependants: [
      {
        firstName: "Bob",
        surname: "Smith",
        birthday: "2005-09-05",
        dateJoined: "2019-06-10",
        relationship: "child",
        email: "bob.smith@example.com",
        phone: "987-654-3210",
      },
    ],
  },
]; */

function SearchEntity() {
  // search control states
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term (e.g., a dependant's name or email).");
      return;
    }
    /*     let foundOwner = null;
    let foundDependant = null;
    let foundFamily = null;

    foundOwner = familyData.find(
      (family) =>
        family.propertyOwner.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        family.propertyOwner.surname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        family.propertyOwner.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )?.propertyOwner;

    if (!foundOwner) {
      foundFamily = familyData.find((family) =>
        family.dependants.some(
          (dep) =>
            dep.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      if (foundFamily) {
        foundDependant = foundFamily.dependants.find(
          (dep) =>
            dep.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dep.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
    setModal(true);
    if (foundOwner) {
      setIsOwnerLoaded(true);
      setMemberForm(foundOwner);
      setDependants(
        familyData.find((f) => f.propertyOwner === foundOwner).dependants
      );
      setEditingDependantIndex(null);
      setActiveTab("member");
      setModalTitle(
        `Property owner found:  ${foundOwner.firstName} ${foundOwner.surname}`
      );
      setModalBody(
        `We have loaded their data to the form. You can edit fields as you wish`
      );
    } else if (foundDependant && foundFamily) {
      setIsOwnerLoaded(true);
      setMemberForm(foundFamily.propertyOwner);
      setDependants(foundFamily.dependants);
      const indexToEdit = foundFamily.dependants.findIndex(
        (dep) =>
          dep.firstName.toLowerCase() ===
            foundDependant.firstName.toLowerCase() &&
          dep.surname.toLowerCase() === foundDependant.surname.toLowerCase()
      );
      setDependantForm(foundDependant);
      setEditingDependantIndex(indexToEdit !== -1 ? indexToEdit : null);
      setActiveTab("dependant");
      setModalTitle(
        `Dependant found: ${foundDependant.firstName} ${foundDependant.surname} `
      );
      setModalBody(
        `This dependant is associated with the property owne ${foundFamily.propertyOwner.firstName} ${foundFamily.propertyOwner.surname}. We have loaded their data to the form. You can edit fields as you wish`
      );
    } else {
      setModalTitle("No members found");
      setModalBody(
        "Check your search terms for spelling or search for another name"
      );
    } */
    setSearchTerm("");
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
          placeholder="Search by name, email, id...."
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
    </div>
  );
}

export default SearchEntity;
