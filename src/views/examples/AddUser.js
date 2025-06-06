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
import { useState, useRef } from "react";
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
import { FaBlackTie } from "react-icons/fa";

const AddUser = () => {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    permissions: "",
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <UserHeader
        title="Add User"
        description="In this page you can you add a new user or change their informations."
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
                  <ListExistingItems.Item>John Smith</ListExistingItems.Item>
                  <ListExistingItems.Item>Sally Bowles</ListExistingItems.Item>
                  <ListExistingItems.Item>Brian Parker</ListExistingItems.Item>
                  <ListExistingItems.Button className="mt-4">
                    <Button className="border-0 shadow-0 m-0">
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
                  <h3 className="mb-0"> User Registration </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Personal information">
                    <RegistrationForm.Field
                      label="First name"
                      id="firstName"
                      value={form.firstName}
                      placeholder="First name"
                      type="text"
                      onChange={handleChange("firstName")}
                      lg={6}
                      icon={<BsPersonVcard className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Surname"
                      id="surname"
                      value={form.surname}
                      placeholder="Surname"
                      type="text"
                      onChange={handleChange("surname")}
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
                      onChange={handleChange("phone")}
                      lg={6}
                      icon={<BsTelephone className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Email"
                      id="email"
                      value={form.email}
                      placeholder=""
                      type="email"
                      onChange={handleChange("email")}
                      lg={6}
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
                      onChange={handleChange("password")}
                      lg={6}
                      icon={<MdLockOutline className="mr-2" size={20} />}
                    />
                    <RegistrationForm.Field
                      label="Permissions"
                      id="permissions"
                      value={form.permissions}
                      placeholder=""
                      type="select"
                      options={[
                        { value: "", label: "Select permissions" },
                        { value: "admin", label: "Admin" },
                      ]}
                      onChange={handleChange("permissions")}
                      lg={6}
                      icon={<BsShield className="mr-2" size={20} />}
                    />
                  </RegistrationForm.Section>

                  <RegistrationForm.SubmitBtn />
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
