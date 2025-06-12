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

const AddUser = () => {
  const initialState = {
    id: "",
    email: "",
    name: "",
    surname: "",
    phone: "",
    password: "",
    type: "",
  };

  const [form, setForm] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(-1);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [loggedUserInfo, setLoggedUserInfo] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("users");
        if (!data || data.length == 0) {
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
      } catch (err) {
        console.log(err);
      }
    };

    const fetchMe = async () => {
      try {
        const { data } = await api.get("users/me");
        if (!data || data.length == 0) {
          return;
        }
        setLoggedUserInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
    fetchMe();
  }, []);

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

  useEffect(() => {
    setCurrentPassword(null);
    setCurrentPasswordVisible(null);
  }, [editingUserIndex]);

  const handleSaveUser = () => {
    if (
      !form.name ||
      !form.surname ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.type
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingUserIndex !== null) {
      if (form.id == loggedUserInfo.id) {
        const originalUser = users[editingUserIndex];
        const changedFields = getChangedFields(originalUser, form);
        const { password, ...fieldsToSend } = changedFields;

        if (password) {
          const patchPassword = async () => {
            try {
              const { data } = await api.patch("users/me/password", {
                currentPassword: currentPassword,
                newPassword: password,
              });
            } catch (err) {
              console.log(err);
            }
          };
          patchPassword();
        }

        if (Object.keys(fieldsToSend).length === 0) {
          return;
        } else {
          const patchChanges = async () => {
            try {
              const { data } = await api.patch("users/me", fieldsToSend);
              const updatedUsers = [...users];
              updatedUsers[editingUserIndex] = form;
              setUsers(updatedUsers);
            } catch (err) {
              console.log(err);
            }
          };
          patchChanges();
        }
      } else {
        alert("You don't have pemission to edit this user");
      }
    } else {
      const postUsers = async () => {
        try {
          const { data } = await api.post("users", form);
        } catch (err) {
          console.log(err);
        }
      };
      postUsers();
    }
    handleResetForm();
  };

  const handleEditUser = (userToEdit, index) => {
    setForm(userToEdit);
    setEditingUserIndex(index);
  };

  const handleResetForm = () => {
    setForm(initialState);
    setEditingUserIndex(-1);
  };

  return (
    <>
      <UserHeader
        title="Add User"
        description="In this page you can add a new user or change their information."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit user information</h3>
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  {users.length === 0 ? (
                    <span> No users registered yet. </span>
                  ) : (
                    users.map((user, index) => (
                      <ListExistingItems.Item
                        key={index}
                        onEdit={() => handleEditUser(user, index)}
                      >
                        <span>
                          {user.name} {user.surname}
                        </span>
                      </ListExistingItems.Item>
                    ))
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
                      placeholder=""
                      type="password"
                      onChange={(e) => {
                        handleChange(e);
                        setCurrentPasswordVisible(
                          e.target.value.trim() !== "" && (editingUserIndex+1)
                        );
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
                        value={currentPassword}
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
    </>
  );
};

export default AddUser;
