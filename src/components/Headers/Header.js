import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({
  title,
  description,
  height = "300px",
  showCards = true,
  cards = [],
}) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: height,
          backgroundImage: `url(${require("../../assets/img/theme/WI2.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">{title}</h1>
                {description && (
                  <p className="text-white mt-0 mb-5">{description}</p>
                )}
              </Col>
            </Row>
            {showCards && cards.length > 0 && (
              <Row>
                {cards.map((card, index) => (
                  <Col lg="6" xl="3" key={index}>
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              {card.title}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {card.value}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div
                              className={`icon icon-shape ${card.iconBg} text-white rounded-circle shadow`}
                            >
                              {card.Icon && <card.Icon size={20} />}
                            </div>
                          </Col>
                        </Row>
                        {card.footerText && (
                          <p className="mt-3 mb-0 text-muted text-sm">
                            {card.footerIcon && (
                              <span
                                className={`${card.footerColor} mr-2`}
                                style={{ fontSize: "12px" }}
                              >
                                <i
                                  className={card.footerIcon}
                                  style={{
                                    fontSize: "12px",
                                    marginRight: "5px",
                                  }}
                                />
                                {card.footerValue}
                              </span>
                            )}
                            {card.footerNote && (
                              <span
                                className="text-nowrap"
                                style={{ fontSize: "13px" }}
                              >
                                {card.footerNote}
                              </span>
                            )}
                          </p>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
