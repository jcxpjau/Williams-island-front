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
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";

import Logs from "./Logs";
import Header from "components/Headers/Header";
import api from "services/api";
import "../custom.css";

const Settings = () => {
  const tabs = [{ id: "logs", label: "Logs" }, {id: "roles", label:"Roles"}];
  const [activeTab, setActiveTab] = useState('logs')

  return (
    <>
      <Header/>
      <Container className="mt--7" fluid>
        <Row className="h-100 d-flex align-items-stretch">
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow h-100 d-flex flex-column">
              <CardHeader className="bg-white border-0">
                <Col className="p-0" xs="12">
                  <Nav tabs>
                    {tabs.map((tab) => (
                      <NavItem key={tab.id} className="mr-2">
                        <NavLink
                          className={activeTab === tab.id ? "active" : ""}
                          onClick={() => {
                            setActiveTab(tab.id);
                          }}
                        >
                          <h3 className="mb-0 px-2">{tab.label}</h3>
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>
                </Col>
              </CardHeader>
              <CardBody
                style={{
                  flexGrow: 1,
                }}
              >
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="logs">
                    <Logs/>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Settings;
