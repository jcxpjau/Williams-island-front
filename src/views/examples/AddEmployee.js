import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";

const AddStaff = () => {
  return (
    <>
      <UserHeader 
        title = 'Add Employee' 
        description="In this page you can you add a employee"
        buttonText="Add Employee"
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add New Staff Member</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Staff Information
                  </h6>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-control-label" htmlFor="input-name">
                          Full Name
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-name"
                          placeholder="Enter full name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-control-label" htmlFor="input-role">
                          Role
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-role"
                          placeholder="e.g., Waiter, Manager"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-control-label" htmlFor="input-department">
                          Department
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-department"
                          type="text"
                          placeholder="e.g., Kitchen, Admin"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <Label className="form-control-label" htmlFor="input-date">
                          Admission Date
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-date"
                          placeholder="Select date"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label className="form-control-label" htmlFor="input-status">
                      Status
                    </Label>
                    <Input type="select" className="form-control-alternative" id="input-status">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>On Vacation</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary" type="submit">
                    Save Staff Member
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Delete
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">1</span>
                        <span className="description">Jobs</span>
                      </div>
                      <div>
                        <span className="heading">2</span>
                        <span className="description">Years</span>
                      </div>
                      <div>
                        <span className="heading">2</span>
                        <span className="description">Block</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Williams <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">Williams Island Member</div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    New Member - Mar 2025
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Title Owner
                  </div>
                  <hr className="my-4" />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStaff;
