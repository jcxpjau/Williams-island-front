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
import { useState, useEffect } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { BsBuilding, BsPeopleFill, BsEnvelope } from "react-icons/bs";
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ColorPicker } from "components/RegistrationForm/FormColorPicker";
import { ListExistingItems } from "components/ListExisting";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity";

const AddUnit = () => {
  const initialState = {
    address: "",
    denomination: "",
    numberOfInhabitants: "",
    numberOfStores: "",
    numberOfApartments: "",
    color: null,
  };

  const [form, setForm] = useState(initialState);

  const [loadedUnit, setLoadedUnit] = useState(null);
  const [editingUnitIndex, setEditingUnitIndex] = useState(null);

  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);

  //search states
  const [searchTerm, setSearchTerm] = useState("");
  const [foundResults, setFoundResults] = useState([]);

  //Modal controls
  const resetModal = () => {
    setModal(!modal);
    setModalTitle("");
    setModalBody("");
    setModalBtnTitle(null);
  };

  /*   useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await api.get("units");
        if (!data || data.length == 0) {
          return;
        }
        const mappedData = data.map((item) => ({
          id: item.id,
          address: item.address,
          denomination: item.denomination,
          numberOfInhabitants: item.numberOfInhabitants,
          numberOfStores: item.numberOfStores,
          numberOfApartments: item.numberOfApartments,
          color: item.color,
        }));
        setUnits(mappedData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUnits();
  }, []); */

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleColorChange = (colorValue) => {
    setForm((prevForm) => ({
      ...prevForm,
      color: colorValue.hex,
    }));
  };

  const getChangedFields = (original, updated) => {
    const changes = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        changes[key] = updated[key];
      }
    }
    return changes;
  };

  const handleSaveUnit = () => {
    if (
      !form.address ||
      !form.denomination ||
      form.numberOfInhabitants === "" ||
      form.numberOfStores === "" ||
      form.numberOfApartments === ""
    ) {
      setModal(true);
      setModalTitle("Incomplete register");
      setModalBody("Please fill in all required fields.");
      return;
    }

    if (loadedUnit) {
      const originalUnit = loadedUnit;
      const changedFields = getChangedFields(originalUnit, form);
      const putUnits = async () => {
        try {
          const { data } = await api.put(
            `units/${loadedUnit.id}`,
            changedFields
          );
          setLoadedUnit(data);
          setModal(true);
          setModalTitle("Unit sucessfully updated!");
          setModalBody(`Unit '${form.denomination}' was sucessfully updated`);
        } catch (err) {
          console.log(err);
        }
      };
      putUnits();
    } else {
      const postUnits = async () => {
        try {
          const { data } = await api.post("units", form);
          setLoadedUnit(data);
          setModal(true);
          setModalTitle("Unit sucessfully registered!");
          setModalBody(
            "You can edit its details by clicking the pencil icon next to its name if you need"
          );
        } catch (err) {
          console.log(err);
        }
      };
      postUnits();
    }

    /*     if (editingUnitIndex !== null) {
      const originalUnit = loadedUnit;
      const changedFields = getChangedFields(originalUnit, form);
      const putUnits = async () => {
        try {
          const { data } = await api.put(`units/${form.id}`, changedFields);
          setLoadedUnit(data);
          setModal(true);
          setModalTitle("Unit sucessfully updated!");
          setModalBody(`Unit '${form.denomination}' was sucessfully updated`);
        } catch (err) {
          console.log(err);
        }
      };
      putUnits();
    } else {
      const postUnits = async () => {
        try {
          const { data } = await api.post("units", form);
          console.log(data)
          setLoadedUnit(data);
          setModal(true);
          setModalTitle("Unit sucessfully registered!");
          setModalBody(
            "You can edit its details by clicking the pencil icon next to its name if you need"
          );
        } catch (err) {
          console.log(err);
        }
        postUnits();
      };
    } */
  };

  const handleDeleteUnit = () => {
    const id = loadedUnit.id;
    const deleteUnit = async () => {
      await api.delete(`units/${id}`);
      setLoadedUnit(null);
    };
    deleteUnit();
    setModal(false);
    setForm(initialState);
    resetModal();
  };

  const handleConfirmDeleteUnit = () => {
    setModal(true);
    setModalTitle("Delete unit");
    setModalBtnTitle("Confirm");
    setModalBody(
      `Are you sure you want to delete unit ${loadedUnit.denomination}? This may impact other registers`
    );
  };

  const handleResetForm = () => {
    setForm(initialState);
    setEditingUnitIndex(null);
  };

  const handleSelection = (selectedUnit) => {
    try {
      setFoundResults([]);
      setSearchTerm("");
      setLoadedUnit(selectedUnit)
      setForm(selectedUnit);
    } catch (err) {
      console.error("Error selecting unit:", err);
      setModal(true);
      setModalTitle("Selection error");
      setModalBody("An error occurred while selecting the unit.");
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setModal(true);
      setModalTitle("Incomplete search");
      setModalBody("Please type a search term (name or ID).");
      return;
    }

    const parsedSearchTerm = parseInt(searchTerm.trim(), 10);
    const isIdSearch = Number.isInteger(parsedSearchTerm);

    try {
      let foundUnits = [];

      if (isIdSearch) {
        try {
          const { data: unitData } = await api.get(`units/${parsedSearchTerm}`);
          if (unitData) {
            foundUnits.push(unitData);
          }
        } catch (err) {
          console.log("No unit found with this ID.");
        }
      } else {
    
        try {
          const { data: unitsData } = await api.get(`units`, {
            params: { denomination: searchTerm},
          });
          if (unitsData && unitsData.length > 0) {
            foundUnits = unitsData;
          }
        } catch (err) {
          console.log("Error fetching units by denomination.");
        }
      }

      if (foundUnits.length > 0) {
        setFoundResults(foundUnits);
      } else {
        setModal(true);
        setModalTitle("No units found");
        setModalBody("No unit matches this search term.");
      }
    } catch (err) {
      console.error("Error during unit search:", err);
    }
  };

  return (
    <>
      <UserHeader
        title="Add Unit"
        description="In this page you can add residential units or edit their information."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit unit information</h3>
                <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder={"Search by name or id"}
                  foundResults={foundResults}
                  onMemberSelect={handleSelection}
                  setFoundResults={setFoundResults}
                />
                {foundResults.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelection(unit)}
                  >
                    {unit.denomination} (ID: {unit.id})
                  </button>
                ))}
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {loadedUnit ? (
                    <ListExistingItems.Item
                      /*  onEdit={() => handleEditUnit(loadedUnit, index)}
                        onDelete={() => handleConfirmDeleteUnit(unit, index)} */
                      onDelete={() => handleConfirmDeleteUnit()}
                    >
                      <BsBuilding color={loadedUnit.color} className="mr-2" />
                      <span style={{ color: loadedUnit.color }}>
                        {loadedUnit.denomination}
                      </span>
                    </ListExistingItems.Item>
                  ) : (
                    <span> No units registered yet. </span>
                  )}
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={handleResetForm}
                    >
                      + New unit
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
                  <h3 className="mb-0">
                    {editingUnitIndex !== null
                      ? "Edit Unit"
                      : "Unit Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title={"Unit information"}>
                    <RegistrationForm.Field
                      id="address"
                      label="Address"
                      type="text"
                      lg={8}
                      placeholder="Address"
                      icon={<BsEnvelope size={18} />}
                      value={form.address}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="denomination"
                      label="Denomination"
                      type="text"
                      lg={4}
                      placeholder="Denomination"
                      icon={<BsBuilding size={18} />}
                      value={form.denomination}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="numberOfInhabitants"
                      label="Number of inhabitants"
                      type="number"
                      lg={4}
                      placeholder="Number of inhabitants"
                      icon={<BsPeopleFill size={18} />}
                      value={form.numberOfInhabitants}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="numberOfStores"
                      label="Number of stores"
                      type="number"
                      lg={4}
                      placeholder="Number of stores"
                      icon={<BsBuilding size={18} />}
                      value={form.numberOfStores}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="numberOfApartments"
                      label="Number of apartments"
                      type="number"
                      lg={4}
                      placeholder="Number of apartments"
                      icon={<BsBuilding size={18} />}
                      value={form.numberOfApartments}
                      onChange={handleChange}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title={"Visualization"}>
                    <ColorPicker
                      label="Color"
                      id="color"
                      lg={6}
                      value={form.color}
                      onChange={handleColorChange}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveUnit} />
                </RegistrationForm.Root>
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
            onClick={handleDeleteUnit}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default AddUnit;
