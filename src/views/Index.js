import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Spinner,
} from "reactstrap";
import Header from "components/Headers/Header";
import api from "services/api";
import moment from "moment";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("bookings");
        if (!data || data.length == 0) {
          setLoading(false);
          return;
        }
        setBookings(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, []);

  console.log(bookings);
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

  /*  async function updateChatBaseSource() {
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
  } */

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
                      <th>Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={3} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <Spinner />
                            <p className="mt-2"> Loading members </p>
                          </div>
                        </td>
                      </tr>
                    ) : bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No members found.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => {
                        return (
                          <tr>
                            <td> {booking.date}</td>
                            <td> {booking.startTime}</td>
                            <td> {booking.experience.name}</td>
                          </tr>
                        );
                      })
                    )}
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
