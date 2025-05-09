import React, { useEffect, useState, useMemo, useRef } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Table,
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import Header from "components/Headers/Header";
import SimpleFilterDropdown from "components/Filter/Filter";
import Cards from "components/Cards/Cards";

const Booking = () => {
    const [originalBookings, setOriginalBookings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState();
    const navigate = useNavigate();
    const [changeMessages, setChangeMessages] = useState({
        total: "",
        confirmed: "",
        pending: "",
        cancelled: ""
    });

    const prevTotalsRef = useRef({
        total: 0,
        confirmed: 0,
        pending: 0,
        cancelled: 0
    });

    async function getBookings() {
        try {
            const res = await fetch( process.env.REACT_APP_API_URL + 'bookings', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await res.json();
            if (json.error) {
                console.log(json.error);
            } else {
                setOriginalBookings(json);
                setBookings(json);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    }


    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <Badge color="success">Confirmed</Badge>;
            case 'cancelled':
                return <Badge color="danger">Cancelled</Badge>
            case 'pending':
                return <Badge color="warning">Pending</Badge>
        }
    };

    const deleteBooking = async (id) => {

        try {
            const res = await fetch( process.env.REACT_APP_API_URL + "bookings", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const json = await res.json();
            if (json.error) {
                console.error(json.error);
            } else {
                setOriginalBookings(bookings.filter(v => v._id !== id));
                setBookings(bookings.filter(v => v._id !== id));
            }
        } catch (err) {
            console.error("Erro ao deletar venue:", err);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch( process.env.REACT_APP_API_URL + "bookings/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    status: status
                })
            });
            const json = await res.json();
            if (json.error) {
                console.error(json.error);
            }
            setOriginalBookings(prevVenues =>
                prevVenues.map(v =>
                    v._id === id ? { ...v, status: json.status } : v
                )
            );
            setBookings(prevVenues =>
                prevVenues.map(v =>
                    v._id === id ? { ...v, status: json.status } : v
                )
            );
        } catch (err) {
            console.error("Erro ao alterar status venue:", err);
        }
    };


    useEffect(() => {
        switch (filter) {
            case 'Pending':
            case 'Confirmed':
            case 'Cancelled':
                setBookings(
                    originalBookings.filter(booking =>
                        booking.status === filter.toLowerCase()
                    )
                );
                break;
            default:
                setBookings(originalBookings);
        }
    }, [filter, originalBookings]);

    useEffect(() => {
        getBookings();
    }, [])


    const cardData = useMemo(() => [
        {
            title: "Total Bookings",
            value: bookings.length.toString(),
            icon: "fas fa-calendar-check",
            color: "info"
        },
        {
            title: "Confirmed Bookings",
            value: `$${bookings
                .filter(b => b.status === "confirmed")
                .reduce((sum, b) => sum + (b.venueId.price || 0), 0).toFixed(2)}`,
            icon: "ni ni-check-bold",
            color: "success"
        },
        {
            title: "Pending Bookings",
            value: `$${bookings
                .filter(b => b.status === "pending")
                .reduce((sum, b) => sum + (b.venueId.price || 0), 0).toFixed(2)}`,
            icon: "ni ni-time-alarm",
            color: "warning"
        },
        {
            title: "Cancelled Bookings",
            value: `$${bookings
                .filter(b => b.status === "cancelled")
                .reduce((sum, b) => sum + (b.venueId.price || 0), 0).toFixed(2)}`,
            icon: "ni ni-fat-remove",
            color: "danger"
        },
    ], [bookings]);

    


    return (
        <>
            <Header CustomCards={<Cards cards={cardData} />} />
            <Container className="mt--7" fluid>
                <Row>
                    <Col md="12">
                        <Card className="shadow mb-4">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <Col xs="6">
                                        <h3 className="mb-0">Booking List</h3>
                                    </Col>
                                    <Col xs="6" className="text-right">
                                        <SimpleFilterDropdown
                                            label="Filter"
                                            options={["All", "Confirmed", "Pending", "Cancelled"]}
                                            onChange={setFilter}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table className="table-flush" responsive>
                                    <thead className="thead-light">
                                        {bookings.length > 0 &&
                                            <tr>
                                                <th>Venue</th>
                                                <th>Member</th>
                                                <th>Member ID</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Notes</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        }
                                    </thead>
                                    <tbody>
                                        {bookings.length > 0 ?
                                            bookings.map((booking, index) => (
                                                <tr key={index}>
                                                    <td>{booking.venueId.name}</td>
                                                    <td>{booking.userId.lastName}, {booking.userId.firstName}</td>
                                                    <td>{booking.userId._id}</td>
                                                    <td>
                                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td>{booking.startTime} - {booking.endTime}</td>
                                                    <td>{booking.notes}</td>
                                                    <td>{getStatusBadge(booking.status)}</td>
                                                    <td className="text-right">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href=""
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem
                                                                    href="#"
                                                                    onClick={(e) => deleteBooking(booking._id)}
                                                                >
                                                                    Delete
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    href="#"
                                                                    onClick={(e) => updateStatus(booking._id, 'cancelled')}
                                                                >
                                                                    Cancel
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td>
                                                    <span>Booking List is Empty</span>
                                                </td>
                                            </tr>
                                        }
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
