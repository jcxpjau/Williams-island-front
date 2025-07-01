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
} from "reactstrap";
import api from "services/api";
import Header from "components/Headers/Header";
import SearchEntity from "./SearchEntity";

const Booking = () => {
  const [bookings, setBookings] = useState(null);
  const [displayBookings, setDisplayBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      try {
        const { data: bookings } = await api.get("bookings");

        if (!bookings || bookings.length === 0) {
          setLoading(false);
          return;
        }
        setBookings(bookings);
        setDisplayBookings(bookings);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
    setSearchTerm("");
    setDisplayBookings(bookings);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col md="12">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Booking list </h3>
                  <div className="w-25">
                    <SearchEntity
                      handleSearch={handleSearch}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      placeholder="Search by experience or member name"
                      onClearSearch={clearSearch}
                    />
                  </div>
                </div>
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
                    {loading && (
                      <tr>
                        <td colSpan={9} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                            <Spinner />
                            <p className="mt-2"> Loading bookings </p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {!loading && displayBookings?.length > 0 ? (
                      displayBookings.map((booking, index) => (
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
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-4">
                          <span> No bookings found </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
