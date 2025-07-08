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

import Header from "components/Headers/Header.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { ModalCustom as Modal } from "components/MessagePopUp";
import api from "services/api";
import SearchEntity from "./SearchEntity";
import {
  BsAt,
  BsCurrencyDollar,
  BsPersonVcard,
  BsTelephone,
} from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";

const AddStaff = () => {
  const initialState = {
    email: "",
    name: "",
    surname: "",
    position: "",
    pay: "",
    shiftStart: "",
    shiftEnd: "",
    services: "",
    experiences: "",
    phone: "",
    password: "",
    type: "",
  };

  const [loading, setLoading] = useState(false);
  //control form
  const [form, setForm] = useState(initialState);
  // control employee list
  const [employees, setEmployees] = useState([]);
  const [displayEmployees, setDisplayEmployees] = useState([]);
  // get experiences
  const [experiences, setExperiences] = useState([]);
  // control editing and deleting
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null);
  // control hidden password
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
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
    setEditingEmployeeId(null);
    setForm(initialState);
  };

  const handleSaveEmployee = () => {
    setModal(true);
    setModalTitle("Add employee");
    setModalBody("Employee successfully added");
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
        description="In this page you can add employees or edit their information."
      />
      <Container className="mt--7" fluid>
        <Row className="h-100 d-flex align-items-stretch">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow h-100 d-flex flex-column">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit employee information</h3>
                <div className="d-flex justify-content-end">
                  <ListExistingItems.Root>
                    <ListExistingItems.Button className="mt-4">
                      <Button
                        className="border-0 shadow-0 mx-0 mb-3"
                        onClick={handleResetForm}
                      >
                        + New employee
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
                  {displayEmployees.length === 0 && !loading ? (
                    <span> No employee found. </span>
                  ) : (
                    displayEmployees.map((exp, index) => (
                      <ListExistingItems.Item
                        key={index}
                        highlight={exp.id === editingEmployeeId}
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
                      <p> Loading employee </p>
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
                    {editingEmployeeId !== null
                      ? "Edit Employee"
                      : "Employee Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Personal information">
                    {editingEmployeeId && (
                      <div className="w-100">
                        <RegistrationForm.Field
                          label="Id"
                          id="id"
                          value={form.id}
                          type="text"
                          lg={1}
                          readOnly={true}
                        />
                      </div>
                    )}
                    <RegistrationForm.Field
                      label="First name"
                      id="name"
                      value={form.name}
                      placeholder="First name"
                      type="text"
                      onChange={handleChange}
                      lg={6}
                      icon={<BsPersonVcard className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Surname"
                      id="surname"
                      value={form.surname}
                      placeholder="Surname"
                      type="text"
                      onChange={handleChange}
                      lg={6}
                      icon={<BsPersonVcard className="mr-2" size={20} />}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title="Position information">
                    <RegistrationForm.Field
                      id="position"
                      label="Position"
                      value={form.position}
                      placeholder="Position title"
                      type="text"
                      onChange={handleChange}
                      lg={4}
                      icon={<BsPersonVcard className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      id="pay"
                      label="Hourly rate"
                      value={form.pay}
                      placeholder="XX"
                      onChange={handleChange}
                      lg={2}
                      type="number"
                      icon={<BsCurrencyDollar size={20} />}
                    />
                    <RegistrationForm.Field
                      id="shiftStart"
                      label="Shift start time"
                      value={form.shiftStart}
                      placeholder="09:00"
                      lg={2}
                      onChange={handleChange}
                      type="time"
                    />
                    <RegistrationForm.Field
                      id="shiftEnd"
                      label="Shift end time"
                      value={form.shiftEnd}
                      placeholder="17:00"
                      lg={2}
                      onChange={handleChange}
                      type="time"
                    />
                    <RegistrationForm.Field
                      id="experiences"
                      label="Experiences attended"
                      value={form.experiences}
                      onChange={handleChange}
                      lg={6}                      
                      type="text"
                    />
                    <RegistrationForm.Field
                      id="services"
                      label="Services attended"
                      value={form.services}
                      onChange={handleChange}
                      lg={6}                      
                      type="text"
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title="Contact information">
                    <RegistrationForm.Field
                      label="Phone"
                      id="phone"
                      value={form.phone}
                      placeholder="123-456-789"
                      type="number"
                      onChange={handleChange}
                      lg={6}
                      icon={<BsTelephone className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Email"
                      id="email"
                      value={form.email}
                      placeholder="youremail@provider.com"
                      type="email"
                      onChange={handleChange}
                      icon={<BsAt className="mr-2" size={20} />}
                    />
                  </RegistrationForm.Section>

                  <RegistrationForm.Section title="Account">
                    {editingEmployeeId && (
                      <div className="text-center row w-100 pl-3 m-0 mb-3">
                        <Button
                          color="secondary"
                          onClick={() => {
                            setCurrentPasswordVisible(!currentPasswordVisible);
                          }}
                        >
                          Change password
                        </Button>
                        <div
                          className={` mt-3 w-100 p-0 row ${
                            !currentPasswordVisible ? "d-none" : ""
                          }`}
                        >
                          <RegistrationForm.Field
                            label="New password"
                            id="password"
                            value={form.password || ""}
                            type="password"
                            placeholder={"Set your new password here"}
                            onChange={handleChange}
                            lg={6}
                            icon={<MdLockOutline className="mr-2" size={20} />}
                          />
                          <RegistrationForm.Field
                            label="Current password"
                            id="currentPassword"
                            value={currentPassword || ""}
                            type="password"
                            placeholder={
                              "Confirm your current password to carry out the change"
                            }
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            lg={6}
                            icon={<MdLockOutline className="mr-2" size={20} />}
                          />
                        </div>
                      </div>
                    )}
                    {!editingEmployeeId && (
                      <RegistrationForm.Field
                        label="Password"
                        id="password"
                        value={form.password || ""}
                        type="password"
                        placeholder={"Set the password here"}
                        onChange={handleChange}
                        lg={6}
                        icon={<MdLockOutline className="mr-2" size={20} />}
                      />
                    )}
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveEmployee} />
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
};

export default AddStaff;
