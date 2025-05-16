import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ChatbaseWidget from "components/Chatboot/chatbot";

import routes from "routes.js";
import hiddenRoutes from "hiddenRoutes.js";
import Footer from "components/Footers/AdminFooter";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.flatMap((prop, key) => {
      if (prop.collapse && prop.views) {
        return getRoutes(prop.views);
      }

      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} />
        );
      }

      return [];
    });
  };

  const getHiddenRoutes = (routes) => {
    return routes.flatMap((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} />
        );
      }

      return [];
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        location={location}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/WI_Logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          {getHiddenRoutes(hiddenRoutes)}
        </Routes>
        <Container fluid>
          <ChatbaseWidget />
          <Footer/>
        </Container>
      </div>
    </>
  );
};

export default Admin;
