import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const TennisBookings = () => {
  const bookings = [
    {
      id: 1,
      player: "John Doe",
      date: "2025-04-12",
      duration: "1h",
      time: "10:00 AM",
    },
    {
      id: 2,
      player: "Alice Johnson",
      date: "2025-04-11",
      duration: "2h",
      time: "3:00 PM",
    },
    {
      id: 3,
      player: "Mark Smith",
      date: "2025-04-10",
      duration: "1.5h",
      time: "6:30 PM",
    },
  ];

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Recent Tennis Court Bookings</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Player</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.player}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>{booking.duration}</td>
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

export default TennisBookings;
