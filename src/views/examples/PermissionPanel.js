import { useState } from "react";
import { Form } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

function PermissionPanel() {
  const [selectedRole, setSelectedRole] = useState("");
  const roles = [
    {
      value: "admin",
      label: "Administrator",
    },
    {
      value: "hr",
      label: "Human Resources",
    },
    {
      value: "employee",
      label: "Employee",
    },
  ];

  const areas = [
    {
      entity: "users",
      label: "Users",
    },
    {
      entity: "fees",
      label: "Fees",
    },
    {
      entity: "units",
      label: "Units",
    },
    {
      entity: "experiences",
      label: "Experiences",
    },
    {
      entity: "members",
      label: "Property Owners",
    },
    {
      entity: "dependants",
      label: "Dependants",
    },
    {
      entity: "properties",
      label: "Properties",
    },
    {
      entity: "bookings",
      label: "Bookings",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Row className="px-3">
          <div className="d-flex flex-row align-items-center">
            <h3 className="font-weight-normal m-0">
              {" "}
              Editing permissions for{" "}
            </h3>
            <select
              className="form-control mx-2 border-0"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: "250px",
                fontWeight: "bold",
                color: "#363660",
                "font-size": "1rem",
              }}
            >
              <option value=""></option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </Row>
      </CardHeader>
      <CardBody className="border">
        <Row md="6" className="border-bottom">
          <Col md="2" className=" p-2">
            <h3>Entities</h3>
          </Col>
          <Col md="10" className="text-center  p-2">
            <h3>Permissions</h3>
          </Col>
        </Row>
        <Row>
          <Col md="2" className="border-right p-3"></Col>
          <Col md="2" className="border-right p-3">
            <h3 className="font-weight-normal"> Create </h3>
          </Col>
          <Col md="2" className="border-right border-right p-3">
            <h3 className="font-weight-normal"> Read </h3>
          </Col>
          <Col md="2" className="border-right p-3">
            <h3 className="font-weight-normal"> Update </h3>
          </Col>
          <Col md="2" className="border-right p-3">
            <h3 className="font-weight-normal"> Delete </h3>
          </Col>
          <Col md="2" className="border-right p-3">
            <h3 className="font-weight-normal"> All </h3>
          </Col>
        </Row>
        {selectedRole && areas.map((area) => (
          <Row className="border-bottom" key={area.id}>
            <Col md="2" className="p-3 border-right d-flex align-items-center">
              {area.label}
            </Col>

            {[1, 2, 3, 4, 5].map((num) => (
              <Col
                md="2"
                key={`switch-${num}-${area.id}`}
                className="p-3 border-right d-flex justify-content-center align-items-center"
              >
                <CustomInput
                  type="switch"
                  id={`switch-${num}-${area.id}`}
                  label=""
                />
              </Col>
            ))}
          </Row>
        ))}
      </CardBody>
    </Card>
  );
}

export default PermissionPanel;
