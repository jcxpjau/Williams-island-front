import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import Header from "components/Headers/Header";

const Dashboard = () => {
  const reservations = [
    { date: "May 5, 2024", time: "10:00 AM", facility: "Tennis Court 1" },
    { date: "Apr 20, 2024", time: "4:00 PM", facility: "Pool" },
    { date: "Apr 20, 2024", time: "4:00 PM", facility: "Fitness Center" },
    { date: "Apr 21, 2024", time: "4:00 PM", facility: "Clubhouse" },
    { date: "Apr 12, 2024", time: "1:00 PM", facility: "Tennis Court 2" },
  ];

  const maintenanceRequests = [
    { date: "Apr 22, 2024", resident: "John Smith", status: "In Progress" },
    { date: "Apr 22, 2024", resident: "Mary Johnson", status: "Pending" },
    { date: "Apr 22, 2024", resident: "Robert Brown", status: "Pending" },
    { date: "Apr 21, 2024", resident: "Linda Davis", status: "Completed" },
    { date: "Apr 25, 2024", resident: "Michael Wilson", status: "Completed" },
  ];

  const announcements = [
    { date: "Apr 20, 2024", text: "Landscaping service laniscard seping" },
    { date: "Apr 20, 2024", text: "Board meeting for a Board Meeting" },
    { date: "Apr 10, 2024", text: "Parking lot maintenanana" },
  ];

  const openViolations = [
    { resident: "Karen Harris", issue: "Noise Complaint" },
    { resident: "James Moore", issue: "Unauthorized Pet" },
    { resident: "Patricia Lee", issue: "Improper Trash Disposal" },
  ];

  return (
    <>
      <Header cards={true} />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="6" xl="6">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Reservations</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Facility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res, index) => (
                      <tr key={index}>
                        <td>{res.date}</td>
                        <td>{res.time}</td>
                        <td>{res.facility}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" xl="6">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Maintenance Requests</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Date</th>
                      <th>Resident</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRequests.map((req, index) => (
                      <tr key={index}>
                        <td>{req.date}</td>
                        <td>{req.resident}</td>
                        <td>{req.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6" xl="6">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Announcements</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <tbody>
                    {announcements.map((a, index) => (
                      <tr key={index}>
                        <td style={{ whiteSpace: "nowrap" }}>{a.date}</td>
                        <td>{a.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col md="6" xl="6">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Open Violations</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <tbody>
                    {openViolations.map((v, index) => (
                      <tr key={index}>
                        <td>{v.resident}</td>
                        <td>{v.issue}</td>
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

export default Dashboard;
