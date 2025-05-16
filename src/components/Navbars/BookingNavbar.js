import { Link } from "react-router-dom";
import {
    UncontrolledCollapse,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
} from "reactstrap";

const BookingNavBar = ({user}) => {

    return (
        <>
            <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                <Container className="px-4">
                    <button className="navbar-toggler ml-auto" id="navbar-collapse-main">
                        <span className="custom-navbar-toggler-icon navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/">
                                        <img
                                            alt="..."
                                            src={require("../../assets/img/brand/WI_Logo.png")}
                                        />
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button className="navbar-toggler" id="navbar-collapse-main">
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    to="booking"
                                    tag={Link}
                                    style={{ color: "#32325d" }}
                                >
                                    <i className="ni ni-time-alarm" />
                                    <span className="nav-link-inner--text">Book</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    to={ ( user ) ? "resume/" + user._id : "resume"}
                                    tag={Link}
                                    style={{ color: "#32325d" }}
                                >
                                    <i className="ni ni-time-alarm" />
                                    <span className="nav-link-inner--text">My Bookings</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    );
};

export default BookingNavBar;
