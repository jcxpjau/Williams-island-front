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

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Problem submitted:", formData);
    alert("Problem reported successfully!");
    setFormData({
      title: "",
      description: "",
      category: "General",
    });
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="8" md="10">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Report a Problem</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter a brief title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Describe the problem in detail"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      type="select"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option>General</option>
                      <option>Facilities</option>
                      <option>Security</option>
                      <option>Noise</option>
                      <option>Cleaning</option>
                      <option>Other</option>
                    </Input>
                  </FormGroup>

                  <div className="text-right">
                    <Button color="primary" type="submit">
                      Submit
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

export default ReportProblem;
