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
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  BsPencil,
  BsFillPersonFill,
  BsFillPersonBadgeFill,
  BsCardText,
  BsPersonVcard,
  BsBuilding,
  BsCake2,
  BsCalendar,
  BsMailbox,
  BsMailboxFlag,
  BsAt,
  BsTelephone,
  BsPinMap,
  BsFillPeopleFill,
  BsPhone,
  BsHousesFill,
  BsPalette,
} from "react-icons/bs";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";

const AddUnit = () => {
  return (
    <>
      <UserHeader
        title="Add Unit"
        description="In this page you can you add residential units or edit their information."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="10">
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
                      id="input-denomination"
                      label="Denomination"
                      type="text"
                      lg={6}
                      placeholder="Denomination"
                      icon={<BsBuilding size={18} />}
                    />
                    <RegistrationForm.Field
                      id="input-inhabitants"
                      label="Number of inhabitantes"
                      type="number"
                      lg={6}
                      placeholder="Number of inhabitants"
                      icon={<BsHousesFill size={18} />}
                    />
                     <RegistrationForm.Field
                      id="input-color"
                      label="Color"
                      type="text"
                      lg={6}
                      placeholder="Color"
                      icon={<BsPalette size={18} />}
                    />
                    {/* <RegistrationForm.ColorPicker/> */}
                  </RegistrationForm.Section>
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
