import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import SimpleFilterDropdown from "components/Filter/Filter";

const Autorizacoes = () => {
  const autorizacoes = [
    {
      id: 1,
      visitante: "João Silva",
      documento: "123.456.789-00",
      apartamento: "101",
      data: "14/04/2025",
      status: "Waiting",
    },
    {
      id: 2,
      visitante: "Maria Oliveira",
      documento: "987.654.321-00",
      apartamento: "202",
      data: "13/04/2025",
      status: "Authorized",
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
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Member Passes</h3>
                  </Col>
                  <Col xs="6" className="text-right">
                    <SimpleFilterDropdown
                      label="Filter"
                      options={["Waiting", "Authorized", "Denied"]}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Visitor</th>
                      <th>Doc</th>
                      <th>House</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {autorizacoes.map((autorizacao) => (
                      <tr key={autorizacao.id}>
                        <td>{autorizacao.visitante}</td>
                        <td>{autorizacao.documento}</td>
                        <td>{autorizacao.apartamento}</td>
                        <td>{autorizacao.data}</td>
                        <td>{autorizacao.status}</td>
                        <td>
                          <Button
                            color="success"
                            size="sm"
                            className="mr-2"
                            onClick={() =>
                              alert(`Autorizado: ${autorizacao.visitante}`)
                            }
                          >
                            Authorize
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() =>
                              alert(`Negado: ${autorizacao.visitante}`)
                            }
                          >
                            Refuse
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

export default Autorizacoes;
