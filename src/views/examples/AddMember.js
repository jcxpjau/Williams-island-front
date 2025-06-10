/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import {
  BsFillPersonFill,
  BsPersonVcard,
  BsBuilding,
  BsAt,
  BsTelephone,
  BsPinMap,
  BsEnvelope,
  BsSearch,
  BsPersonFill,
  BsCalendar,
  BsCurrencyDollar,
} from "react-icons/bs";

//import UserHeader from "components/Headers/UserHeader.js";
import Header from "components/Headers/Header";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { FaChild } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { MdFamilyRestroom, MdOutlineFamilyRestroom } from "react-icons/md";

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
];

const RELATIONSHIP_OPTIONS = [
  { value: "", label: "Select a relationship" },
  { value: "child", label: "Child", icon: <FaChild size={16} /> },
  {
    value: "spouse",
    label: "Spouse",
    icon: <GiBigDiamondRing size={16} />,
  },
  {
    value: "parent",
    label: "Parent",
    icon: <MdFamilyRestroom size={16} />,
  },
  {
    value: "visitor",
    label: "Visitor",
    icon: <BsPersonVcard size={16} />,
  },
];

const getIconForRelationship = (rel) => {
  const size = 20;
  switch (rel) {
    case "child":
      return <FaChild className="mr-2" size={size} />;
    case "spouse":
      return <GiBigDiamondRing className="mr-2" size={size} />;
    case "parent":
      return <MdFamilyRestroom className="mr-2" size={size} />;
    case "visitor":
      return <BsPersonVcard className="mr-2" size={size} />;
    default:
      return <BsPersonVcard className="mr-2" size={size} />;
  }
};

const AddMember = () => {
  const [activeTab, setActiveTab] = useState("member");
  // dependant control states
  const [dependants, setDependants] = useState([]);
  const [editingDependantIndex, setEditingDependantIndex] = useState(null);
  const initialMemberFormState = {
    firstName: "",
    surname: "",
    unit: "",
    birthday: "",
    dateJoined: "",
    address: "",
    email: "",
    phone: "",
    secondaryAddress: "",
    city: "",
    country: "",
    postalCode: "",
  };

  const initialDependantFormState = {
    firstName: "",
    surname: "",
    birthday: "",
    dateJoined: "",
    relationship: "",
    email: "",
    phone: "",
  };
  const [dependantForm, setDependantForm] = useState(initialDependantFormState);
  const dependantFileInputRef = useRef(null);
  const [dependantPreview, setDependantPreview] = useState(null);

  // member control states
  const [memberForm, setMemberForm] = useState(initialMemberFormState);
  const memberFileInputRef = useRef(null);
  const [memberPreview, setMemberPreview] = useState(null);
  const [isOwnerLoaded, setIsOwnerLoaded] = useState(false);

  // search control states
  const [searchTerm, setSearchTerm] = useState("");

  // state for header cards
  const [headerCards, setHeaderCards] = useState([]);

  // Dependent & owner controls
  const handleMemberFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setMemberPreview(imageURL);
    }
  };

  const handleDependantFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setDependantPreview(imageURL);
    }
  };

  const handleMemberChange = (e) => {
    const { id, value } = e.target;
    setMemberForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDependantChange = (e) => {
    const { id, value } = e.target;
    setDependantForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveMember = () => {
    const requiredFields = [
      "firstName",
      "surname" /* "unit", "address", "email", "phone" */,
    ];
    const hasEmptyField = requiredFields.some(
      (field) => !memberForm[field]?.trim()
    );

    if (hasEmptyField) {
      alert("Please fill in all required fields for the property owner.");
      return;
    }
    alert(
      "Property owner successfully registered. You can now register dependants or search for existing members."
    );
    setIsOwnerLoaded(true);
  };

  const handleSaveDependant = () => {
    const requiredFields = ["firstName", "surname", "relationship"];
    const hasEmptyField = requiredFields.some(
      (field) => !dependantForm[field]?.trim()
    );

    if (hasEmptyField) {
      alert("Please fill in all required fields for the dependant.");
      return;
    }

    if (editingDependantIndex !== null) {
      const updatedDependants = [...dependants];
      updatedDependants[editingDependantIndex] = dependantForm;
      setDependants(updatedDependants);
      setEditingDependantIndex(null);
      alert("Dependant updated successfully!");
    } else {
      const isDuplicate = dependants.some(
        (d) =>
          d.firstName === dependantForm.firstName &&
          d.surname === dependantForm.surname &&
          d.relationship === dependantForm.relationship
      );

      if (!isDuplicate) {
        setDependants((prev) => [...prev, dependantForm]);
        alert("Dependant successfully registered!");
      } else {
        alert("This dependant is already registered for this property owner.");
      }
    }
    setDependantForm(initialDependantFormState);
    setDependantPreview(null);
  };

  const handleEditDependant = (dependantToEdit, index) => {
    if (!isOwnerLoaded) {
      alert("Please save or load a Property Owner first.");
      return;
    }
    setDependantForm(dependantToEdit);
    setEditingDependantIndex(index);
    setActiveTab("dependant");
  };

  // Helper function to calculate years and days
  const calculateYearsAndDays = (startDateString) => {
    if (!startDateString) return { years: 0, days: 0 };
    const startDate = new Date(startDateString);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;

    return { years, days: remainingDays };
  };

  useEffect(() => {
    if (memberForm && memberForm.dateJoined) {
      const { years, days } = calculateYearsAndDays(memberForm.dateJoined);
      setHeaderCards([
        {
          title: "Property owner",
          value: `${memberForm.firstName} ${memberForm.surname}`,
          Icon: BsPersonFill,
          iconBg: "bg-primary",
          footerText: false,
          footerText: true,
          footerColor: "text-black",
          footerNote: `Unit ${memberForm.unit}`,
        },
        {
          title: "Member for",
          value: `${years} Yrs, ${days} Days`,
          Icon: BsCalendar,
          iconBg: "bg-success",
          footerText: true,
          footerColor: "text-black",
          footerNote: `since ${memberForm.dateJoined}`,
        },
        {
          title: "Number of Dependants",
          value: dependants.length,
          Icon: MdOutlineFamilyRestroom,
          iconBg: "bg-info",
          footerText: false,
        },
         {
          title: "Expenses",
          value: '$2740',
          Icon: BsCurrencyDollar,
          iconBg: "bg-success",
          footerText: true,
          footerColor: "text-black",
          footerNote: 'in the last three months',
        },
      ]);
    } else {
      setHeaderCards([]);
    }
  }, [memberForm, dependants]);

  // Searchbar handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term (e.g., a dependant's name or email).");
      return;
    }
    let foundOwner = null;
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

    if (foundOwner) {
      setIsOwnerLoaded(true);
      setMemberForm(foundOwner);
      setDependants(
        familyData.find((f) => f.propertyOwner === foundOwner).dependants
      );
      setEditingDependantIndex(null);
      setActiveTab("member");
      alert(
        `Property owner found: ${foundOwner.firstName} ${foundOwner.surname}`
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
      alert(
        `Dependant found: ${foundDependant.firstName} ${foundDependant.surname} (Associated property owner: ${foundFamily.propertyOwner.firstName} ${foundFamily.propertyOwner.surname})`
      );
    } else {
      alert("No members found");
      /* 
      setMemberForm(initialMemberFormState);
      setDependants([]);
      setDependantForm(initialDependantFormState);
      setEditingDependantIndex(null); */
    }
    setSearchTerm("");
  };

  // Reseting handler
  const handleNewMemberForm = () => {
    setMemberForm(initialMemberFormState);
    setMemberPreview(null);
    setDependants([]);
    setDependantForm(initialDependantFormState);
    setDependantPreview(null);
    setEditingDependantIndex(null);
    setActiveTab("member");
  };

  const tabs = [
    { id: "member", label: "Property Owner Registration", disabled: false },
    {
      id: "dependant",
      label: "Dependant Registration",
      disabled: !isOwnerLoaded,
    },
  ];

  return (
    <>
      <Header
        title="Add Member"
        description="In this page you can add a new member or change their information."
        height="600px"
        cards={headerCards}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit member information</h3>
                {/* --- Search Bar --- */}
                <div className="mt-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <BsSearch />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Search dependant or owner (e.g., name, email)"
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                    <Button
                      color="primary"
                      onClick={handleSearch}
                      className="ml-2"
                    >
                      Search
                    </Button>
                  </InputGroup>
                </div>
                {/* --- End Search Bar --- */}
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {isOwnerLoaded ? (
                    <ListExistingItems.Item
                      onEdit={() => {
                        setActiveTab("member");
                      }}
                      isOwner={true}
                    >
                      <BsFillPersonFill className="mr-2" size={20} />
                      <span>
                        {memberForm.firstName} {memberForm.surname} (property
                        owner)
                      </span>
                    </ListExistingItems.Item>
                  ) : (
                    <span>
                      {" "}
                      No property owner loaded. Search or add a new one.{" "}
                    </span>
                  )}

                  {dependants.length > 0 && (
                    <h5 className="mt-4 mb-2 text-muted">Dependants:</h5>
                  )}
                  {dependants.map((d, idx) => (
                    <ListExistingItems.Item
                      key={idx}
                      onEdit={() => handleEditDependant(d, idx)}
                    >
                      {getIconForRelationship(d.relationship)}
                      <span>
                        {d.firstName} {d.surname} ({d.relationship})
                      </span>
                    </ListExistingItems.Item>
                  ))}
                  {isOwnerLoaded && (
                    <ListExistingItems.Button className="mt-2">
                      <Button
                        className="border-0 shadow-0 m-0"
                        onClick={() => {
                          if (isOwnerLoaded) {
                            setActiveTab("dependant");
                            setDependantForm(initialDependantFormState);
                            setDependantPreview(null);
                            setEditingDependantIndex(null);
                          } else {
                            alert(
                              "Please save the Property Owner first to add dependants."
                            );
                          }
                        }}
                      >
                        + New dependant
                      </Button>
                    </ListExistingItems.Button>
                  )}
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={handleNewMemberForm}
                    >
                      Setup new property owner
                    </Button>
                  </ListExistingItems.Button>
                </ListExistingItems.Root>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <Nav tabs>
                    {tabs.map((tab) => (
                      <NavItem key={tab.id} className="mr-2">
                        <NavLink
                          className={activeTab === tab.id ? "active" : ""}
                          onClick={() => {
                            if (!tab.disabled) {
                              setActiveTab(tab.id);
                            } else {
                              alert("Please save the Property Owner first.");
                            }
                          }}
                          style={{
                            cursor: tab.disabled ? "not-allowed" : "pointer",
                            opacity: tab.disabled ? 0.6 : 1,
                          }}
                        >
                          <h3 className="mb-0">{tab.label}</h3>
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                </Col>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  {/* Member Form Tab Pane */}
                  <TabPane tabId="member">
                    <RegistrationForm.Root>
                      <RegistrationForm.Section title="Personal information">
                        <RegistrationForm.ProfilePicture
                          preview={memberPreview}
                          fileInputRef={memberFileInputRef}
                          handleFileChange={handleMemberFileChange}
                        />
                        <div className="col-lg-9 d-flex flex-column">
                          <RegistrationForm.Field
                            label="First Name"
                            id="firstName"
                            value={memberForm.firstName}
                            onChange={handleMemberChange}
                            placeholder="First Name"
                            icon={<BsPersonVcard size={18} />}
                          />
                          <RegistrationForm.Field
                            label="Surname"
                            id="surname"
                            value={memberForm.surname}
                            onChange={handleMemberChange}
                            placeholder="Surname"
                            icon={<BsPersonVcard size={18} />}
                          />
                          <RegistrationForm.Field
                            label="Unit"
                            id="unit"
                            value={memberForm.unit}
                            onChange={handleMemberChange}
                            placeholder="Your unit"
                            icon={<BsBuilding size={18} />}
                          />
                          <RegistrationForm.Field
                            label="Date of birth"
                            id="birthday"
                            value={memberForm.birthday}
                            onChange={handleMemberChange}
                            type="date"
                          />
                          <RegistrationForm.Field
                            label="Date joined"
                            id="dateJoined"
                            value={memberForm.dateJoined}
                            onChange={handleMemberChange}
                            type="date"
                          />
                        </div>
                      </RegistrationForm.Section>

                      <RegistrationForm.Section title="Contact information">
                        <RegistrationForm.Field
                          label="Address"
                          id="address"
                          value={memberForm.address}
                          onChange={handleMemberChange}
                          placeholder="Your William's Island address"
                          md="12"
                          icon={<BsEnvelope size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Email address"
                          id="email"
                          value={memberForm.email}
                          onChange={handleMemberChange}
                          type="email"
                          placeholder="youremail@provider.com"
                          lg="6"
                          icon={<BsAt size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Phone number"
                          id="phone"
                          value={memberForm.phone}
                          onChange={handleMemberChange}
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          type="tel"
                          placeholder="123-456-7890"
                          lg="6"
                          icon={<BsTelephone size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Secondary Address"
                          id="secondaryAddress"
                          value={memberForm.secondaryAddress}
                          onChange={handleMemberChange}
                          placeholder="Your secondary address"
                          md="12"
                          icon={<BsEnvelope size={18} />}
                        />
                        <RegistrationForm.Field
                          label="City"
                          id="city"
                          value={memberForm.city}
                          onChange={handleMemberChange}
                          placeholder="City"
                          lg="4"
                          icon={<BsPinMap size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Country"
                          id="country"
                          value={memberForm.country}
                          onChange={handleMemberChange}
                          placeholder="Country"
                          lg="4"
                          icon={<BsPinMap size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Postal code"
                          id="postalCode"
                          value={memberForm.postalCode}
                          onChange={handleMemberChange}
                          placeholder="Postal code"
                          type="number"
                          lg="4"
                          icon={<BsPinMap size={18} />}
                        />
                      </RegistrationForm.Section>

                      <RegistrationForm.SubmitBtn onClick={handleSaveMember} />
                    </RegistrationForm.Root>
                  </TabPane>

                  {/* Dependant Form Tab Pane */}
                  <TabPane tabId="dependant">
                    <RegistrationForm.Root>
                      <RegistrationForm.Section title="Personal information">
                        <RegistrationForm.ProfilePicture
                          preview={dependantPreview}
                          fileInputRef={dependantFileInputRef}
                          handleFileChange={handleDependantFileChange}
                        />
                        <div className="col-lg-9 d-flex flex-column">
                          <RegistrationForm.Field
                            id="firstName"
                            label="First Name"
                            type="text"
                            value={dependantForm.firstName}
                            onChange={handleDependantChange}
                            placeholder="First Name"
                          />
                          <RegistrationForm.Field
                            id="surname"
                            label="Surname"
                            type="text"
                            value={dependantForm.surname}
                            onChange={handleDependantChange}
                            placeholder="Surname"
                          />
                          <RegistrationForm.Field
                            id="birthday"
                            label="Date of birth"
                            type="date"
                            value={dependantForm.birthday}
                            onChange={handleDependantChange}
                          />
                          <RegistrationForm.Field
                            id="dateJoined"
                            label="Date joined"
                            type="date"
                            value={dependantForm.dateJoined}
                            onChange={handleDependantChange}
                          />
                          <RegistrationForm.Field
                            id="relationship"
                            label="Relationship to property owner"
                            type="select"
                            value={dependantForm.relationship}
                            onChange={handleDependantChange}
                            options={RELATIONSHIP_OPTIONS}
                          />
                        </div>
                      </RegistrationForm.Section>

                      <hr className="my-4" />

                      <RegistrationForm.Section title="Contact information">
                        <RegistrationForm.Field
                          id="email"
                          label="Email address"
                          type="email"
                          value={dependantForm.email}
                          onChange={handleDependantChange}
                          placeholder="youremail@provider.com"
                          icon={<BsAt size={18} />}
                        />

                        <RegistrationForm.Field
                          id="phone"
                          label="Phone number"
                          type="tel"
                          value={dependantForm.phone}
                          onChange={handleDependantChange}
                          placeholder="123-456-7890"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          icon={<BsTelephone size={18} />}
                        />
                      </RegistrationForm.Section>
                      <RegistrationForm.SubmitBtn
                        onClick={handleSaveDependant}
                      />
                    </RegistrationForm.Root>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddMember;
