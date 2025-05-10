import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({ cards, CustomCards }) => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style={{
        backgroundImage:
          "url(" + require("../../assets/img/theme/WI2.png") + ")",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
      >
         <span className="mask bg-gradient-default opacity-8" />
        <Container fluid>
          <div className="header-body">
            {cards &&
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Members
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">2,356</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                        </span>{" "}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Accounts Receivable
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897$
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2" style={{
                          fontSize: "12px",
                        }}>
                          <i className="fas fa-arrow-up" style={{
                            fontSize: "12px",
                            marginRight: "5px"
                          }}/>3.40%
                        </span>{" "}
                        <span className="text-nowrap" style={{
                          fontSize: "13px"
                        }}>Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Accounts Payable
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">$92.750</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-money-coins" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2" style={{
                          fontSize: "12px",
                        }}>
                          <i className="fas fa-arrow-up" style={{
                            fontSize: "12px",
                            marginRight: "5px"
                          }}/>1.10%
                        </span>{" "}
                        <span className="text-nowrap" style={{
                          fontSize: "13px"
                        }}>Since yesterday</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Employees
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">788</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-settings" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                        </span>{" "}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            }
            {CustomCards && CustomCards}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
