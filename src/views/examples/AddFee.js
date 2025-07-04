/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect } from "react";
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
import { MdPets } from "react-icons/md";
import { FaCocktail, FaCoffee, FaHome, FaSpa } from "react-icons/fa";
import { FaPersonSwimming, FaSailboat } from "react-icons/fa6";

import Header from "components/Headers/Header.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { BsCurrencyDollar, BsFillTagFill } from "react-icons/bs";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity"; // Import the SearchEntity component

/* const CATEGORY_OPTIONS = [
  { value: "", label: "Select a category" },
  {
    value: "poa",
    label: "Property Owners Association",
    icon: <FaHome size={16} />,
  },
  { value: "sports", label: "Sports", icon: <MdSportsFootball size={16} /> },
  { value: "restaurant", label: "Restaurant", icon: <MdFastfood size={16} /> },
  { value: "cafe", label: "Cafe", icon: <FaCoffee size={16} /> },
  { value: "bar", label: "Bar", icon: <FaCocktail size={16} /> },
  { value: "pet", label: "Pets", icon: <MdPets size={16} /> },
  { value: "spa", label: "Spa", icon: <FaSpa size={16} /> },
  { value: "pool", label: "Pool", icon: <FaPersonSwimming size={16} /> },
  {
    value: "fitness",
    label: "Fitness",
    icon: <MdOutlineFitnessCenter size={16} />,
  },
  { value: "marina", label: "Marina", icon: <FaSailboat size={16} /> },
]; */

const CATEGORY_OPTIONS = [
  { value: "", label: "Select a category" },
  {
    value: "Default",
    label: "Default",
    icon: <FaHome size={16} />,
  },
  { value: "Pets", label: "Pets", icon: <MdPets size={16} /> },
];

const AddFee = () => {
  const initialState = {
    identifier: "",
    category: "",
    type: "",
    value: "",
  };

  // loading state
  const [loading, setLoading] = useState(true);
  //control form
  const [form, setForm] = useState(initialState);
  // control fee list
  const [fees, setFees] = useState([]);
  const [displayFees, setDisplayFees] = useState([]);
  // control editing and deleting
  const [editingFeeId, setEditingFeeId] = useState(null);
  const [deletingFeeId, setDeletingFeeId] = useState(0);
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
    const fetchFees = async () => {
      try {
        const { data } = await api.get("fees");
        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }
        const mappedData = data.data.map((item) => ({
          id: item.id,
          identifier: item.identifier,
          category: item.category,
          type: item.type,
          value: item.value,
        }));
        setFees(mappedData);
        setDisplayFees(mappedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchFees();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
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

  const handleSaveFee = () => {
    if (!form.category || !form.value || !form.identifier) {
      setModal(true);
      setModalTitle("Incomplete register");
      setModalBody("Please fill in all required fields.");
      return;
    }

    const feeValue = parseFloat(form.value);
    if (isNaN(feeValue) || feeValue < 0) {
      setModalTitle("Invalid register");
      setModalBody("Please enter a valid positive number for the Fee Value.");
      return;
    }

    if (editingFeeId !== null) {
      const originalFee = fees.find((fee) => fee.id === editingFeeId);
      const changedFields = getChangedFields(originalFee, form);
      const putFees = async () => {
        try {
          const { data } = await api.put(`fees/${form.id}`, changedFields);
          const updatedFees = fees.map((fee) =>
            fee.id === form.id ? form : fee
          );
          setFees(updatedFees);

          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          const filteredDisplay = updatedFees.filter((fee) => {
            const identifier = fee.identifier
              ? fee.identifier.toLowerCase()
              : "";
            const id = fee.id ? fee.id.toString().toLowerCase() : "";
            return (
              identifier.includes(lowerCaseSearchTerm) ||
              id.includes(lowerCaseSearchTerm)
            );
          });
          setDisplayFees(filteredDisplay);

          setModal(true);
          setModalTitle("Fee successfully updated!");
          setModalBody(`Fee '${form.identifier}' was successfully updated.`);
        } catch (err) {
          console.log(err);
        }
      };
      putFees();
    } else {
      const postFees = async () => {
        try {
          const { data } = await api.post("fees", form);
          setFees((prev) => [...prev, data]);
          setDisplayFees((prev) => [...prev, data]);
          setModal(true);
          setModalTitle("Fee successfully registered!");
          setModalBody(
            "You can edit its details by clicking the pencil icon next to its name if you need"
          );
        } catch (err) {
          console.log(err);
        }
      };
      postFees();
    }
  };

  const handleConfirmDeleteFee = (feeToEdit, index) => {
    setModal(true);
    setModalTitle("Delete fee");
    setDeletingFeeId(feeToEdit.id);
    setModalBtnTitle("Confirm");
    setModalBody(`Are you sure you want to delete ${feeToEdit.identifier}?`);
  };

  const handleDeleteFee = () => {
    const deleteFee = async () => {
      try {
        await api.delete(`fees/${deletingFeeId}`);
        const updatedFees = fees.filter((fee) => fee.id !== deletingFeeId);
        setFees(updatedFees);

        const updatedDisplay = displayFees.filter(
          (fee) => fee.id !== deletingFeeId
        );
        setDisplayFees(updatedDisplay);
      } catch (err) {
        console.log(err);
      }
    };
    deleteFee();
    setModal(false);
    setDeletingFeeId(null);
    setForm(initialState);
    resetModal();
  };

  const handleEditFee = (feeToEdit) => {
    setForm(feeToEdit);
    setEditingFeeId(feeToEdit.id);
  };

  const handleResetForm = () => {
    setForm(initialState);
    setEditingFeeId(null);
  };

  // search controls
  const handleSearch = (searchTerm) => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm === "") {
      setDisplayFees(fees);
      return;
    }
    const lowerCaseSearchTerm = trimmedTerm.toLowerCase();

    const filteredFees = fees.filter((fee) => {
      const identifier = fee.identifier ? fee.identifier.toLowerCase() : "";
      const id = fee.id ? fee.id.toString().toLowerCase() : "";

      return (
        identifier.includes(lowerCaseSearchTerm) ||
        id.includes(lowerCaseSearchTerm)
      );
    });
    setDisplayFees(filteredFees);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setEditingFeeId(null);
    setForm(initialState);
    setDisplayFees(fees);
  };

  return (
    <>
      <Header
        title="Add Fee"
        description="In this page you can register and set up new fees."
      />
      <Container className="mt--7" fluid>
        <Row className="h-100 d-flex align-items-stretch">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card
              className="bg-secondary shadow h-100 d-flex flex-column"
              style={{
                maxHeight: "460px",
              }}
            >
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit fees</h3>
                <div className="d-flex justify-content-end">
                  <ListExistingItems.Root>
                    <ListExistingItems.Button className="mt-4">
                      <Button
                        className="border-0 shadow-0 mx-0 mb-3"
                        onClick={handleResetForm}
                      >
                        + New fee
                      </Button>
                    </ListExistingItems.Button>
                  </ListExistingItems.Root>
                </div>
                <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search by description or id"
                  onClearSearch={clearSearch}
                />
              </CardHeader>
              <CardBody
                className="overflow-auto"
                style={{
                  flexGrow: 1,
                }}
              >
                <ListExistingItems.Root>
                  {displayFees.length === 0 && !loading ? (
                    <span> No fees found. </span>
                  ) : (
                    displayFees.map((fee, index) => (
                      <ListExistingItems.Item
                        key={fee.id}
                        highlight={fee.id === editingFeeId}
                        onEdit={() => handleEditFee(fee)}
                        onDelete={() => handleConfirmDeleteFee(fee, fee.id)}
                      >
                        {
                          CATEGORY_OPTIONS.find(
                            (option) => option.value === fee.category
                          )?.icon
                        }
                        <span className="ml-2">{fee.identifier}</span>
                      </ListExistingItems.Item>
                    ))
                  )}
                  {loading && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Spinner> </Spinner>
                      <p> Loading fees </p>
                    </div>
                  )}
                </ListExistingItems.Root>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card
              className="bg-secondary shadow h-100 d-flex flex-column"
              style={{
                maxHeight: "460px",
              }}
            >
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <h3 className="mb-0">
                    {editingFeeId !== null ? "Edit Fee" : "Fee Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody
                className="overflow-auto"
                style={{
                  flexGrow: 1,
                }}
              >
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Fee details">
                    <RegistrationForm.Field
                      id="identifier"
                      label="Identifier"
                      type="text"
                      lg={12}
                      placeholder="Fee name"
                      value={form.identifier}
                      onChange={handleChange}
                      icon={<BsFillTagFill size={18} />}
                    />
                    <RegistrationForm.Field
                      id="category"
                      label="Category"
                      type="select"
                      lg={6}
                      placeholder="Category"
                      value={form.category}
                      onChange={handleChange}
                      options={CATEGORY_OPTIONS}
                    />

                    <RegistrationForm.Field
                      id="type"
                      label="Type"
                      type="select"
                      lg={3}
                      placeholder="Type"
                      value={form.type}
                      onChange={handleChange}
                      options={[
                        {
                          value: "Fixed",
                          label: "Fixed",
                        },
                        {
                          value: "Percentual",
                          label: "Percentage",
                        },
                      ]}
                      icon={<BsCurrencyDollar size={18} />}
                    />

                    <RegistrationForm.Field
                      id="value"
                      label="Value"
                      type="number"
                      lg={3}
                      placeholder="0.0"
                      value={form.value}
                      onChange={handleChange}
                      icon={<BsCurrencyDollar size={18} />}
                    />
                  </RegistrationForm.Section>

                  <RegistrationForm.SubmitBtn onClick={handleSaveFee} />
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
            onClick={handleDeleteFee}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default AddFee;
