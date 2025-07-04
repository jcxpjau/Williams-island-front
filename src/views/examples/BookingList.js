import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import api from "services/api";
import Header from "components/Headers/Header";
import SearchEntity from "./SearchEntity";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [displayBookings, setDisplayBookings] = useState([]);
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchBookingsPage = async () => {
    setLoading(true);

    try {
      const { data: bookingRes } = await api.get("bookings", {
        params: {
          limit: 10,
          skip: (currentPage - 1) * 10,
        },
      });
      setLastPage(bookingRes.lastPage);
      setMaxPages(bookingRes.lastPage)
      if (!bookingRes.data || bookingRes.data.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const bookingsWithDetails = await Promise.all(
        bookingRes.data.map(async (booking) => {
          const experience = experiences.find(
            (exp) => exp.id === booking.experienceId
          );

          let member = null;
          try {
            const { data: memberData } = await api.get(
              `/members/${booking.memberId}`
            );
            member = memberData;
          } catch (error) {
            console.error(`Erro ao buscar member ${booking.memberId}`, error);
          }

          return {
            ...booking,
            experience: experience || null,
            member: member || null,
          };
        })
      );

      setBookings(bookingsWithDetails);
      setDisplayBookings(bookingsWithDetails);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= lastPage) {
      setCurrentPage(pageNumber);
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
    const fetchData = async () => {
      setLoading(true);

      try {
        const { data: experiencesRes } = await api.get("experiences");
        if (!experiencesRes.data || experiencesRes.data.length === 0) {
          setLoading(false);
          return;
        }
        setExperiences(experiencesRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (experiences && experiences.length > 0) {
      fetchBookingsPage();
    }
  }, [currentPage, experiences]);

  const handleSearch = (searchTerm) => {
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm === "") {
      setDisplayBookings(bookings);
      return;
    }

    const lowerCaseSearchTerm = trimmedTerm.toLowerCase();

    const filteredBookings = bookings.filter((booking) => {
      const experience = booking.experience.name.toLowerCase();
      const name = booking.member.name.toLowerCase();
      const surname = booking.member.surname.toLowerCase();
      return (
        experience.includes(lowerCaseSearchTerm) ||
        name.includes(lowerCaseSearchTerm) ||
        surname.includes(lowerCaseSearchTerm)
      );
    });

    setDisplayBookings(filteredBookings);
  };

  const clearSearch = () => {
    setFilterTerm("");
    setDisplayBookings(bookings);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    setSelectedExperience("");
  };

  useEffect(() => {
    if (!filter) {
      setDisplayBookings(bookings);
      setFilterTerm("");
      setSelectedDate(null);
      setSelectedExperience(null);
    }
  }, [filter]);

  useEffect(() => {
    const enrichBookings = async (bookings) => {
      return Promise.all(
        bookings.map(async (booking) => {
          let member = null;
          try {
            const { data: memberData } = await api.get(
              `members/${booking.memberId}`
            );
            member = memberData;
          } catch (err) {
            console.error(`Erro buscando member ${booking.memberId}:`, err);
          }

          return {
            ...booking,
            experience:
              experiences.find((exp) => exp.id === booking.experienceId) ||
              null,
            member: member,
          };
        })
      );
    };

    const fetchFilteredData = async () => {
      if (!filter) {
        setDisplayBookings(bookings);
      }

      if (!filterTerm.trim() && !selectedExperience && !selectedDate) {
        setDisplayBookings(bookings);
        return;
      }

      const trimmedTerm = filterTerm.trim();
      setLoading(true);
      try {
        if (filter === "experience" && selectedExperience) {
          const { data } = await api.get(`bookings`, {
            params: { experienceId: selectedExperience },
          });

          const bookingsWithDetails = await enrichBookings(data);
          setDisplayBookings(bookingsWithDetails);
          setLoading(false);
        }

        if (filter === "memberId" && trimmedTerm) {
          const { data } = await api.get(`bookings`, {
            params: { memberId: trimmedTerm },
          });

          const bookingsWithDetails = await enrichBookings(data);
          setDisplayBookings(bookingsWithDetails);
          setLoading(false);
        }

        if (filter === "date" && selectedDate) {
          const { data } = await api.get(`bookings`, {
            params: { date: selectedDate },
          });
          console.log(data);
          const bookingsWithDetails = await enrichBookings(data);
          setDisplayBookings(bookingsWithDetails);
          setLoading(false);
        }
      } catch {
        setLoading(false);
        setDisplayBookings(bookings);
      }
    };

    fetchFilteredData();
  }, [filterTerm, selectedExperience, selectedDate]);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Bookings List</h3>
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
                        <option value="memberId"> Member ID </option>
                        <option value="experience"> Experience </option>
                        <option value="date"> Date </option>
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

                      {filter && filter === "memberId" && (
                        <SearchEntity
                          handleSearch={handleSearch}
                          searchTerm={filterTerm}
                          setSearchTerm={setFilterTerm}
                          placeholder="Search by experience or member name"
                          onClearSearch={clearSearch}
                          width={"250px"}
                        />
                      )}

                      {filter === "date" && (
                        <input
                          className="form-control"
                          type="date"
                          style={{ width: "250px", flex: "0 0 250px" }}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      )}

                      {filter === "experience" && (
                        <div style={{ flex: "0 0 auto" }}>
                          <select
                            className="form-control"
                            value={selectedExperience}
                            onChange={(e) =>
                              setSelectedExperience(e.target.value)
                            }
                            style={{ width: "250px" }}
                          >
                            <option value="" disabled>
                              Filter by Experience
                            </option>
                            {experiences.map((experience) => (
                              <option key={experience.id} value={experience.id}>
                                {experience.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Experience</th>
                      <th>Member</th>
                      <th>Member ID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Notes</th>
                      <th>Status</th>
                      <th>Created at</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={9} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <Spinner />
                            <p className="mt-2"> Loading bookings </p>
                          </div>
                        </td>
                      </tr>
                    ) : displayBookings.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-4">
                          <span> No bookings found </span>
                        </td>
                      </tr>
                    ) : (
                      displayBookings?.map((booking, index) => (
                        <tr key={index}>
                          <td> {booking.experience.name}</td>
                          <td>
                            {booking.member.name} {booking.member.surname}
                          </td>
                          <td> {booking.member.id}</td>
                          <td>{booking.date}</td>
                          <td>
                            {booking.startTime} -{booking.endTime}
                          </td>
                          <td>{booking.notes}</td>
                          <td>{booking.status}</td>
                          <td>{booking.createdAt}</td>
                          <td className="text-right"></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                <Pagination className="border pt-4 px-4 d-flex justify-content-end">
                  {renderPaginationItems()}
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
