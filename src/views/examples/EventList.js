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

import Header from "components/Headers/Header.js";
import SimpleFilterDropdown from "components/Filter/Filter";

const condoEvents = [
  {
    title: "Yoga Class",
    schedule: "Every Monday at 7:00 AM",
    location: "Fitness Hall",
    status: "Active",
  },
  {
    title: "Organic Market",
    schedule: "Every Saturday from 8:00 AM to 12:00 PM",
    location: "Parking Lot B",
    status: "Scheduled",
  },
  {
    title: "Craft Workshop",
    schedule: "Wednesdays at 5:00 PM",
    location: "Community Room",
    status: "Active",
  },
  {
    title: "Outdoor Cinema",
    schedule: "First Friday of the month at 8:00 PM",
    location: "Main Garden",
    status: "Scheduled",
  },
  {
    title: "Residents' Meeting",
    schedule: "Last Thursday of the month at 7:30 PM",
    location: "Meeting Room",
    status: "Completed",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Scheduled":
      return "info";
    case "Completed":
      return "secondary";
    default:
      return "default";
  }
};

const CondoEventList = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                      <h3 className="mb-0">Events List</h3>
                  </Col>
                  <Col xs="6" className="text-right">
                    <SimpleFilterDropdown
                      label="Filter"
                      options={["All", "Active", "Schedule", "Completed"]}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Event</th>
                      <th scope="col">Schedule</th>
                      <th scope="col">Location</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {condoEvents.map((event, index) => (
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.schedule}</td>
                        <td>{event.location}</td>
                        <td>
                          <Badge color={getStatusColor(event.status)} pill>
                            {event.status}
                          </Badge>
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

export default CondoEventList;
