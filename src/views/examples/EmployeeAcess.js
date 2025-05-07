import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader";
import Header from "components/Headers/Header";

const accessLogs = [
  {
    id: 1,
    name: "Jessica Williams",
    role: "Manager",
    area: "Dashboard",
    date: "April 14, 2025",
    time: "10:32 AM",
  },
  {
    id: 2,
    name: "Robert Smith",
    role: "Waiter",
    area: "Orders",
    date: "April 14, 2025",
    time: "11:02 AM",
  },
  {
    id: 3,
    name: "Laura Johnson",
    role: "Chef",
    area: "Kitchen Panel",
    date: "April 13, 2025",
    time: "4:47 PM",
  },
];

const EmployeeAccessLog = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Employee Access Log</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Access Area</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.name}</td>
                        <td>{log.role}</td>
                        <td>{log.area}</td>
                        <td>{log.date}</td>
                        <td>{log.time}</td>
                        <td>
                          <Button color="info" size="sm" className="mr-2">
                            Details
                          </Button>
                          <Button color="danger" size="sm">
                            Block
                          </Button>
                        </td>
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

export default EmployeeAccessLog;
