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
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import "../custom.css";
import api from "services/api";
import { BsPencil } from "react-icons/bs";
import SearchEntity from "./SearchEntity";
import { max } from "moment";

const MemberList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [displayMembers, setDisplayMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [units, setUnits] = useState([]);

  const [params, setParams] = useState({
    limit: 10,
    skip: 0,
    name: null,
    email: null,
    unitId: null,
  });

  const fetchMemberPage = async () => {
    setLoading(true);

    try {
      const { data: membersData } = await api.get("members", {
        params: params,
      });

      setLastPage(membersData.lastPage || 1);
      if (!filter) {
        setMaxPages(membersData.lastPage || 1);
      }

      if (!membersData.data || membersData.data.length === 0) {
        setMembers([]);
        setDisplayMembers([]);
        return;
      }

      const membersWithFullData = await Promise.all(
        membersData.data.map(async (member) => {
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

          try {
            const [propertiesResponse, dependantsResponse] = await Promise.all([
              api.get(`properties/member/${member.id}`),
              api.get(`dependants/member/${member.id}`),
            ]);

            return {
              ...mappedMember,
              properties: propertiesResponse.data || [],
              dependants: dependantsResponse.data || [],
            };
          } catch {
            return {
              ...mappedMember,
              properties: [],
              dependants: [],
            };
          }
        })
      );

      setMembers(membersWithFullData);
      setDisplayMembers(membersWithFullData);
    } catch (err) {
      console.error(err);
      setMembers([]);
      setDisplayMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= lastPage) {
      setCurrentPage(pageNumber);
      setParams((prev) => ({
        ...prev,
        skip: (pageNumber - 1) * prev.limit,
      }));
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key="previous" disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </PaginationItem>
    );

    for (let i = 1; i <= lastPage; i++) {
      items.push(
        <PaginationItem key={i} active={i === currentPage}>
          <PaginationLink onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next" disabled={currentPage === lastPage}>
        <PaginationLink
          next
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </PaginationItem>
    );

    return items;
  };

  useEffect(() => {
    const fetchUnits = async () => {
      const { data: unitsData } = await api.get("units");
      if (unitsData && unitsData.data.length > 0) {
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
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    fetchMemberPage();
  }, [params]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setSelectedUnit("");
  };

  const handleUnitSelectChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const clearFilter = () => {
    setFilter("");
    setFilterTerm("");
    setSelectedUnit("");
    setCurrentPage(1);
    setParams({
      limit: 10,
      skip: 0,
      name: null,
      email: null,
      unitId: null,
    });
  };

  useEffect(() => {
    if (!filter) {
      clearFilter();
      return;
    }

    let updated = { ...params, skip: 0 };

    if (filter === "name" && filterTerm.trim()) {
      updated = {
        ...updated,
        name: filterTerm.trim(),
        email: null,
        unitId: null,
      };
    } else if (filter === "email" && filterTerm.trim()) {
      updated = {
        ...updated,
        email: filterTerm.trim(),
        name: null,
        unitId: null,
      };
    } else if (filter === "unit" && selectedUnit) {
      updated = { ...updated, unitId: selectedUnit, name: null, email: null };
    } else {
      updated = { ...updated, name: null, email: null, unitId: null };
    }

    setParams(updated);
    setCurrentPage(1);
  }, [filterTerm, selectedUnit]);

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

                  <Col xs="6" className="d-flex justify-content-end gap-3">
                    <div className="d-flex flex-row gap-2 mt-3">
                      <select
                        className="custom-select btn btn-secondary"
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ textAlign: "left" }}
                      >
                        <option value="">Filter by</option>
                        <option value="unit">Unit</option>
                        <option value="email">Email</option>
                        <option value="name">First name</option>
                      </select>

                      {!filter && (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Select a filter"
                          disabled
                          style={{ width: "250px", flex: "0 0 250px" }}
                        />
                      )}

                      {(filter === "name" || filter === "email") && (
                        <SearchEntity
                          handleSearch={() => {}}
                          searchTerm={filterTerm}
                          setSearchTerm={setFilterTerm}
                          onClearSearch={clearFilter}
                          placeholder={`Filter by ${filter}`}
                          width={"250px"}
                        />
                      )}

                      {filter === "unit" && (
                        <div style={{ flex: "0 0 auto" }}>
                          <select
                            className="form-control"
                            value={selectedUnit}
                            onChange={handleUnitSelectChange}
                            style={{ width: "250px" }}
                          >
                            <option value="" disabled>
                              Filter by Unit
                            </option>
                            {units.map((unit) => (
                              <option
                                key={unit.denomination}
                                value={unit.id}
                                style={{ color: unit.color }}
                              >
                                {unit.denomination}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
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
                  ) : displayMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    displayMembers.map((member) => (
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
                                  src={require("../../assets/img/theme/default-pfp.jpg")}
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
                              const associatedUnit = units?.find(
                                (unit) => unit.id === prop.unitId
                              );
                              if (associatedUnit) {
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
                              }
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
                                          src={require("../../assets/img/theme/default-pfp.jpg")}
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
                            <button
                              className="btn"
                              onClick={() =>
                                navigate("/admin/membership/add", {
                                  state: { member },
                                })
                              }
                            >
                              <BsPencil />
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  )}
                </tbody>
              </Table>
              <Pagination className="border pt-4 px-4 d-flex justify-content-end">
                {renderPaginationItems()}
              </Pagination>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MemberList;
