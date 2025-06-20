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
  Spinner,
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

  const [loading, setLoading] = useState(false);
  //control form
  const [form, setForm] = useState(initialState);
  // control unit list
  const [units, setUnits] = useState([]);
  const [displayUnits, setDisplayUnits] = useState([]);
  // control editing and deleting
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [deletingUnitId, setDeletingUnitId] = useState(0);
  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);
  // search state
  const [searchTerm, setSearchTerm] = useState("");

  //Modal controls
  const resetModal = () => {
    setModal(!modal);
    setModalTitle("");
    setModalBody("");
    setModalBtnTitle(null);
  };

  useEffect(() => {
    setLoading(true);
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
        setDisplayUnits(mappedData);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };

    fetchUnits();
  }, []);

  // form handlers
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

  // API requests
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

    if (editingUnitId !== null) {
      const putUnits = async () => {
        try {
          const originalUnit = units.find((unit) => unit.id === editingUnitId);
          const changedFields = getChangedFields(originalUnit, form);
          await api.put(`units/${form.id}`, changedFields);
          const updatedUnits = units.map((unit) =>
            unit.id === editingUnitId ? form : unit
          );
          setUnits(updatedUnits);
          const filteredUnits = updatedUnits.filter((unit) =>
            displayUnits.some((du) => du.id === unit.id)
          );
          setDisplayUnits(filteredUnits);
          setModal(true);
          setModalTitle("Unit successfully updated!");
          setModalBody(`Unit '${form.denomination}' was successfully updated.`);
        } catch (err) {
          console.log(err);
        }
      };
      putUnits();
    } else {
      const isDuplicate = units.some(
        (unit) =>
          unit.address === form.address ||
          unit.denomination === form.denomination
      );
      if (isDuplicate) {
        setModal(true);
        setModalTitle("Duplicated unit");
        setModalBody(
          "A unit with this address or denomination already exists."
        );
        return;
      } else {
        const postUnits = async () => {
          try {
            const { data } = await api.post("units", form);
            setDisplayUnits((prev) => [...prev, data]);
            setUnits((prev) => [...prev, data]);
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
    }
    handleResetForm();
  };

  const handleDeleteUnit = () => {
    const deleteUnit = async () => {
      try {
        await api.delete(`units/${deletingUnitId}`);
        const updatedUnits = units.filter((unit) => unit.id !== deletingUnitId);
        setUnits(updatedUnits);

        const updatedDisplay = displayUnits.filter(
          (unit) => unit.id !== deletingUnitId
        );
        setDisplayUnits(updatedDisplay);
      } catch (err) {
        console.log(err);
      }
    };
    deleteUnit();
    setModal(false);
    setDeletingUnitId(null);
    setForm(initialState);
    resetModal();
  };

  const handleEditUnit = (unitToEdit, index) => {
    setForm(unitToEdit);
    setEditingUnitId(unitToEdit.id);
  };

  const handleConfirmDeleteUnit = (unitToEdit, index) => {
    setModal(true);
    setModalTitle("Delete unit");
    setDeletingUnitId(index);
    setModalBtnTitle("Confirm");
    setModalBody(
      `Are you sure you want to delete unit ${unitToEdit.denomination}? This may impact other registers`
    );
  };

  const handleResetForm = () => {
    setEditingUnitId(null);
  };

  // search controls
  const handleSearch = (searchTerm) => {
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm === "") {
      setDisplayUnits(units);
      return;
    }

    const lowerCaseSearchTerm = trimmedTerm.toLowerCase();

    const filteredUnits = units.filter((unit) => {
      const denomination = unit.denomination
        ? unit.denomination.toLowerCase()
        : "";
      const id = unit.id ? unit.id.toString().toLowerCase() : "";

      return (
        denomination.includes(lowerCaseSearchTerm) ||
        id.includes(lowerCaseSearchTerm)
      );
    });

    setDisplayUnits(filteredUnits);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDisplayUnits(units);
  };

  return (
    <>
      <UserHeader
        title="Add Unit"
        description="In this page you can add residential units or edit their information."
      />
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
                  placeholder="Search by denomination or id"
                  onClearSearch={clearSearch}
                />
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {displayUnits.length === 0 && !loading ? (
                    <span> No units found. </span>
                  ) : (
                    displayUnits.map((unit, index) => (
                      <ListExistingItems.Item
                        key={index}
                        onEdit={() => handleEditUnit(unit, index)}
                        onDelete={() => handleConfirmDeleteUnit(unit, unit.id)}
                      >
                        <BsBuilding color={unit.color} className="mr-2" />
                        <span style={{ color: unit.color }}>
                          {unit.denomination}
                        </span>
                      </ListExistingItems.Item>
                    ))
                  )}
                   {loading && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Spinner> </Spinner>
                      <p> Loading units </p>
                    </div>
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
                    {editingUnitId !== null ? "Edit Unit" : "Unit Registration"}
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
