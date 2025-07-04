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
import {
  BsBuilding,
  BsCurrencyDollar,
  BsImage,
  BsPeople,
  BsPersonFill,
} from "react-icons/bs";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [dependantsLen, setDependantsLen] = useState(0);
  const [ownersLen, setOwnersLen] = useState(0);
  const [experiencesLen, setExperiencesLen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchBookings = async () => {
      try {
        const [bookings, owners, dependants, experiences] = await Promise.all([
          api.get("bookings"),
          api.get("members"),
          api.get("dependants"),
          api.get("experiences"),
        ]);

        if (
          !bookings.data.data ||
          bookings.data.data.length == 0 ||
          !owners.data.data ||
          owners.data.data.length == 0 ||
          !dependants.data ||
          dependants.data.length == 0 ||
          experiences.data.length == 0 ||
          !experiences
        ) {
          setLoading(false);
          return;
        }
        const lastFive = bookings.data.data.slice(-5);
        const bookingsWithExperience = await Promise.all(
          lastFive.map(async (booking) => {
            try {
              const { data: experience } = await api.get(
                `/experiences/${booking.experienceId}`
              );
              return {
                ...booking,
                experience,
              };
            } catch (error) {
              console.error(
                `Erro ao buscar experiência ${booking.experienceId}`,
                error
              );
              return {
                ...booking,
                experienceDetails: null,
              };
            }
          })
        );

        setBookings(bookingsWithExperience);
        setDependantsLen(dependants.data.length);
        setOwnersLen(owners.data.data.length);
        setExperiencesLen(experiences.data.length);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  useEffect(() => {
    setCards([
      {
        title: "Active property owners",
        value: ownersLen,
        Icon: BsPersonFill,
        iconBg: "bg-warning",
        footerText: false,
      },
      {
        title: "Total members",
        value: ownersLen + dependantsLen,
        Icon: BsPeople,
        iconBg: "bg-primary",
        footerText: false,
      },
      {
        title: "Registered experiences",
        value: experiencesLen,
        Icon: BsBuilding,
        iconBg: "bg-danger",
        footerText: false,
      },
      {
        title: "Total expenses",
        value: "$ 45738.42",
        Icon: BsCurrencyDollar,
        iconBg: "bg-success",
        footerText: false,
      },
    ]);
  }, [bookings, ownersLen, dependantsLen]);
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
      <Header cards={cards} />
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
                            <p className="mt-2"> Loading bookings </p>
                          </div>
                        </td>
                      </tr>
                    ) : bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No bookings found.
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
