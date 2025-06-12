import React, { useEffect, useState } from "react";
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
  /*   async function getBookings() {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "bookings?limit=5",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.error) {
        console.log(json.error);
      } else {
        setBookings(json);
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  } */

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

  async function updateChatBaseSource() {
    await fetch("https://www.chatbase.co/api/v1/update-chatbot-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 4dc7b789-5b94-4b1f-8236-57b66332311f",
      },
      body: JSON.stringify({
        chatbotId: "C-ryDiXun8dSDdyg5djxx",
        chatbotName: "A.N.A",
        sourceText:
          "Voo de Ida sabado dia 19/05/2025 saindo de Garulhos as 17:30 e Voo de volta domingo dia 23/05/2025 as 19:00 saindo de Vitória",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }

  /*    useEffect(() => {
        getBookings();
        updateChatBaseSource();
    }, [])
 */

  return (
    <>
      <Header cards={true} />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="6" xl="6">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Bookings</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{moment(booking.date).format("l")}</td>
                        <td>
                          {moment("1900-01-01T" + booking.startTime).format(
                            "LT"
                          )}{" "}
                          -{" "}
                          {moment("1900-01-01T" + booking.endTime).format("LT")}
                        </td>
                        <td>{booking.venueId.name}</td>
                      </tr>
                    ))} */}
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
