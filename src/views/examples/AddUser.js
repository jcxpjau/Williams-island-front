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
import {
  BsAt,
  BsHash,
  BsPersonVcard,
  BsPhone,
  BsShield,
  BsTelephone,
} from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import api from "services/api";

const AddUser = () => {
  const initialState = {
    email: "",
    name: "",
    surname: "",
    phone: "",
    password: "",
    type: "",
  };

  const [form, setForm] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  console.log(users);

  useEffect(() => {
    console.log("effect");
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("users");
        //console.log(data);
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

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

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
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = form;
      //setUsers(updatedUsers);

      //alert("User updated successfully!");
    } else {
      const fetchUsers = async () => {
        try {
          const { data } = await api.post("users", form);
          //console.log("registered!")
          setUsers((prev) => [...prev, form]);
        } catch (err) {
          console.log(err);
        }
      };

      fetchUsers();
      //alert("User successfully registered!");
    }
    handleResetForm();
  };

  const handleEditUser = (userToEdit, index) => {
    setForm(userToEdit);
    setEditingUserIndex(index);
  };

  const handleResetForm = () => {
    setForm(initialState);
    setEditingUserIndex(null);
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
                      placeholder=""
                      type="number"
                      onChange={handleChange}
                      lg={6}
                      icon={<BsTelephone className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Email"
                      id="email"
                      value={form.email}
                      placeholder=""
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
                      onChange={handleChange}
                      lg={6}
                      icon={<MdLockOutline className="mr-2" size={20} />}
                    />
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
