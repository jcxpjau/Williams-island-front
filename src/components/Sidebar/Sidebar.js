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

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
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

  const createLinks = () => {
    return routes.map((route, key) => {
      if (route.collapse && route.views) {
        const isParentActiveRoute =
          activeRoute(route.layout + route.path) === "active";
    
        const isParentClickable = route.active; 

        return (
          <div key={key} className="nav-item">
            
            {isParentClickable ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); 
                  toggleCollapseItem(route.state); 
                }}
                className={`nav-link ${isParentActiveRoute ? "active" : ""}`}
                style={{
                  color: "#1a174d", 
                  fontWeight: isParentActiveRoute ? "bold" : "normal", 
                  borderLeft: "none",
                  cursor: "pointer",
                }}
              >
                <i className={route.icon} style={{ color: "#1a174d" }} />
                <span>{route.name}</span>
                <i
                  className={
                    collapseStates[route.state]
                      ? "fa fa-chevron-up"
                      : "fa fa-chevron-down"
                  }
                  aria-hidden="true"
                  style={{ position: "absolute", right: 0, color: "#1a174d" }}
                />
              </a>
            ) : (
             
              <a
                href="#" 
                onClick={(e) => e.preventDefault()} 
                className="nav-link disabled" 
                style={{
                  color: "gray", 
                  fontWeight: "normal", 
                  borderLeft: "none",
                  cursor: "not-allowed", 
                  backgroundColor: "transparent",
                }}
              >
                <i className={route.icon} style={{ color: "#A7A7B9" }} />
                <span>{route.name}</span>
                <i
                  className={
                    collapseStates[route.state]
                      ? "fa fa-chevron-up"
                      : "fa fa-chevron-down"
                  }
                  aria-hidden="true"
                  style={{ position: "absolute", right: 0, color: "#A7A7B9" }} 
                />
              </a>
            )}

            <div
              className={`collapse ${
                collapseStates[route.state] ? "show" : ""
              }`}
            >
              <div className="nav nav-sm flex-column">
                {route.views.map((subRoute, idx) => {
                  const isActiveSubRoute =
                    activeRoute(subRoute.layout + subRoute.path) === "active";
                  const isSubClickable = subRoute.active;

                  return (
                    <div className="nav-item" key={idx}>
                      {isSubClickable ? (
                        <NavLinkRRD
                          to={subRoute.layout + subRoute.path}
                          onClick={closeCollapse}
                          className={`nav-link subitem ${
                            isActiveSubRoute ? "active" : ""
                          }`}
                          style={{
                            marginLeft: "-1.5rem",
                            borderLeft: "none",
                            backgroundColor: isActiveSubRoute
                              ? "#f6f9fc"
                              : "transparent",
                            color: "#1a174d",
                            fontWeight: isActiveSubRoute ? "bold" : "normal",
                          }}
                        >
                          {subRoute.name}
                        </NavLinkRRD>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="nav-link subitem disabled"
                          style={{
                            marginLeft: "-1.5rem",
                            borderLeft: "none",
                            backgroundColor: "transparent",
                            color: "#A7A7B9", // Lighter gray for inactive sub-items
                            fontWeight: "normal",
                            cursor: "not-allowed",
                          }}
                        >
                          {subRoute.name}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      } else {
        // Handle non-collapsible top-level routes (like 'Dashboard')
        const isTopLevelActiveRoute =
          activeRoute(route.layout + route.path) === "active";
        const isTopLevelClickable = route.active; // Use route.active directly

        return (
          <div className="nav-item" key={key}>
            {isTopLevelClickable ? (
              <NavLinkRRD
                to={route.layout + route.path}
                onClick={closeCollapse}
                className={`nav-link ${isTopLevelActiveRoute ? "active" : ""}`}
                style={{
                  borderLeft: "none",
                  backgroundColor: isTopLevelActiveRoute
                    ? "#f6f9fc"
                    : "transparent",
                  color: "#1a174d", // Default color for active top-level
                  fontWeight: isTopLevelActiveRoute ? "bold" : "normal",
                }}
              >
                <i className={route.icon} />
                {route.name}
              </NavLinkRRD>
            ) : (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link disabled"
                style={{
                  borderLeft: "none",
                  backgroundColor: "transparent",
                  color: "gray", // Gray text for inactive top-level
                  fontWeight: "normal",
                  cursor: "not-allowed",
                }}
              >
                <i className={route.icon} />
                {route.name}
              </a>
            )}
          </div>
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
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
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
          {/*  <Form className="mt-4 mb-3 d-md-none">
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
                    </Form> */}
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          <hr className="my-3" />
          <h6 className="navbar-heading text-muted">System Administration</h6>
          <Nav className="mb-md-3" navbar>
            {/* <NavItem>
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
                                onClick={closeCollapse}
                            >
                                <i className="ni ni-single-02" />
                                Users
                            </NavLink>
                        </NavItem> */}
            <NavItem>
              <NavLink
                href="/admin/settings"
                style={{
                  ...(activeRoute("/admin/settings") === "active" && {
                    backgroundColor: "#f6f9fc",
                    color: "#1a174d",
                    fontWeight: "bold",
                  }),
                }}
                onClick={closeCollapse}
              >
                <i className="ni ni-settings-gear-65" />
                Settings
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                to="/admin/logs"
                tag={NavLinkRRD}
                style={{
                  ...(activeRoute("/admin/logs") === "active" && {
                    backgroundColor: "#f6f9fc",
                    color: "#1a174d",
                    fontWeight: "bold",
                  }),
                }}
                onClick={closeCollapse}
              >
                <i className="ni ni-single-copy-04" />
                Logs
              </NavLink>
            </NavItem> */}
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
