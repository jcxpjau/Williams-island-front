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
import { useState, useRef } from "react";
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
} from "reactstrap";
import {
  BsFillPersonFill,
  BsPersonVcard,
  BsBuilding,
  BsAt,
  BsTelephone,
  BsPinMap,
  BsEnvelope,
} from "react-icons/bs";

import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { FaChild } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

// Constants for relationship options
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

// Helper function to get icon based on relationship
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
  const [ownerSaved, setOwnerSaved] = useState(false);
  const [member, setMember] = useState(null);
  const [dependants, setDependants] = useState([]);
  const [editingDependantIndex, setEditingDependantIndex] = useState(null);

  // State for Member Form
  const [memberForm, setMemberForm] = useState({
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
  });
  const memberFileInputRef = useRef(null);
  const [memberPreview, setMemberPreview] = useState(null);

  // State for Dependant Form
  const [dependantForm, setDependantForm] = useState({
    firstName: "",
    surname: "",
    birthday: "",
    dateJoined: "",
    relationship: "",
    email: "",
    phone: "",
  });
  const dependantFileInputRef = useRef(null);
  const [dependantPreview, setDependantPreview] = useState(null);

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
    const requiredFields = ["firstName", "surname"];
    const hasEmptyField = requiredFields.some(
      (field) => !memberForm[field]?.trim()
    );

    if (hasEmptyField) {
      alert("Please fill in all required fields for the property owner.");
      return;
    }

    alert(
      "Property owner successfully registered. You can now register dependants."
    );
    setMember(memberForm);
    setOwnerSaved(true);
  };

  const handleSaveDependant = () => {
    const requiredFields = [
      "firstName",
      "surname",
      /* "birthday",
      "dateJoined", */
      "relationship",
    ];
    const hasEmptyField = requiredFields.some(
      (field) => !dependantForm[field]?.trim()
    );

    if (hasEmptyField) {
      alert("Please fill in all required fields for the dependant.");
      return;
    }

    if (editingDependantIndex !== null) {
      // Update existing dependant
      const updatedDependants = [...dependants];
      updatedDependants[editingDependantIndex] = dependantForm;
      setDependants(updatedDependants);
      setEditingDependantIndex(null); // Reset editing state
      alert("Dependant updated successfully!");
    } else {
      // Add new dependant
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
        alert("This dependant is already registered.");
      }
    }

    // Reset dependant form after successful submission/update
    setDependantForm({
      firstName: "",
      surname: "",
      birthday: "",
      dateJoined: "",
      relationship: "",
      email: "",
      phone: "",
    });
    setDependantPreview(null);
  };

  const handleEditDependant = (dependantToEdit, index) => {
    if (!ownerSaved) {
      alert("Please save the Property Owner first.");
      return;
    }
    setDependantForm(dependantToEdit);
    setEditingDependantIndex(index);
    setActiveTab("dependant");
  };

  const tabs = [
    { id: "member", label: "Property Owner Registration", disabled: false },
    { id: "dependant", label: "Dependant Registration", disabled: !ownerSaved },
  ];

  return (
    <>
      <UserHeader
        title="Add Member"
        description="In this page you can add a new member or change their information."
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit member information</h3>
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {member && (
                    <ListExistingItems.Item>
                      <BsFillPersonFill className="mr-2" size={20} />
                      <span>
                        {member.firstName} {member.surname} (property owner)
                      </span>
                    </ListExistingItems.Item>
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
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={() => {
                        if (ownerSaved) {
                          setActiveTab("dependant");
                          setDependantForm({
                            firstName: "",
                            surname: "",
                            birthday: "",
                            dateJoined: "",
                            relationship: "",
                            email: "",
                            phone: "",
                          });
                          setDependantPreview(null);
                          setEditingDependantIndex(null);
                        } else {
                          alert("Please save the Property Owner first.");
                        }
                      }}
                    >
                      + New dependant
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
