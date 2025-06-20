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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { BsAt, BsPersonVcard, BsShield, BsTelephone } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import api from "services/api";
import { ModalCustom as Modal } from "components/MessagePopUp";
import SearchEntity from "./SearchEntity"; 

const AddUser = () => {
  const initialState = {
    email: "",
    name: "",
    surname: "",
    phone: "",
    password: "",
    type: "",
  };

  // control form
  const [form, setForm] = useState(initialState);
  // control editing and deleting
  const [editingUserId, setEditingUserIndex] = useState(null); 
  const [deletingUserId, setDeletingUserId] = useState(null); 
  // control hidden password
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [originalPasswordForComparison, setOriginalPasswordForComparison] =
    useState("");
  // control user list
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]); 
  // save logged user
  const [loggedUserInfo, setLoggedUserInfo] = useState("");

  // modal state
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalBtnTitle, setModalBtnTitle] = useState(null); 
  // search state
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("users");
        if (!data || data.length === 0) {
          return;
        }

        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          surname: item.surname,
          phone: item.phone,
          email: item.email,
          password: item.password,
          type: item.type,
        }));
        setUsers(mappedData);
        setDisplayUsers(mappedData); 
      } catch (err) {
        console.log(err);
      }
    };

    const fetchMe = async () => {
      try {
        const { data } = await api.get("users/me");
        if (!data || data.length === 0) {
          return;
        }
        setLoggedUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMe();
    fetchUsers();
  }, []);


  useEffect(() => {
    if (editingUserIndex === null) {
      setCurrentPasswordVisible(false);
      setCurrentPassword(null);
      setOriginalPasswordForComparison("");
    } else {
      const userToEdit = users.find((user) => user.id === editingUserIndex);
      if (userToEdit) {
        setOriginalPasswordForComparison(userToEdit.password);
        setCurrentPasswordVisible(false); 
        setCurrentPassword(null); 
      }
    }
  }, [editingUserId, users]); 

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

  const handleSaveUser = () => {
    if (
      !form.name ||
      !form.surname ||
      !form.phone ||
      !form.email ||
      !form.type || 
      (!editingUserIndex && !form.password) 
    ) {
      setModal(true);
      setModalTitle("Incomplete register");
      setModalBody("Please fill in all required fields.");
      return;
    }

    if (editingUserIndex !== null) {
      const currentUser = users.find((user) => user.id === editingUserIndex)

      if (currentUser && currentUser.id === loggedUserInfo.id) {
        const originalUser = currentUser; 
        const changedFields = getChangedFields(originalUser, form);
        const { password, ...fieldsToSend } = changedFields;

        if (
          password &&
          password.trim() !== "" &&
          password !== originalPasswordForComparison
        ) {
          if (!currentPassword) {
            setModal(true);
            setModalTitle("Password update required");
            setModalBody("Please confirm your current password to update.");
            return;
          }

          const patchPassword = async () => {
            try {
              const { data } = await api.patch("users/me/password", {
                currentPassword: currentPassword,
                newPassword: password,
              });
              setModal(true);
              setModalTitle("Password updated");
              setModalBody(
                "User password successfully updated. You must use it from now on to login"
              );
            } catch (err) {
              console.log(err);
              setModal(true);
              setModalTitle("Password update failed");
              setModalBody(
                "Failed to update password. Please check your current password."
              );
            }
          };
          patchPassword();
        }

        if (
          Object.keys(fieldsToSend).length === 0 &&
          (!password ||
            password.trim() === "" ||
            password === originalPasswordForComparison)
        ) {
          setModal(true);
          setModalTitle("No changes detected");
          setModalBody("No information was changed for this user.");
          return;
        } else if (Object.keys(fieldsToSend).length > 0) {
          const patchChanges = async () => {
            try {
              const { data } = await api.patch("users/me", fieldsToSend);
              const updatedUsers = users.map(
                (user) =>
                  user.id === editingUserIndex
                    ? { ...form, password: user.password }
                    : user 
              );
              setUsers(updatedUsers);

              const lowerCaseSearchTerm = searchTerm.toLowerCase();
              const filteredDisplay = updatedUsers.filter((user) => {
                const name = user.name ? user.name.toLowerCase() : "";
                const surname = user.surname ? user.surname.toLowerCase() : "";
                const email = user.email ? user.email.toLowerCase() : "";
                return (
                  name.includes(lowerCaseSearchTerm) ||
                  surname.includes(lowerCaseSearchTerm) ||
                  email.includes(lowerCaseSearchTerm)
                );
              });
              setDisplayUsers(filteredDisplay);

              setModal(true);
              setModalTitle("User updated");
              setModalBody("User information has been successfully updated");
            } catch (err) {
              console.log(err);
              setModal(true);
              setModalTitle("Update failed");
              setModalBody("Failed to update user information.");
            }
          };
          patchChanges();
        }
      } else {
        setModal(true);
        setModalTitle("Unauthorized changes");
        setModalBody("You don't have permission to edit this user.");
      }
    } else {
      const postUsers = async () => {
        try {
          const { data } = await api.post("users", form);
          setUsers((prev) => [...prev, data]);
          setDisplayUsers((prev) => [...prev, data]); 
          setModal(true);
          setModalTitle("User registered");
          setModalBody(
            "User was successfully registered and can now be used to login"
          );
        } catch (err) {
          console.log(err);
          setModal(true);
          setModalTitle("Registration failed");
          setModalBody("Failed to register new user. Please try again.");
        }
      };
      postUsers();
    }
    handleResetForm();
  };

  const handleDeleteUser = () => {
    const userIdToDelete = deletingUserId;

    const deleteUser = async () => {
      try {
        await api.delete(`users/${userIdToDelete}`);
        const updatedUsers = users.filter((user) => user.id !== userIdToDelete);
        setUsers(updatedUsers);

        const updatedDisplay = displayUsers.filter(
          (user) => user.id !== userIdToDelete
        );
        setDisplayUsers(updatedDisplay);
        resetModal();
      } catch (err) {
        console.log(err);
        setModal(true);
        setModalTitle("Deletion failed");
        setModalBody("Failed to delete user.");
        setModalBtnTitle(null);
      }
    };
    deleteUser();
    setDeletingUserId(null);
    setForm(initialState);
  };

  const handleEditUser = (userToEdit) => {
    setForm(userToEdit);
    setEditingUserIndex(userToEdit.id);
    setOriginalPasswordForComparison(userToEdit.password); 
    setCurrentPasswordVisible(false); 
    setCurrentPassword(null); 
  };

  const handleConfirmDeleteUser = (userToEdit, index) => {
    setModal(true);
    setModalTitle("Delete user");
    setDeletingUserId(userToEdit.id); 
    setModalBtnTitle("Confirm");
    setModalBody(
      `Are you sure you want to delete user ${userToEdit.name} ${userToEdit.surname}? They will no longer be able to log into this system`
    );
  };

  const handleResetForm = () => {
    setForm(initialState);
    setEditingUserIndex(null); 
    setOriginalPasswordForComparison(""); 
    setCurrentPasswordVisible(false); 
    setCurrentPassword(null); 
  };

  // search controls
  const handleSearch = () => {
    if (searchTerm === "") {
      setModal(true);
      setModalTitle("Incomplete search");
      setModalBody("Please enter a valid name, surname, or email.");
      return;
    }

    const filteredUsers = users.filter((user) => {
      
      const name = user.name ? user.name.toLowerCase() : "";
      const surname = user.surname ? user.surname.toLowerCase() : "";
      const id = user.id ? user.id.toLowerCase() : "";
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return (
        name.includes(lowerCaseSearchTerm) ||
        surname.includes(lowerCaseSearchTerm) ||
        id.includes(lowerCaseSearchTerm)
      );
    });
    setDisplayUsers(filteredUsers);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDisplayUsers(users); 
  };

  return (
    <>
      <UserHeader
        title="Add User"
        description="In this page you can add a new user or change their information."
      />
  
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit user information</h3>
              
                <SearchEntity
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Search by name, surname or email"
                  onClearSearch={searchTerm ? clearSearch : null} 
                />
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {displayUsers.length === 0 ? ( 
                    <span> No users registered yet. </span>
                  ) : (
                    displayUsers.map(
                      (
                        user 
                      ) => (
                        <ListExistingItems.Item
                          key={user.id} 
                          onEdit={() => handleEditUser(user)}
                          showDelete={user.id !== loggedUserInfo.id}
                          onDelete={() => handleConfirmDeleteUser(user)}
                        >
                          <span>
                            {user.name} {user.surname}
                          </span>
                        </ListExistingItems.Item>
                      )
                    )
                  )}
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={handleResetForm}
                    >
                      + New user
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
                    {editingUserIndex !== null
                      ? "Edit User"
                      : "User Registration"}
                  </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Personal information">
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
                    <RegistrationForm.Field
                      label="Password"
                      id="password"
                      value={form.password}
                      placeholder={
                        editingUserIndex !== null
                          ? "Leave blank to keep current"
                          : ""
                      }
                      type="password"
                      onChange={(e) => {
                        handleChange(e); 
                        const isPasswordModified =
                          editingUserIndex !== null &&
                          (e.target.value !== originalPasswordForComparison ||
                            (originalPasswordForComparison === "" &&
                              e.target.value.trim() !== ""));

                        setCurrentPasswordVisible(isPasswordModified);
                        if (
                          editingUserIndex !== null &&
                          e.target.value === originalPasswordForComparison
                        ) {
                          setCurrentPassword(null);
                        }
                      }}
                      lg={6}
                      icon={<MdLockOutline className="mr-2" size={20} />}
                    />
                    <div
                      className={`col-lg-6 p-0 ${
                        !currentPasswordVisible ? "d-none" : ""
                      }`}
                    >
                      <RegistrationForm.Field
                        label="Confirm current password"
                        id="currentPassword"
                        value={currentPassword || ""}
                        type="password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        lg={6}
                        icon={<MdLockOutline className="mr-2" size={20} />}
                      />
                    </div>
                    <RegistrationForm.Field
                      label="Type"
                      id="type"
                      value={form.type}
                      placeholder=""
                      type="select"
                      options={[
                        { value: "", label: "Select user type" },
                        { value: "admin", label: "Admin" },
                      ]}
                      onChange={handleChange}
                      lg={6}
                      icon={<BsShield className="mr-2" size={20} />}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.SubmitBtn onClick={handleSaveUser} />
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
            onClick={handleDeleteUser}
          ></Modal.Footer>
        )}
      </Modal.Root>
    </>
  );
};

export default AddUser;
