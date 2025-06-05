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
import {
  BsFillPersonFill,
  BsPersonVcard,
  BsBuilding,
  BsPeopleFill,
  BsEnvelope,
} from "react-icons/bs";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ColorPicker } from "components/RegistrationForm/FormColorPicker";
import { ListExistingItems } from "components/ListExisting";

const AddUnit = () => {
  const initialState = {
    address: "",
    denomination: "",
    inhabitants: "",
    stores: "",
    apartments: "",
    color: null,
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setForm(initialState);
  };

  return (
    <>
      <UserHeader
        title="Add Unit"
        description="In this page you can you add residential units or edit their information."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit unit information</h3>
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  <ListExistingItems.Item>
                    <span> Tower 1 </span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    <span> Tower 2 </span>
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    <span> Tower 3 </span>
                  </ListExistingItems.Item>
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
                  <h3 className="mb-0"> Unit Registration </h3>
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
                      id="inhabitants"
                      label="Number of inhabitants"
                      type="number"
                      lg={4}
                      placeholder="Number of inhabitants"
                      icon={<BsPeopleFill size={18} />}
                      value={form.inhabitants}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="stores"
                      label="Number of stores"
                      type="number"
                      lg={4}
                      placeholder="Number of stores"
                      icon={<BsBuilding size={18} />}
                      value={form.stores}
                      onChange={handleChange}
                    />
                    <RegistrationForm.Field
                      id="apartments"
                      label="Number of apartments"
                      type="number"
                      lg={4}
                      placeholder="Number of apartments"
                      icon={<BsBuilding size={18} />}
                      value={form.apartments}
                      onChange={handleChange}
                    />
                  </RegistrationForm.Section>
                  <RegistrationForm.Section title={"Visualization"}>
                    <ColorPicker
                      label="Color"
                      id="color"
                      lg={6}
                      value={form.color}
                      onChange={handleChange}
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

export default AddUnit;
