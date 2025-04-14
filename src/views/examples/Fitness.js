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

const sportStats = [
  { name: "Weightlifting", count: 42 },
  { name: "Yoga", count: 27 },
  { name: "Spinning", count: 18 },
];

const getMostPopular = () =>
  sportStats.reduce((max, sport) => (sport.count > max.count ? sport : max));

const FitnessArea = () => {
  const mostPopular = getMostPopular();

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Fitness Area Overview</h3>
              </CardHeader>
              <CardBody>
                <p className="mb-2">
                  <strong>Most practiced activity:</strong>{" "}
                  <Badge color="info" pill>
                    {mostPopular.name}
                  </Badge>{" "}
                  ({mostPopular.count} residents)
                </p>
                <p className="text-muted mb-4">
                  Below is a summary of fitness activities practiced by
                  condominium residents.
                </p>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Activity</th>
                      <th scope="col">Residents</th>
                      <th scope="col">Popularity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sportStats.map((sport, idx) => (
                      <tr key={idx}>
                        <td>{sport.name}</td>
                        <td>{sport.count}</td>
                        <td>
                          <Badge
                            color={
                              sport.count === mostPopular.count
                                ? "success"
                                : "secondary"
                            }
                            pill
                          >
                            {sport.count === mostPopular.count
                              ? "Top"
                              : "Moderate"}
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

export default FitnessArea;
