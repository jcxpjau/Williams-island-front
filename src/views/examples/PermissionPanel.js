import { ModalCustom as Modal } from "components/MessagePopUp";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CustomInput,
  Row,
} from "reactstrap";

function PermissionPanel() {
  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "hr", label: "Human Resources" },
    { value: "employee", label: "Employee" },
  ];

  const areas = [
    { entity: "users", label: "Users" },
    { entity: "fees", label: "Fees" },
    { entity: "units", label: "Units" },
    { entity: "experiences", label: "Experiences" },
    { entity: "members", label: "Property Owners" },
    { entity: "dependants", label: "Dependants" },
    { entity: "properties", label: "Properties" },
    { entity: "bookings", label: "Bookings" },
  ];

  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({});
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  useEffect(() => {
    if (selectedRole && !permissions[selectedRole]) {
      const initial = {};
      areas.forEach((area) => {
        initial[area.entity] = {
          create: false,
          read: false,
          update: false,
          delete: false,
          all: false,
        };
      });
      setPermissions((prev) => ({ ...prev, [selectedRole]: initial }));
    }
  }, [selectedRole]);

  const onClick = () => {
    setModal(true);
    setModalTitle("Permissions successfully updated!");
    setModalBody(
      `Permissions for role ${selectedRole} were sucessfully edited`
    );
  };

  const togglePermission = (entity, type) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      const areaPerms = { ...updated[selectedRole][entity] };

      if (type === "all") {
        const newValue = !areaPerms.all;
        areaPerms.create = newValue;
        areaPerms.read = newValue;
        areaPerms.update = newValue;
        areaPerms.delete = newValue;
        areaPerms.all = newValue;
      } else {
        areaPerms[type] = !areaPerms[type];
        const allTrue =
          areaPerms.create &&
          areaPerms.read &&
          areaPerms.update &&
          areaPerms.delete;
        areaPerms.all = allTrue;
      }

      updated[selectedRole][entity] = areaPerms;
      return updated;
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Row className="px-3">
            <div className="d-flex flex-row align-items-center">
              <h3 className="font-weight-normal m-0">
                Editing permissions for
              </h3>
              <select
                className="form-control mx-2 border-0"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  width: "250px",
                  fontWeight: "bold",
                  color: "#363660",
                  fontSize: "1rem",
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

        {selectedRole && (
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
              <Col md="2" className="border-right p-3">
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

            {areas.map((area) => (
              <Row className="border-bottom" key={area.entity}>
                <Col
                  md="2"
                  className="p-3 border-right d-flex align-items-center"
                >
                  {area.label}
                </Col>

                {["create", "read", "update", "delete", "all"].map((perm) => (
                  <Col
                    md="2"
                    key={`${perm}-${area.entity}`}
                    className="p-3 border-right d-flex justify-content-center align-items-center"
                  >
                    <CustomInput
                      type="switch"
                      id={`${perm}-${area.entity}`}
                      label=""
                      checked={
                        permissions[selectedRole]?.[area.entity]?.[perm] ||
                        false
                      }
                      onChange={() => togglePermission(area.entity, perm)}
                    />
                  </Col>
                ))}
              </Row>
            ))}
            <div className="d-flex align-items-center justify-content-center p-3">
              <Button color="info" onClick={() => onClick()}>
                Save changes
              </Button>
            </div>
          </CardBody>
        )}
      </Card>
      <Modal.Root isOpen={modal} toggle={() => setModal(!modal)}>
        <Modal.Header toggle={() => setModal(!modal)} title={modalTitle} />
        <Modal.Body>{modalBody}</Modal.Body>
      </Modal.Root>
    </>
  );
}

export default PermissionPanel;
