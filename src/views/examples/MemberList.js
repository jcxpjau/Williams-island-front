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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Spinner,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../custom.css";
import api from "services/api";
import { BsPencil } from "react-icons/bs";
const Tables = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchAllMemberData = async () => {
      setLoading(true);

      try {
        const [membersData, unitsData] = await Promise.all([
          api.get("members"),
          api.get("units"),
        ]);

        if (!membersData || membersData.length === 0) {
          setMembers([]);
          setLoading(false);
          return;
        }
        const membersWithFullData = await Promise.all(
          membersData.data.map(async (member) => {
            try {
              const mappedMember = {
                id: member.id,
                name: member.name,
                surname: member.surname,
                email: member.email,
                memberNumber: member.memberNumber,
                address: member.address,
                tel: member.tel,
                zipCode: member.zipCode,
                dateOfBirth: member.dateOfBirth,
                dateJoined: member.dateJoined,
              };

              const [propertiesResponse, dependantsResponse] =
                await Promise.all([
                  api.get(`properties/member/${member.id}`),
                  api.get(`dependants/member/${member.id}`),
                ]);

              return {
                ...mappedMember,
                properties: propertiesResponse.data || [],
                dependants: dependantsResponse.data || [],
              };
            } catch (innerError) {
              console.error(
                `Erro ao buscar dados adicionais para o membro ${member.id}:`,
                innerError
              );
              return {
                id: member.id,
                name: member.name,
                surname: member.surname,
                email: member.email,
                memberNumber: member.memberNumber,
                address: member.address,
                tel: member.tel,
                zipCode: member.zipCode,
                dateOfBirth: member.dateOfBirth,
                dateJoined: member.dateJoined,
                properties: [],
                dependants: [],
              };
            }
          })
        );
        setMembers(membersWithFullData);

        if (unitsData.data && unitsData.data.length > 0) {
          const mappedUnitsData = unitsData.data.map((item) => ({
            id: item.id,
            address: item.address,
            denomination: item.denomination,
            numberOfInhabitants: item.numberOfInhabitants,
            numberOfStores: item.numberOfStores,
            numberOfApartments: item.numberOfApartments,
            color: item.color,
          }));
          setUnits(mappedUnitsData);
        } else {
          setUnits([]);
        }
      } catch (err) {
        console.error("Erro ao buscar membros ou dados adicionais:", err);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMemberData();
  }, []);

  console.log(members);
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Members List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Member number</th>
                    <th scope="col">Member</th>
                    <th scope="col"> Unit(s) </th>
                    <th scope="col"> Number of dependants </th>
                    <th scope="col"> Actions </th>
                  </tr>
                </thead>

                <tbody className="table-hover-effect">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <Spinner />
                          <p className="mt-2"> Loading members </p>
                        </div>
                      </td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <>
                        <tr key={member.id}>
                          <td>
                            <span key={member.id}>
                              <a
                                className="avatar avatar-sm"
                                href="#pablo"
                                id={`tooltip-${member.id}`}
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={require("../../assets/img/theme/team-1-800x800.jpg")}
                                />
                              </a>
                              <UncontrolledTooltip
                                delay={0}
                                target={`tooltip-${member.id}`}
                              >
                                {member.name} {member.surname}
                              </UncontrolledTooltip>
                            </span>
                          </td>
                          <td> {member.memberNumber} </td>
                          <td>
                            {member.name} {member.surname}
                          </td>
                          <td>
                            {member.properties.map((prop, index) => {
                              const associatedUnit = units.find(
                                (unit) => unit.id === prop.unitId
                              );
                              return (
                                <span
                                  key={index}
                                  style={{ color: associatedUnit.color }}
                                >
                                  {associatedUnit.denomination}
                                  {index < member.properties.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              );
                            })}
                          </td>
                          <td>
                            <div className="avatar-group">
                              {member.dependants.length > 0 ? (
                                member.dependants.map((dependant, depIndex) => {
                                  const tooltipId = `tooltip-${member.id}-${
                                    dependant.id || depIndex
                                  }`;
                                  return (
                                    <span key={dependant.id || depIndex}>
                                      <a
                                        className="avatar avatar-sm"
                                        href="#pablo"
                                        id={tooltipId}
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <img
                                          alt="..."
                                          className="rounded-circle"
                                          src={require("../../assets/img/theme/team-2-800x800.jpg")}
                                        />
                                      </a>
                                      <UncontrolledTooltip
                                        delay={0}
                                        target={tooltipId}
                                      >
                                        {dependant.name} {dependant.surname} (
                                        {dependant.relationship})
                                      </UncontrolledTooltip>
                                    </span>
                                  );
                                })
                              ) : (
                                <span> No dependants </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <button className="btn"  onClick={() => navigate("/admin/membership/add", { state: { member } })}>
                              <BsPencil />
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
