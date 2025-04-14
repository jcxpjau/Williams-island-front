import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";

const AddCondoEvent = () => {
  const [form, setForm] = useState({
    title: "",
    schedule: "",
    location: "",
    status: "Scheduled",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event submitted:", form);
    alert("Event successfully added!"); // p futuramente enviarmos para uma API
    setForm({
      title: "",
      schedule: "",
      location: "",
      status: "Scheduled",
    });
  };

  return (
    <>
      <UserHeader title = 'Add Event' 
            description="In this page you can add a event"
            buttonText="Add Event"
       />
      <Container className="mt--7" fluid>
        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-white border-0 text-center">
                <h3 className="mb-0">Add New Condominium Event</h3>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-4">
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="title">Event Name</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter event name"
                      type="text"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="schedule">Schedule</Label>
                    <Input
                      id="schedule"
                      name="schedule"
                      placeholder="e.g. Every Saturday at 10:00 AM"
                      type="text"
                      value={form.schedule}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Main Garden, Community Room"
                      type="text"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      id="status"
                      name="status"
                      type="select"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option>Scheduled</option>
                      <option>Active</option>
                      <option>Completed</option>
                    </Input>
                  </FormGroup>

                  <div className="text-center">
                    <Button className="mt-4" color="primary" type="submit">
                      Add Event
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

export default AddCondoEvent;
