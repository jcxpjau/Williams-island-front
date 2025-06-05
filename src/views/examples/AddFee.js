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
  MdFastfood,
  MdOutlineFitnessCenter,
  MdPets,
  MdSportsBasketball,
  MdSportsFootball,
} from "react-icons/md";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ListExistingItems } from "components/ListExisting";
import { BsFillPersonFill, BsHouseFill } from "react-icons/bs";
import { FaCocktail, FaCoffee, FaHome, FaSpa } from "react-icons/fa";
import { FaPersonSwimming, FaSailboat } from "react-icons/fa6";

const AddFee = () => {
  const initialState = {
    category: "",
    fee: "",
  };
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleResetForm = () => {
    setForm(initialState);
  };

  return (
    <>
      <UserHeader
        title="Add Fee"
        description="In this page you can register and set up new fees."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0 pt-4 pb-0 pb-md-4">
                <h3 className="mb-0">Edit fees </h3>
              </CardHeader>
              <CardBody>
                <ListExistingItems.Root>
                  <ListExistingItems.Item>
                    Food & Beverage fee
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>
                    Pet walking fee
                  </ListExistingItems.Item>
                  <ListExistingItems.Item>Courtyard fee</ListExistingItems.Item>
                  <ListExistingItems.Item>
                    Playground fee
                  </ListExistingItems.Item>
                  <ListExistingItems.Button className="mt-4">
                    <Button
                      className="border-0 shadow-0 m-0"
                      onClick={handleResetForm}
                    >
                      + New fee
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
                  <h3 className="mb-0"> Fee Registration </h3>
                </Col>
              </CardHeader>
              <CardBody>
                <RegistrationForm.Root>
                  <RegistrationForm.Section title="Fee details">
                    <RegistrationForm.Field
                      id="category"
                      label="Category"
                      type="select"
                      lg={8}
                      placeholder="Category"
                      value={form.category}
                      onChange={handleChange}
                      options={[
                        {
                          value: "",
                          label: "Select a category",
                        },
                        {
                          value: "poa",
                          label: "Property Owners Association",
                          icon: <FaHome size={16} />,
                        },
                        {
                          value: "sports",
                          label: "Sports",
                          icon: <MdSportsFootball size={16} />,
                        },
                        {
                          value: "restaurant",
                          label: "Restaurant",
                          icon: <MdFastfood size={16} />,
                        },
                        {
                          value: "cafe",
                          label: "Cafe",
                          icon: <FaCoffee size={16} />,
                        },
                        {
                          value: "bar",
                          label: "Bar",
                          icon: <FaCocktail size={16} />,
                        },
                        {
                          value: "pet",
                          label: "Pets",
                          icon: <MdPets size={16} />,
                        },
                        {
                          value: "spa",
                          label: "Spa",
                          icon: <FaSpa size={16} />,
                        },
                        {
                          value: "pool",
                          label: "Pool",
                          icon: <FaPersonSwimming size={16} />,
                        },
                        {
                          value: "fitness",
                          label: "Fitness",
                          icon: <MdOutlineFitnessCenter size={16} />,
                        },
                        {
                          value: "marina",
                          label: "Marina",
                          icon: <FaSailboat size={16} />,
                        },
                      ]}
                    />

                    <RegistrationForm.Field
                      id="fee"
                      label="Value (%)"
                      type="number"
                      lg={4}
                      placeholder="0.0%"
                      value={form.fee}
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

export default AddFee;
