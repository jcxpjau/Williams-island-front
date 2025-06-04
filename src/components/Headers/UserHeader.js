import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({ title, description, buttonText }) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/WI2.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="20">
              <h1 className="display-2 text-white">{title}</h1>
              {description &&
                <p className="text-white mt-0 mb-5">
                  {description}
                </p>
              }
              {buttonText &&
                <Button
                  color="info"
                  href=""
                  onClick={(e) => e.preventDefault()}
                >
                  {buttonText}
                </Button>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;