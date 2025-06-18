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
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  BsFillPersonFill,
  BsPersonVcard,
  BsAt,
  BsTelephone,
  BsPinMap,
  BsEnvelope,
  BsSearch,
  BsPersonFill,
  BsCalendar,
  BsCurrencyDollar,
  BsHash,
  BsPlusCircle,
  BsDashCircle,
} from "react-icons/bs";

//import UserHeader from "components/Headers/UserHeader.js";
import Header from "components/Headers/Header";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { FaChild } from "react-icons/fa";
import { GiBigDiamondRing } from "react-icons/gi";
import { MdFamilyRestroom, MdOutlineFamilyRestroom } from "react-icons/md";
import { ModalCustom as Modal } from "components/MessagePopUp";
import SearchEntity from "./SearchEntity";
import api from "services/api";

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

const SetupMember = () => {
  const [activeTab, setActiveTab] = useState("member");

  // shows existing units
  const [units, setUnits] = useState([]);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await api.get("units");
        if (!data || data.length == 0) {
          return;
        }
        const mappedData = data.map((item) => ({
          value: item.id,
          label: item.denomination,
          color: item.color,
        }));
        setUnits(mappedData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUnits();
  }, []);

  // member control states
  const initialMemberFormState = {
    name: "",
    surname: "",
    email: "",
    memberNumber: "",
    address: "",
    tel: "",
    zipCode: "",
    dateOfBirth: "",
    dateJoined: "",
    lockerShare: "Sim",
  };
  const [memberForm, setMemberForm] = useState(initialMemberFormState);
  const memberFileInputRef = useRef(null);
  const [memberPreview, setMemberPreview] = useState(null);
  const [loadedMember, setLoadedMember] = useState(null);

  // dependant control states
  const initialDependantFormState = {
    name: "",
    surname: "",
    dateOfBirth: "",
    dateJoined: "",
    relationship: "",
    email: "",
    tel: "",
    associatedMemberId: "",
  };
  const [editingDependantIndex, setEditingDependantIndex] = useState(null);
  const [dependantForm, setDependantForm] = useState(initialDependantFormState);
  const dependantFileInputRef = useRef(null);
  const [dependantPreview, setDependantPreview] = useState(null);
  const [loadedDependants, setLoadedDependants] = useState([]);

  // property control states
  const initialPropertyFormState = {
    unitId: "",
    number: "",
    address: "",
  };
  const [propertiesForm, setPropertiesForm] = useState([
    initialPropertyFormState,
  ]);
  const [loadedProperties, setLoadedProperties] = useState([]);

  // state for header cards
  const [headerCards, setHeaderCards] = useState([]);
  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);

  //search states
  const [searchTerm, setSearchTerm] = useState("");
  const [foundMembersByName, setFoundMembersByName] = useState([]);
  const [searchType, setSearchType] = useState("member");

  //Modal controls
  const resetModal = () => {
    setModal(!modal);
    setModalTitle("");
    setModalBtnTitle(null);
  };

  // Helper functions
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
    if (loadedMember) {
      const { years, days } = calculateYearsAndDays(loadedMember.dateJoined);
      setHeaderCards([
        {
          title: "Property owner",
          value: `${loadedMember.name} ${loadedMember.surname}`,
          Icon: BsPersonFill,
          iconBg: "bg-primary",
          footerText: false,
        },
        {
          title: "Member for",
          value: `${years} Yrs, ${days} Days`,
          Icon: BsCalendar,
          iconBg: "bg-success",
          footerText: true,
          footerColor: "text-black",
          footerNote: `since ${loadedMember.dateJoined}`,
        },
        {
          title: "Number of Dependants",
          value: loadedDependants.length,
          Icon: MdOutlineFamilyRestroom,
          iconBg: "bg-info",
          footerText: false,
        },
        {
          title: "Expenses",
          value: "$2740",
          Icon: BsCurrencyDollar,
          iconBg: "bg-success",
          footerText: true,
          footerColor: "text-black",
          footerNote: "in the last three months",
        },
      ]);
    }
  }, [loadedMember, loadedDependants]);

  const getChangedFields = (original, updated) => {
    const changes = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        changes[key] = updated[key];
      }
    }
    return changes;
  };

  // Reseting handler
  const handleNewMemberForm = () => {
    setMemberForm(initialMemberFormState);
    setPropertiesForm([initialPropertyFormState]);
    setDependantForm(initialDependantFormState);
    setLoadedDependants([]);
    setLoadedMember(null);
    setLoadedProperties([]);
    setHeaderCards([]);
    setMemberPreview(null);
    setDependantPreview(null);
    setEditingDependantIndex(null);
    setSearchTerm("");
    setActiveTab("member");
  };

  // Property controls
  const handlePropertyChange = (index, e) => {
    const { id, value } = e.target;
    setPropertiesForm((prev) => {
      const updated = [...prev];
      updated[index][id] = value;
      return updated;
    });
  };

  const addProperty = () => {
    setPropertiesForm((prev) => [...prev, initialPropertyFormState]);
  };

  const removeProperty = (indexToRemove) => {
    setPropertiesForm((prevProperties) =>
      prevProperties.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSaveProperties = async (data) => {
    const updatedPropertiesForm = propertiesForm.map((property) => ({
      ...property,
      memberId: data.id,
    }));

    const postProperty = async (form) => {
      try {
        const { data } = await api.post("properties", form);
        setLoadedProperties((prev) => [...prev, data]);
      } catch (err) {
        console.error("Error creating property:", err);
      }
    };

    const putProperty = async (id, changes) => {
      try {
        const { data } = await api.put(`properties/${id}`, changes);
        setLoadedProperties((prev) =>
          prev.map((prop) => (prop.id === id ? data : prop))
        );
      } catch (err) {
        console.error("Error updating property:", err);
      }
    };

    const deleteProperty = async (id) => {
      try {
        await api.delete(`properties/${id}`);
        setLoadedProperties((prev) => prev.filter((prop) => prop.id !== id));
      } catch (err) {
        console.error(`Error deleting property id ${id}:`, err);
      }
    };

    try {
      if (loadedProperties && loadedProperties.length > 0) {
        const formIds = updatedPropertiesForm
          .filter((p) => p.id)
          .map((p) => p.id);

        const deletedProperties = loadedProperties.filter(
          (prop) => !formIds.includes(prop.id)
        );

        for (const prop of deletedProperties) {
          await deleteProperty(prop.id);
        }
      }

      for (const updatedProperty of updatedPropertiesForm) {
        if (updatedProperty.id) {
          const originalProperty = loadedProperties.find(
            (p) => p.id === updatedProperty.id
          );
          if (originalProperty) {
            const changedFields = getChangedFields(
              originalProperty,
              updatedProperty
            );
            if (Object.keys(changedFields).length > 0) {
              await putProperty(updatedProperty.id, changedFields);
            }
          }
        } else {
          await postProperty(updatedProperty);
        }
      }
    } catch (err) {
      console.error("Error processing properties:", err);
    }
  };

  // member controls
  const handleMemberFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setMemberPreview(imageURL);
    }
  };

  const handleMemberChange = (e) => {
    const { id, value } = e.target;
    setMemberForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveMember = () => {
    const requiredFields = [
      "name",
      "surname",
      "email",
      "memberNumber",
      "address",
      "tel",
      "zipCode",
      "dateOfBirth",
      "dateJoined",
    ];
    const hasEmptyField = requiredFields.some(
      (field) => !memberForm[field]?.trim()
    );

    const hasEmptyFieldsInProperties = () => {
      return propertiesForm.some((property) =>
        Object.values(property).some(
          (value) => value === "" || value === null || value === undefined
        )
      );
    };

    if (hasEmptyField || hasEmptyFieldsInProperties()) {
      setModal(true);
      setModalTitle("Incomplete register.");
      setModalBody(
        "Please fill in all required fields for the property owner."
      );
      return;
    }

    if (memberForm.id) {
      const changedFields = getChangedFields(loadedMember, memberForm);
      const patchMember = async () => {
        try {
          const { data } = await api.patch(
            `members/${memberForm.id}`,
            changedFields
          );
          await handleSaveProperties(data);
          setModal(true);
          setLoadedMember(memberForm);
          setModalTitle("Member sucessfully updated!");
          setModalBody(
            `Member '${memberForm.name} ${memberForm.surname}' was sucessfully updated`
          );
        } catch (err) {
          console.error(err);
        }
      };
      patchMember();
    } else {
      const postMemberAndProperties = async () => {
        let newMember = null;
        try {
          const { data } = await api.post("members", memberForm);
          newMember = data;

          await handleSaveProperties(data);
          setLoadedMember(data);
          setModal(true);
          setModalTitle("Property owner successfully registered.");
          setModalBody(
            "You can now register dependants or search for existing members."
          );
        } catch (err) {
          console.error("Error saving member or properties:", err);
          if (newMember && newMember.id) {
            try {
              await api.delete(`members/${newMember.id}`);
              console.log(`Rollback: Member with id ${newMember.id} deleted.`);
            } catch (deleteErr) {
              console.error(
                `Rollback failed: Could not delete member id ${newMember.id}:`,
                deleteErr
              );
            }
          }
          setModal(true);
          setModalTitle("Error during registration.");
          setModalBody(
            "There was an error saving the properties. Member creation has been cancelled."
          );
        }
      };
      postMemberAndProperties();
    }
  };

  const handleConfirmDeleteMember = (memberToDelete) => {
    setModal(true);
    setModalTitle("Delete member");
    setModalBtnTitle("Confirm");
    setModalBody(
      `Are you sure you want to delete member ${memberToDelete.name} ${memberToDelete.surname}? This may impact other registers`
    );
  };

  const handleDeleteMember = () => {
    const id = loadedMember.id;
    const deleteMember = async () => {
      await api.delete(`members/${id}`);
      setLoadedMember(null);
    };
    deleteMember();
    setModal(false);
    resetModal();
    handleNewMemberForm();
  };

  // Dependent controls
  const handleDependantFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setDependantPreview(imageURL);
    }
  };

  const handleDependantChange = (e) => {
    const { id, value } = e.target;
    setDependantForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveDependant = () => {
    const requiredFields = ["name", "surname", "relationship"];
    const hasEmptyField = requiredFields.some(
      (field) => !dependantForm[field]?.trim()
    );

    if (hasEmptyField) {
      setModal(true);
      setModalTitle("Incomplete register.");
      setModalBody("Please fill in all required fields for the dependant");
      return;
    }

    if (editingDependantIndex !== null) {
      const originalDependant = loadedDependants[editingDependantIndex];
      const changedFields = getChangedFields(originalDependant, dependantForm);
      const patchDependants = async () => {
        try {
          const { data } = await api.patch(
            `dependants/${dependantForm.id}`,
            changedFields
          );
          const updatedDependants = [...loadedDependants];
          updatedDependants[editingDependantIndex] = dependantForm;
          setLoadedDependants(updatedDependants);
          setModal(true);
          setModalTitle("Dependant sucessfully updated!");
          setModalBody(
            `Dependant '${dependantForm.name} ${dependantForm.surname}' was sucessfully updated`
          );
        } catch (err) {
          console.error(err);
        }
      };
      patchDependants();
    } else {
      dependantForm["associatedMemberId"] = loadedMember.id;
      const postDependants = async () => {
        try {
          const { data } = await api.post("dependants", dependantForm);
          setLoadedDependants((prev) => [...prev, data]);
          setModal(true);
          setModalTitle("Dependant sucessfully registered!");
          setModalBody(
            "You can edit their details by clicking the pencil icon next to its name if you need"
          );
        } catch (err) {
          console.error(err);
        }
      };
      postDependants();
    }
    setDependantForm(initialDependantFormState);
    setDependantPreview(null);
  };

  const handleDeleteDependant = (dependant, index) => {
    const id = dependant.id;
    const deleteDependant = async () => {
      await api.delete(`dependants/${id}`);
      setLoadedDependants((prevItems) =>
        prevItems.filter((item) => item.id != id)
      );
      setModal(true);
      setModalTitle("Dependant deleted");
      setModalBody(
        `Dependant ${dependant.name} ${dependant.surname} was successfully deleted`
      );
    };
    deleteDependant();
  };

  const handleEditDependant = (dependantToEdit, index) => {
    if (!loadedMember) {
      setModal(true);
      setModalTitle("Property owner not registered");
      setModalBody("Please save or load a property owner first.");
      return;
    }
    setDependantForm(dependantToEdit);
    setEditingDependantIndex(index);
    setActiveTab("dependant");
  };

  // search controls
  const handleSelection = async (selectedData) => {
    setLoadedProperties([]);
    setLoadedDependants([]);
    setFoundMembersByName([]);
    setSearchTerm("");

    let memberToLoad = null;
    let memberId = null;

    try {
      if (searchType === "member") {
        memberToLoad = selectedData;
        memberId = selectedData.id;
        setLoadedMember(memberToLoad);
        setMemberForm(memberToLoad);
      } else if (searchType === "dependant") {
        const dependant = selectedData;
        setDependantForm(selectedData);

        if (dependant && dependant.associatedMemberId) {
          const { data: associatedMemberData } = await api.get(
            `members/${dependant.associatedMemberId}`
          );

          if (associatedMemberData && associatedMemberData.id) {
            memberToLoad = associatedMemberData;
            memberId = associatedMemberData.id;
            setLoadedMember(memberToLoad);
            setMemberForm(memberToLoad);
          }
        }
      }

      if (memberToLoad && memberId) {
        const { data: allDependantsOfMember } = await api.get(
          `dependants/member/${memberId}`
        );
        setLoadedDependants(allDependantsOfMember);
        const { data: propertiesData } = await api.get(
          `properties/member/${memberId}`
        );
        setLoadedProperties(propertiesData);
        setPropertiesForm(propertiesData);
      }
    } catch (err) {
      console.error("Erro na seleção ou carregamento de dados:", err);
    }
  };

  const handleSearch = () => {
    handleNewMemberForm();

    if (!searchTerm.trim()) {
      setModal(true);
      setModalTitle("Busca Incompleta");
      setModalBody("Por favor, digite um termo de busca (nome ou ID).");
      return;
    }

    const parsedSearchTerm = parseInt(searchTerm.trim(), 10);
    const isIdSearch = Number.isInteger(parsedSearchTerm);

    if (searchType === "member") {
      if (isIdSearch) {
        console.log(parsedSearchTerm);
        const fetchMemberById = async () => {
          try {
            const { data: memberData } = await api.get(
              `members/${parsedSearchTerm}`
            );
            handleSelection(memberData);
          } catch (err) {
            console.error(err);
            setModal(true);
            setModalTitle("Member not found");
            setModalBody("No member found for the provided ID.");
          }
        };
        fetchMemberById();
      } else {
        const fetchMemberByName = async () => {
          try {
            const { data: membersFound } = await api.get(`members`, {
              params: { name: searchTerm.trim() },
            });

            if (membersFound && membersFound.length > 0) {
              if (membersFound.length === 1) {
                handleSelection(membersFound[0]);
              } else {
                setFoundMembersByName(membersFound);
              }
            } else {
              setModal(true);
              setModalTitle("No member found");
              setModalBody("No member was found with this search term");
            }
          } catch (err) {
            console.error(err);
            setModal(true);
          }
        };
        fetchMemberByName();
      }
    } else if (searchType === "dependant") {
      const fetchDependant = async () => {
        try {
          let dependantsFound = [];
          if (isIdSearch) {
            const { data } = await api.get(`dependants/${parsedSearchTerm}`);
            dependantsFound = data ? [data] : [];
          } else {
            const { data } = await api.get(`dependants`, {
              params: { name: searchTerm.trim() },
            });
            dependantsFound = data;
          }

          if (dependantsFound && dependantsFound.length > 0) {
            if (dependantsFound.length === 1) {
              const dependant = dependantsFound[0];
              handleSelection(dependant);
            } else {
              setFoundMembersByName(dependantsFound);
            }
          } else {
            setModal(true);
            setModalTitle("Dependant not found");
            setModalBody("No dependant was found for this search term.");
          }
        } catch (err) {
          console.error(err);
          setModal(true);
          setModalTitle("Dependant not found");
          setModalBody("No dependant was found for this ID.");
        }
      };
      fetchDependant();
    }
  };

  const tabs = [
    { id: "member", label: "Property Owner Registration", disabled: false },
    {
      id: "dependant",
      label: "Dependant Registration",
      disabled: !loadedMember,
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
                <FormGroup row className="mb-3 align-items-center">
                  <Label sm={3} className="mb-0">
                    Search For:
                  </Label>
                  <Col sm={9}>
                    <FormGroup check inline>
                      <Input
                        type="radio"
                        name="searchType"
                        value="member"
                        checked={searchType === "member"}
                        onChange={() => setSearchType("member")}
                        id="radioMember"
                      />
                      <Label check for="radioMember">
                        Member
                      </Label>
                    </FormGroup>
                    <FormGroup check inline className="ml-3">
                      <Input
                        type="radio"
                        name="searchType"
                        value="dependant"
                        checked={searchType === "dependant"}
                        onChange={() => setSearchType("dependant")}
                        id="radioDependant"
                      />
                      <Label check for="radioDependant">
                        Dependant
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder={"Search by name or memberId"}
                  foundMembers={foundMembersByName}
                  onMemberSelect={handleSelection}
                  setFoundMembers={setFoundMembersByName}
                />
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {loadedMember ? (
                    <ListExistingItems.Item
                      onEdit={() => {
                        setActiveTab("member");
                        setMemberForm(loadedMember);
                        setPropertiesForm(loadedProperties);
                      }}
                      onDelete={() => handleConfirmDeleteMember(loadedMember)}
                      isOwner={true}
                    >
                      <BsFillPersonFill className="mr-2" size={20} />
                      <span>
                        {loadedMember.name} {loadedMember.surname} (property
                        owner)
                      </span>
                    </ListExistingItems.Item>
                  ) : (
                    <span>
                      {" "}
                      No property owner loaded. Search, select or add a new one.{" "}
                    </span>
                  )}

                  {loadedDependants.length > 0 && (
                    <h5 className="mt-4 mb-2 text-muted">Dependants:</h5>
                  )}
                  {loadedDependants.map((d, idx) => (
                    <ListExistingItems.Item
                      key={idx}
                      onEdit={() => handleEditDependant(d, idx)}
                      onDelete={() => handleDeleteDependant(d, idx)}
                    >
                      {getIconForRelationship(d.relationship)}
                      <span>
                        {d.name} {d.surname} ({d.relationship})
                      </span>
                    </ListExistingItems.Item>
                  ))}
                  {loadedMember && (
                    <ListExistingItems.Button className="mt-2">
                      <Button
                        className="border-0 shadow-0 m-0"
                        onClick={() => {
                          if (loadedMember) {
                            setActiveTab("dependant");
                            setDependantForm(initialDependantFormState);
                            setDependantPreview(null);
                            setEditingDependantIndex(null);
                          } else {
                            setModal(true);
                            setModalTitle("Property owner not registered");
                            setModalBody(
                              "Please save or load a property owner first."
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
                              setModal(true);
                              setModalTitle("Property owner not registered");
                              setModalBody(
                                "Please save or load a property owner first."
                              );
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
                            id="name"
                            value={memberForm.name}
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
                            label="Date of birth"
                            id="dateOfBirth"
                            value={memberForm.dateOfBirth}
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
                          <RegistrationForm.Field
                            label="Member number"
                            id="memberNumber"
                            value={memberForm.memberNumber}
                            onChange={handleMemberChange}
                            placeholder="Your Williams Island identification"
                            type="text"
                            icon={<BsPersonVcard size={18} />}
                          />
                        </div>
                      </RegistrationForm.Section>

                      <RegistrationForm.Section title="Contact information">
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
                          id="tel"
                          value={memberForm.tel}
                          onChange={handleMemberChange}
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          type="tel"
                          placeholder="123-456-7890"
                          lg="6"
                          icon={<BsTelephone size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Secondary Address"
                          id="address"
                          value={memberForm.address}
                          onChange={handleMemberChange}
                          placeholder="Your secondary address"
                          md="6"
                          icon={<BsEnvelope size={18} />}
                        />
                        <RegistrationForm.Field
                          label="Postal code"
                          id="zipCode"
                          value={memberForm.zipCode}
                          onChange={handleMemberChange}
                          placeholder="Postal code"
                          type="text"
                          lg="6"
                          icon={<BsPinMap size={18} />}
                        />
                      </RegistrationForm.Section>

                      <RegistrationForm.Section
                        title="Property information"
                        rightContent={
                          <div className="d-flex justify-content-end w-100 mr-4">
                            <button
                              type="button"
                              onClick={addProperty}
                              className="btn d-flex align-items-center justify-content-center p-0 rounded-circle  hover-bg-light transition"
                            >
                              <BsPlusCircle size={20} />
                            </button>
                          </div>
                        }
                      >
                        {propertiesForm.map((property, index) => (
                          <>
                            <div className="d-flex w-100 flex-row justify-content-between mr-4 mt-1">
                              <h4 className="my-4"> Property #{index + 1}</h4>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => removeProperty(index)}
                                  className="bg-transparent border-0 d-flex align-items-center justify-content-center p-0"
                                >
                                  <BsDashCircle size={20} />
                                </button>
                              )}
                            </div>
                            <div
                              className="w-100 row py-4 rounded rounded-5"
                              style={{ backgroundColor: "#f0f4f7" }}
                            >
                              <RegistrationForm.Field
                                key={index}
                                label="Address"
                                id="address"
                                value={property.address}
                                onChange={(e) => handlePropertyChange(index, e)}
                                placeholder="Your William's Island address"
                                md="12"
                                icon={<BsEnvelope size={18} />}
                              />
                              <RegistrationForm.Field
                                key={index}
                                label="Number"
                                id="number"
                                type="text"
                                value={property.number}
                                onChange={(e) => handlePropertyChange(index, e)}
                                placeholder="Your property's number"
                                md="6"
                                icon={<BsHash size={18} />}
                              />
                              <RegistrationForm.Field
                                key={index}
                                label="Unit"
                                id="unitId"
                                value={property.unitId}
                                onChange={(e) => handlePropertyChange(index, e)}
                                placeholder="Your unit"
                                md="6"
                                type="select"
                                options={units}
                              />
                            </div>
                          </>
                        ))}
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
                            id="name"
                            label="First Name"
                            type="text"
                            value={dependantForm.name}
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
                            id="dateOfBirth"
                            label="Date of birth"
                            type="date"
                            value={dependantForm.dateOfBirth}
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
                          id="tel"
                          label="Phone number"
                          type="tel"
                          value={dependantForm.tel}
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

      <Modal.Root isOpen={modal} toggle={resetModal}>
        <Modal.Header toggle={resetModal} title={modalTitle} />
        <Modal.Body>{modalBody}</Modal.Body>
        {modalBtnTitle && (
          <Modal.Footer
            label={modalBtnTitle}
            onClick={handleDeleteMember}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default SetupMember;
