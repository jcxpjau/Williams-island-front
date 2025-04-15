import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const Reports = () => {
  const [reportData, setReportData] = useState({
    title: "",
    category: "General",
    description: "",
    date: "",
  });
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Reports</h3>
              </CardHeader>
              <CardBody>
                <Form >
                  <FormGroup>
                    <Label for="title">Report Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter the report title"
                      value={reportData.title}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={reportData.category}
                    >
                      <option>General</option>
                      <option>Maintenance</option>
                      <option>Inspection</option>
                      <option>Security</option>
                      <option>Incident</option>
                      <option>Other</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      rows="5"
                      placeholder="Describe the report in detail"
                      value={reportData.description}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      value={reportData.date}
                      required
                    />
                  </FormGroup>

                  <div className="text-right">
                    <Button color="primary" type="submit">
                      Submit Report
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reports;
