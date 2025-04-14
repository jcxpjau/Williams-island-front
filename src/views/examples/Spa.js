import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

import Header from "components/Headers/Header.js";

//simulando os dados apenas
const reservations = [
  { id: 1, guest: "Emily Rose", room: "Relaxation Room A", date: "2025-04-14", time: "10:00 AM" },
  { id: 2, guest: "Carlos Mendes", room: "Massage Room 1", date: "2025-04-13", time: "2:00 PM" },
  { id: 3, guest: "Linda Carter", room: "Relaxation Room A", date: "2025-04-13", time: "4:00 PM" },
  { id: 4, guest: "James Wilson", room: "Massage Room 2", date: "2025-04-12", time: "11:30 AM" },
  { id: 5, guest: "Anna Kim", room: "Relaxation Room A", date: "2025-04-12", time: "1:00 PM" },
];


const getMostUsedRoom = () => {
  const usageCount = {};

  reservations.forEach((res) => {
    usageCount[res.room] = (usageCount[res.room] || 0) + 1;
  });

  const mostUsed = Object.entries(usageCount).sort((a, b) => b[1] - a[1])[0];
  return {
    name: mostUsed[0],
    count: mostUsed[1],
  };
};

const SpaReservations = () => {
  const mostUsedRoom = getMostUsedRoom();

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mb-4">
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Most Used Spa Room</h3>
              </CardHeader>
              <CardBody>
                <h4>
                  <Badge color="info" pill>
                    {mostUsedRoom.name}
                  </Badge>{" "}
                  — {mostUsedRoom.count} reservations
                </h4>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Recent Spa Reservations</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id}>
                        <td>{res.guest}</td>
                        <td>{res.room}</td>
                        <td>{res.date}</td>
                        <td>{res.time}</td>
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

export default SpaReservations;
