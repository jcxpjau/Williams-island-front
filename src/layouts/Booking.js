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
import React, {useState} from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import BookingNavBar from "components/Navbars/BookingNavbar";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "bookingRoutes.js";

const Booking = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const [ user, setUser ] = useState();

  

  const getRoutes = (routes) => {
  return routes.map(({ layout, path, component: Component }, key) => {
    if (layout === "/booking") {
      return (
        <Route
          path={path}
          key={key}
          element={
            <Component
              user={user}
              setUser={setUser}
            />
          }
        />
      );
    }
    return null;
  });
};

  return (
    <>
      <BookingNavBar user={user} setUser={setUser} />
      <div className="main-content" ref={mainContent}>
        <Container className="pb-5" lg="12">
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/booking" replace />} />
            </Routes>
        </Container>
      </div>
    </>
  );
};

export default Booking;
