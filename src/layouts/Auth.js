/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "authRoutes.js";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <div className="mt-6 py-4 py-lg-6">
          <Container>
            <div className="text-center mb-4">
              <Row className="justify-content-center px-0 mx-0">
                <Col lg="auto">
                  <img
                    src={require("../assets/img/brand/WI_Logo.png")}
                    alt="Logo"
                    style={{ height: "80px" }} 
                    className="mb-3 border border-white"
                  />
                  <h1 style={{"color":"#172b4d"}}>Welcome!</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <Container className="">
            <Row className="justify-content-center">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="*"
                  element={<Navigate to="/auth/login" replace />}
                />
              </Routes>
            </Row>
          </Container>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
