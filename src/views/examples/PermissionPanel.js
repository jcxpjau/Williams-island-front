import { useState } from "react";
import { Card, CardHeader, Row } from "reactstrap";

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
        <Row>
          <div>
            <select
              className="form-control"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: "250px" }}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => {
                return <option value={role.value}>{role.label}</option>;
              })}
            </select>
          </div>
        </Row>
      </CardHeader>
    </Card>
  );
}

export default PermissionPanel;
