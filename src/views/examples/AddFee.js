import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { BsCurrencyDollar, BsFillTagFill } from "react-icons/bs";
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity";
import { FaHome } from "react-icons/fa";
import { MdPets } from "react-icons/md";

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

  const [form, setForm] = useState(initialState);
  const [loadedFee, setLoadedFee] = useState(null);
  const [editingFeeIndex, setEditingFeeIndex] = useState(null);

  // Modal
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [foundResults, setFoundResults] = useState([]);

  const resetModal = () => {
    setModal(!modal);
    setModalTitle("");
    setModalBody("");
    setModalBtnTitle(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
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
  
  const handleSaveFee = async () => {
    if (!form.identifier || !form.category || !form.value) {
      setModal(true);
      setModalTitle("Incomplete register");
      setModalBody("Please fill in all required fields.");
      return;
    }

    const feeValue = parseFloat(form.value);
    if (isNaN(feeValue) || feeValue < 0) {
      setModalTitle("Invalid value");
      setModalBody("Please enter a valid positive number for the Fee Value.");
      return;
    }

    if (loadedFee) {
      const changedFields = getChangedFields(loadedFee, form);
      try {
        const { data } = await api.put(`fees/${loadedFee.id}`, changedFields);
        setLoadedFee(data);
        setModal(true);
        setModalTitle("Fee updated");
        setModalBody(`Fee '${form.identifier}' was updated.`);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { data } = await api.post("fees", form);
        console.log(data)
        setLoadedFee(data);
        setModal(true);
        setModalTitle("Fee registered");
        setModalBody("You can edit or delete it using the list on the left.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleResetForm = () => {
    setForm(initialState);
    setLoadedFee(null);
    setEditingFeeIndex(null);
  };

  const handleConfirmDeleteFee = () => {
    setModal(true);
    setModalTitle("Delete fee");
    setModalBtnTitle("Confirm");
    setModalBody(
      `Are you sure you want to delete fee '${loadedFee.identifier}'? This action cannot be undone.`
    );
  };

  const handleDeleteFee = async () => {
    try {
      await api.delete(`fees/${loadedFee.id}`);
      setLoadedFee(null);
      handleResetForm();
      resetModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelection = (fee) => {
    setFoundResults([]);
    setSearchTerm("");
    setLoadedFee(fee);
    setForm(fee);
  };

  const handleSearch = async () => {
    handleResetForm();

    if (!searchTerm.trim()) {
      setModal(true);
      setModalTitle("Incomplete search");
      setModalBody("Please type a search term (identifier or ID).");
      return;
    }

    const parsedId = parseInt(searchTerm.trim(), 10);
    const isIdSearch = Number.isInteger(parsedId);

    let foundFees = [];

    try {
      if (isIdSearch) {
        try {
          const { data: feeData } = await api.get(`fees/${parsedId}`);
          if (feeData) foundFees.push(feeData);
        } catch (err) {
          console.log("No fee found with this ID.");
        }
      } else {
        try {
          const { data: feeList } = await api.get("fees", {
            params: { identifier: searchTerm },
          });
          if (feeList && feeList.length > 0) {
            foundFees = feeList;
          }
        } catch (err) {
          console.log("Error fetching fees by identifier.");
        }
      }

      if (foundFees.length > 0) {
        setFoundResults(foundFees);
      } else {
        setModal(true);
        setModalTitle("No fees found");
        setModalBody("No fee matches this search term.");
        setSearchTerm("");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  console.log(loadedFee)
  return (
    <>
      <UserHeader
        title="Add Fee"
        description="In this page you can register and edit fees."
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="8" className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader>
                <h3 className="mb-0">
                  {loadedFee ? "Edit Fee" : "Fee Registration"}
                </h3>
              </CardHeader>
              <CardBody>
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
                      value={form.category}
                      onChange={handleChange}
                      options={CATEGORY_OPTIONS}
                    />
                    <RegistrationForm.Field
                      id="type"
                      label="Type"
                      type="select"
                      lg={3}
                      value={form.type}
                      onChange={handleChange}
                      options={[
                        { value: "Fixed", label: "Fixed" },
                        { value: "Percentual", label: "Percentage" },
                      ]}
                      icon={<BsCurrencyDollar size={18} />}
                    />
                    <RegistrationForm.Field
                      id="value"
                      label="Value"
                      type="number"
                      lg={3}
                      value={form.value}
                      onChange={handleChange}
                      placeholder="0.0"
                      icon={<BsCurrencyDollar size={18} />}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveFee} />
                </RegistrationForm.Root>
              </CardBody>
            </Card>
          </Col>

          <Col xl="4" className="order-xl-2 mb-5 mb-xl-0">
            <Card className="bg-secondary shadow">
              <CardHeader>
                <h3 className="mb-0">Search and Select Fee</h3>
                <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder={"Search by identifier or ID"}
                  foundResults={foundResults}
                  onMemberSelect={handleSelection}
                  setFoundResults={setFoundResults}
                />
                {foundResults.map((fee) => (
                  <button
                    key={fee.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelection(fee)}
                  >
                    {fee.identifier} (ID: {fee.id})
                  </button>
                ))}
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {loadedFee ? (
                    <ListExistingItems.Item onDelete={handleConfirmDeleteFee}>
                      <span>{loadedFee.identifier}</span>
                    </ListExistingItems.Item>
                  ) : (
                    <span>No fee selected.</span>
                  )}
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={handleResetForm}
                    >
                      + New Fee
                    </Button>
                  </ListExistingItems.Button>
                </ListExistingItems.Root>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal.Root isOpen={modal} toggle={resetModal}>
        <Modal.Header toggle={resetModal} title={modalTitle} />
        <Modal.Body>{modalBody}</Modal.Body>
        {modalBtnTitle && (
          <Modal.Footer label={modalBtnTitle} onClick={handleDeleteFee} />
        )}
      </Modal.Root>
    </>
  );
};

export default AddFee;
