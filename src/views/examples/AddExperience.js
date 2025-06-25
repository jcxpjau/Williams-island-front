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
import {
  BsAt,
  BsCardText,
  BsCurrencyDollar,
  BsEnvelope,
  BsPeopleFill,
  BsPhone,
  BsPin,
  BsPinMap,
  BsTelephone,
} from "react-icons/bs";
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity";
import { FaCocktail, FaCoffee, FaHome, FaSpa } from "react-icons/fa";
import {
  MdFastfood,
  MdOutlineFitnessCenter,
  MdPets,
  MdSportsFootball,
} from "react-icons/md";
import { FaPersonSwimming, FaSailboat } from "react-icons/fa6";

const CATEGORY_OPTIONS = [
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
];

const AddExperience = () => {
  const initialState = {
    name: "",
    description: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    category: "",
    capacity: "",
    startTimeOperation: "",
    endTimeOperation: "",
    price: "",
    isActive: true,
    city: "Aventura",
    state: "Florida",
    country: "USA",
  };

  const [loading, setLoading] = useState(false);
  //control form
  const [form, setForm] = useState(initialState);
  // control experience list
  const [experiences, setExperiences] = useState([]);
  const [displayExperiences, setDisplayExperiences] = useState([]);
  // control editing and deleting
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [deletingExperienceId, setDeletingExperienceId] = useState(null);
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
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get("experiences");
        if (!data || data.length == 0) {
          return;
        }
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          address: item.address,
          postalCode: item.postalCode,
          phone: item.phone,
          email: item.email,
          category: item.category,
          capacity: item.capacity,
          startTimeOperation: item.startTimeOperation,
          endTimeOperation: item.endTimeOperation,
          price: item.price,
          isActive: true,
          city: "Aventura",
          state: "Florida",
          country: "USA",
        }));
        setExperiences(mappedData);
        setDisplayExperiences(mappedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExperiences();
  }, []);

  const handleResetForm = () => {
    setEditingExperienceId(null);
    setForm(initialState);
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

  console.log(form);
  const handleSaveExperience = () => {
    if (!form.address || !form.name) {
      setModal(true);
      setModalTitle("Incomplete register");
      setModalBody("Please fill in all required fields.");
      return;
    }

    if (editingExperienceId !== null) {
      const putExperiences = async () => {
        try {
          const originalExperience = experiences.find(
            (exp) => exp.id === editingExperienceId
          );
          const changedFields = getChangedFields(originalExperience, form);
          await api.put(`experiences/${form.id}`, changedFields);
          const updatedExperiences = experiences.map((exp) =>
            exp.id === editingExperienceId ? form : exp
          );
          setExperiences(updatedExperiences);
          const filteredExperiences = updatedExperiences.filter((exp) =>
            displayExperiences.some((de) => de.id === exp.id)
          );
          setDisplayExperiences(filteredExperiences);
          setModal(true);
          setModalTitle("Experience successfully updated!");
          setModalBody(`Experience '${form.name}' was successfully updated.`);
        } catch (err) {
          console.log(err);
        }
      };
      putExperiences();
    } else {
      const isDuplicate = experiences.some(
        (experience) => experience.name === form.name
      );
      if (isDuplicate) {
        setModal(true);
        setModalTitle("Experience unit");
        setModalBody("An experience with this name already exists.");
        return;
      } else {
        const postExperiences = async () => {
          try {
            const { data } = await api.post("experiences", form);
            setDisplayExperiences((prev) => [...prev, data]);
            setExperiences((prev) => [...prev, data]);
            setModal(true);
            setModalTitle("Experience sucessfully registered!");
            setModalBody(
              "You can edit its details by clicking the pencil icon next to its name if you need"
            );
          } catch (err) {
            console.log(err);
          }
        };
        postExperiences();
      }
    }
  };

  const handleEditExperience = (experienceToEdit, index) => {
    setForm(experienceToEdit);
    setEditingExperienceId(experienceToEdit.id);
  };
  // form handlers
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <>
      <UserHeader
        title="Add Experience"
        description="In this page you can add experience or edit their information."
      />
      <Container className="mt--7" fluid>
        <Row className="h-100 d-flex align-items-stretch">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow h-100 d-flex flex-column">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit unit information</h3>
                <div className="d-flex justify-content-end">
                  <ListExistingItems.Root>
                    <ListExistingItems.Button className="mt-4">
                      <Button
                        className="border-0 shadow-0 m-0"
                        onClick={handleResetForm}
                      >
                        + New experience
                      </Button>
                    </ListExistingItems.Button>
                  </ListExistingItems.Root>
                </div>
                {/*  <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search by denomination or id"
                  onClearSearch={clearSearch}
                /> */}
              </CardHeader>
              <CardBody
                className="overflow-auto"
                style={{
                  flexGrow: 1,
                }}
              >
                <ListExistingItems.Root>
                  {displayExperiences.length === 0 && !loading ? (
                    <span> No experiences found. </span>
                  ) : (
                    displayExperiences.map((exp, index) => (
                      <ListExistingItems.Item
                        key={index}
                        highlight={exp.id === editingExperienceId}
                        onEdit={() => handleEditExperience(exp, index)}
                        //onDelete={() => handleConfirmDeleteUnit(unit, unit.id)}
                      >
                        {exp.name}
                      </ListExistingItems.Item>
                    ))
                  )}
                  {loading && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Spinner> </Spinner>
                      <p> Loading experiences </p>
                    </div>
                  )}
                </ListExistingItems.Root>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow h-100 d-flex flex-column">
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <h3 className="mb-0">
                    {editingExperienceId !== null
                      ? "Edit Unit"
                      : "Unit Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Location">
                    <RegistrationForm.Field
                      id="name"
                      label="Name"
                      type="text"
                      lg={12}
                      placeholder="Name"
                      icon={<BsCardText size={18} />}
                      value={form.name}
                      onChange={handleChange}
                    />
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
                      id="postalCode"
                      label="Postal Code"
                      type="number"
                      lg={4}
                      placeholder="Postal Code"
                      icon={<BsPinMap size={18} />}
                      value={form.postalCode}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="category"
                      label="Category"
                      type="select"
                      lg={4}
                      placeholder="Category"
                      value={form.category}
                      onChange={handleChange}
                      options={CATEGORY_OPTIONS}
                    />
                    <RegistrationForm.Field
                      id="capacity"
                      label="Capacity"
                      type="number"
                      lg={2}
                      placeholder="X"
                      value={form.capacity}
                      icon={<BsPeopleFill size={18} />}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="startTimeOperation"
                      label="Opening hour"
                      type="time"
                      lg={2}
                      placeholder="08:00"
                      value={form.startTimeOperation}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="endTimeOperation"
                      label="Closing hour"
                      type="time"
                      lg={2}
                      placeholder="22:00"
                      value={form.endTimeOperation}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="price"
                      label="Price"
                      type="number"
                      lg={2}
                      placeholder=""
                      value={form.price}
                      icon={<BsCurrencyDollar size={18} />}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="description"
                      label="Description"
                      type="textarea"
                      lg={12}
                      placeholder="Experience description"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </RegistrationForm.Section>

                  <RegistrationForm.Section title="Contact information">
                    <RegistrationForm.Field
                      id="phone"
                      label="Phone"
                      type="phone"
                      lg={6}
                      placeholder="Phone number"
                      value={form.phone}
                      icon={<BsTelephone size={18} />}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="email"
                      label="Email"
                      type="email"
                      lg={6}
                      placeholder="Email"
                      value={form.email}
                      icon={<BsAt size={18} />}
                      onChange={handleChange}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveExperience} />
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
            //onClick={handleDeleteUnit}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default AddExperience;
