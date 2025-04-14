// src/views/examples/AddActivity.jsx

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button,
  Label,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const AddActivity = () => {
  
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white pb-3">
                <div className="text-muted text-center">
                  <h3>Add New Activity</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Form >
                  <FormGroup>
                    <Label for="name">Activity Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g., Tennis, Gym, Golf..."
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Brief description of the activity"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="schedule">Schedule</Label>
                    <Input
                      type="text"
                      name="schedule"
                      id="schedule"
                      placeholder="e.g., Mon - Fri, 7am to 10pm"
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button color="primary" type="submit">
                      Add Activity
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

export default AddActivity;
