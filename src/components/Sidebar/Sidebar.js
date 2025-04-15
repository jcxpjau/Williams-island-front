import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    // closes the collapse
    const closeCollapse = () => {
        setCollapseOpen(false);
    };

    const [collapseStates, setCollapseStates] = useState({});

    const toggleCollapseItem = (stateKey) => {
        setCollapseStates((prev) => ({
            ...prev,
            [stateKey]: !prev[stateKey],
        }));
    };


    const createLinks = (routes) => {
        return routes.map((route, key) => {
            if (route.collapse && route.views) {
                return (
                    <div key={key}>
                        <NavItem>
                            <NavLink
                                href="#!"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleCollapseItem(route.state);
                                }}
                            >
                                <i className={route.icon} style={{ color: "#1a174d" }} />
                                <span>{route.name}</span>
                                <i className={collapseStates[route.state] ? "fa fa-chevron-up" : "fa fa-chevron-down"} aria-hidden="true" style={{ position: "absolute", right: 0, color: "#1a174d" }} />
                            </NavLink>
                        </NavItem>
                        <Collapse isOpen={collapseStates[route.state]}>
                            <Nav className="nav-sm flex-column">
                                {route.views.map((subRoute, idx) => (
                                    <NavItem key={idx}>
                                        <NavLink
                                            to={subRoute.layout + subRoute.path}
                                            tag={NavLinkRRD}
                                            onClick={closeCollapse}
                                            className={activeRoute(
                                                subRoute.layout + subRoute.path
                                            ) + ' subitem'}
                                            style={{
                                                marginLeft: "-1.5rem",
                                                ...(activeRoute(subRoute.layout + subRoute.path) ===
                                                    "active" && {
                                                    backgroundColor: "#f6f9fc",
                                                    color: "#1a174d",
                                                    fontWeight: "bold"
                                                }),
                                            }}
                                        >
                                            {subRoute.name}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Collapse>
                    </div>
                );
            } else {
                return (
                    <NavItem key={key}>
                        <NavLink
                            to={route.layout + route.path}
                            tag={NavLinkRRD}
                            onClick={closeCollapse}
                        >
                            <i className={route.icon} />
                            {route.name}
                        </NavLink>
                    </NavItem>
                );
            }
        });
    };

    const { bgColor, routes, logo } = props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }


    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
            style={{
                overflowY: 'auto',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch'
            }}
        >
            <Container fluid>
                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                {logo ? (
                    <NavbarBrand className="pt-0" {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={logo.imgSrc}
                        />
                    </NavbarBrand>
                ) : null}
                {/* User */}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav className="nav-link-icon">
                            <i className="ni ni-bell-55" />
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img
                                        alt="..."
                                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                                    />
                                </span>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-single-02" />
                                <span>My profile</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-settings-gear-65" />
                                <span>Settings</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-calendar-grid-58" />
                                <span>Activity</span>
                            </DropdownItem>
                            <DropdownItem to="/admin/user-profile" tag={Link}>
                                <i className="ni ni-support-16" />
                                <span>Support</span>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/* Collapse */}
                <Collapse navbar isOpen={collapseOpen}>
                    {/* Collapse header */}
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    {/* Form */}
                    <Form className="mt-4 mb-3 d-md-none">
                        <InputGroup className="input-group-rounded input-group-merge">
                            <Input
                                aria-label="Search"
                                className="form-control-rounded form-control-prepended"
                                placeholder="Search"
                                type="search"
                            />
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <span className="fa fa-search" />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                    {/* Navigation */}
                    <Nav navbar>{createLinks(routes)}</Nav>
                    <hr className="my-3" />
                    <h6 className="navbar-heading text-muted">System Administration</h6>
                    <Nav className="mb-md-3" navbar>
                        <NavItem>
                            <NavLink
                                to="/admin/users/list"
                                tag={NavLinkRRD}
                                style={{
                                    ...(activeRoute('/admin/users/list') ===
                                        "active" && {
                                        backgroundColor: "#f6f9fc",
                                        color: "#1a174d",
                                        fontWeight: "bold"
                                    }),
                                }}
                            >
                                <i className="ni ni-single-02" />
                                Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="/admin/membership/list"
                                style={{
                                    ...(activeRoute('/admin/settings') ===
                                        "active" && {
                                        backgroundColor: "#f6f9fc",
                                        color: "#1a174d",
                                        fontWeight: "bold"
                                    }),
                                }}
                            >
                                <i className="ni ni-settings-gear-65" />
                                Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="/admin/membership/list"
                                style={{
                                    ...(activeRoute('/admin/logs') ===
                                        "active" && {
                                        backgroundColor: "#f6f9fc",
                                        color: "#1a174d",
                                        fontWeight: "bold"
                                    }),
                                }}
                            >
                                <i className="ni ni-single-copy-04" />
                                Logs
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        outterLink: PropTypes.string,
        imgSrc: PropTypes.string.isRequired,
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
