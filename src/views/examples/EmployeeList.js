import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Badge,
} from "reactstrap";

import Header from "components/Headers/Header";
import SimpleFilterDropdown from "components/Filter/Filter";

const StaffList = () => {
  const staff = [
    {
      name: "Ana Costa",
      role: "Manager",
      department: "Administration",
      admissionDate: "Mar 10, 2021",
      status: "Active",
    },
    {
      name: "Lucas Pereira",
      role: "Head Chef",
      department: "Kitchen",
      admissionDate: "Jul 5, 2020",
      status: "On Vacation",
    },
    {
      name: "Marina Souza",
      role: "Receptionist",
      department: "Front Desk",
      admissionDate: "Jan 15, 2023",
      status: "Active",
    },
    {
      name: "Carlos Lima",
      role: "Janitor",
      department: "General Services",
      admissionDate: "Oct 2, 2019",
      status: "Inactive",
    },
    {
      name: "Juliana Ramos",
      role: "Waitress",
      department: "Restaurant",
      admissionDate: "Feb 25, 2022",
      status: "Active",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge color="success">{status}</Badge>;
      case "On Vacation":
        return <Badge color="warning">{status}</Badge>;
      case "Inactive":
        return <Badge color="danger">{status}</Badge>;
      default:
        return <Badge color="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Header/>
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                    <Row className="align-items-center">
                    <Col xs="6">
                        <h3 className="mb-0">Employees List</h3>
                    </Col>
                    <Col xs="6" className="text-right">
                        <SimpleFilterDropdown
                        label="Filter"
                        options={["All", "Active", "On Vacation", "Inactive"]}
                        />
                    </Col>
                    </Row>
                </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Admission Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((employee, index) => (
                      <tr key={index}>
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>
                        <td>{employee.department}</td>
                        <td>{employee.admissionDate}</td>
                        <td>{getStatusBadge(employee.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StaffList;
