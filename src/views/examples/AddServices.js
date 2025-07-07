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
  BsCalendar,
  BsCardText,
  BsCurrencyDollar,
  BsEnvelope,
  BsPeopleFill,
  BsPinMap,
  BsTelephone,
} from "react-icons/bs";
import Header from "components/Headers/Header.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity";

function AddService() {
  const initialState = {
    name: "",
    description: "",
    experience: "",
    capacity: "",
    startTime: "",
    endTime: "",
    priceMin: "",
    priceMax: "",
    frequency: "",
    duration: "",
  };

  const [loading, setLoading] = useState(false);
  //control form
  const [form, setForm] = useState(initialState);
  // control service list
  const [services, setServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  // get experiences
  const [experiences, setExperiences] = useState([]);
  // control editing and deleting
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);
  // search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get("experiences");
        if (!data || data.data.length === 0) {
          setLoading(false);
          return;
        }
        const mappedData = data.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setExperiences(mappedData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setEditingServiceId(null);
    setForm(initialState);
  };

  const handleSaveService = () => {
    setModal(true);
    setModalTitle("Add service");
    setModalBody("Service successfully added");
  };

  const resetModal = () => {
    setModal(!modal);
    setModalTitle("");
    setModalBody("");
    setModalBtnTitle(null);
  };

  return (
    <>
      <Header
        title="Add Experience"
        description="In this page you can add experience or edit their information."
      />
      <Container className="mt--7" fluid>
        <Row className="h-100 d-flex align-items-stretch">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow h-100 d-flex flex-column">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit service information</h3>
                <div className="d-flex justify-content-end">
                  <ListExistingItems.Root>
                    <ListExistingItems.Button className="mt-4">
                      <Button
                        className="border-0 shadow-0 mx-0 mb-3"
                        onClick={handleResetForm}
                      >
                        + New service
                      </Button>
                    </ListExistingItems.Button>
                  </ListExistingItems.Root>
                </div>
                <SearchEntity
                  //handleSearch={handleSearch}
                  //searchTerm={searchTerm}
                  //setSearchTerm={setSearchTerm}
                  placeholder="Search by name or id"
                  //onClearSearch={clearSearch}
                />
              </CardHeader>
              <CardBody
                className="overflow-auto"
                style={{
                  flexGrow: 1,
                }}
              >
                <ListExistingItems.Root>
                  {displayServices.length === 0 && !loading ? (
                    <span> No services found. </span>
                  ) : (
                    displayServices.map((exp, index) => (
                      <ListExistingItems.Item
                        key={index}
                        highlight={exp.id === editingServiceId}
                        //onEdit={() => handleEditExperience(exp, index)}
                        //onDelete={() =>
                        // handleConfirmDeleteExperience(exp, exp.id)
                        //}
                      >
                        <span className="ml-2"> {exp.name} </span>
                      </ListExistingItems.Item>
                    ))
                  )}
                  {loading && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Spinner> </Spinner>
                      <p> Loading services </p>
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
                    {editingServiceId !== null
                      ? "Edit Service"
                      : "Service Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Service description">
                    {editingServiceId && (
                      <RegistrationForm.Field
                        label="Id"
                        id="id"
                        value={form.id}
                        type="text"
                        lg={1}
                        readOnly={true}
                      />
                    )}
                    <RegistrationForm.Field
                      id="name"
                      label="Name"
                      type="text"
                      lg={editingServiceId ? 11 : 12}
                      placeholder="Name"
                      icon={<BsCardText size={18} />}
                      value={form.name}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="description"
                      label="Description"
                      type="textarea"
                      lg={8}
                      placeholder="Description"
                      value={form.description}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="experience"
                      label="Experience"
                      type="select"
                      lg={4}
                      placeholder="Experience"
                      options = {experiences}
                      value={form.experience}
                      onChange={handleChange}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title="Details">
                    <RegistrationForm.Field
                      id="startTime"
                      label="Start time"
                      type="time"
                      lg={3}
                      placeholder="10:00"
                      value={form.startTime}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="endTime"
                      label="End time"
                      type="time"
                      lg={3}
                      placeholder="18:00"
                      value={form.endTime}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="duration"
                      label="Duration"
                      type="time"
                      lg={3}
                      placeholder="1:00"
                      value={form.duration}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="capacity"
                      label="Capacity"
                      type="number"
                      lg={3}
                      placeholder="0"
                      value={form.capacity}
                      onChange={handleChange}
                      icon={<BsPeopleFill size={18} />}
                    />
                    <RegistrationForm.Field
                      id="frequency"
                      label="Frequency"
                      type="text"
                      lg={8}
                      placeholder="Frequency"
                      value={form.frequency}
                      onChange={handleChange}
                      icon={<BsCalendar size={18} />}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title="Price Range">
                    <RegistrationForm.Field
                      id="priceMin"
                      label="Min"
                      type="number"
                      lg={4}
                      value={form.priceMin}
                      onChange={handleChange}
                      icon={<BsCurrencyDollar size={18} />}
                    />
                    <RegistrationForm.Field
                      id="priceMax"
                      label="Max"
                      type="number"
                      lg={4}
                      value={form.priceMax}
                      onChange={handleChange}
                      icon={<BsCurrencyDollar size={18} />}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveService} />
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
            //onClick={handleDeleteExperience}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
}

export default AddService;
