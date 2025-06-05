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
  BsPeopleFill,
  BsEnvelope,
} from "react-icons/bs";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { RegistrationForm } from "components/RegistrationForm";
import { ColorPicker } from "components/RegistrationForm/FormColorPicker";

const AddFee = () => {
  return (
    <>
      <UserHeader
        title="Add Fee"
        description="In this page you can register and set up new fees."
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <h3 className="mb-0"> Fee Registration </h3>
                </Col>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddFee;
