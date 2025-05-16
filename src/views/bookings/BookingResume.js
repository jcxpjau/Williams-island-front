import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

const BookingResume = ({ user, setUser }) => {

    const [bookings, setBookings] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (user || id) {
            fetchBookings();
        } else {
            setShowLogin(true);
        }
    }, [user]);

    async function handleLogin() {
        if (!email || !password) {
            alert("Fill in all fields");
            return;
        }

        const payload = {
            email: email,
            password: password
        }

        try {
            const res = await fetch("http://localhost:8000/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                alert("Invalid credentials");
                return;
            }
            const data = await res.json();
            setUser(data);
            setShowLogin(false);
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    async function fetchBookings() {
        try {
            const res = await fetch(`http://localhost:8000/bookings?user=${(user) ? user._id : id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error("Failed to fetch bookings", err);
        }
    }

    async function confirmedBooking(id) {

        if (!id) return;

        const payload = {
            id: id,
            status: "confirmed"
        }

        try {
            await fetch("http://localhost:8000/bookings/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            setBookings(prevBookings =>
                prevBookings.map(b =>
                    b._id === id ? { ...b, status: "confirmed" } : b
                )
            );
        } catch (err) {
            console.error("Cancellation failed", err);
        }
    }

    async function cancelBooking(id) {

        if (!id) return;

        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        const payload = {
            id: id,
            status: "cancelled"
        }

        console.log(payload);

        try {
            await fetch("http://localhost:8000/bookings/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            setBookings(prevBookings =>
                prevBookings.map(b =>
                    b._id === id ? { ...b, status: "cancelled" } : b
                )
            );
        } catch (err) {
            console.error("Cancellation failed", err);
        }
    }

    const indices = {
        'tennis': 1,
        'spa': 2,
        'fitness': 3,
        'fb': 4
    };


    function renderBookingCards(filteredBookings) {
        return filteredBookings.map(booking => (
            <Col xl="4" key={booking._id} className="mb-4">
                <Card className="shadow border-0 overflow-hidden">
                    <div style={{ width: '100%', height: 120, overflow: 'hidden' }}>
                        <img
                            src={require(`../../assets/img/theme/venue-${indices[booking.venueId.category]}.jpg`)}
                            alt={booking.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <CardBody>
                        <CardText tag="h4">
                            {booking.venueId?.name || "Experience"}
                        </CardText>
                        <CardText tag="small">
                            <strong>When: </strong> {moment(booking.date).format("MM/DD/YY")} | {moment("1970-01-01T" + booking.startTime).format("LT")} - {moment("1970-01-01T" + booking.endTime).format("LT")} <br />
                            <strong>Where: </strong> {booking.venueId?.address}, {booking.venueId?.city} - {booking.venueId?.state} <br />
                        </CardText>
                        <CardText tag="small">
                            <strong>Status: </strong>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} <br />
                        </CardText>
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            {booking.status !== 'cancelled' && booking.status == "pending" &&
                                <Button
                                    size="sm"
                                    onClick={() => confirmedBooking(booking._id)}
                                    style={{ backgroundColor: "#11cdef", border: "none", color: "white" }}
                                >
                                    Confirm
                                </Button>
                            }
                            {booking.status !== 'cancelled' &&
                                <Button
                                    size="sm"
                                    color="danger"
                                    style={{ border: "none" }}
                                    onClick={() => cancelBooking(booking._id)}
                                >
                                    Cancel
                                </Button>
                            }
                        </div>
                    </CardBody>
                </Card>
            </Col>
        ));
    }

    return (
        <Container className="mt-5">
            {!showLogin &&
                <>
                    <Row className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn">
                        <img src={require("../../assets/img/brand/WI_Logo.png")} alt="logo" width={120} height={120} />
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center mt-5 animate__animated animate__fadeIn">
                        <h2 className="mb-4">Manage My Bookings</h2>
                    </Row>
                    {["confirmed", "pending", "cancelled"].map(status => {
                        const filtered = bookings.filter(b => b.status === status);
                        if (filtered.length === 0) return null;
                        return (
                            <div key={status}>
                                <h4 className="mt-4 mb-4 text-capitalize">{status.charAt(0).toUpperCase() + status.slice(1)} Bookings</h4>
                                <Row>
                                    {renderBookingCards(filtered)}
                                </Row>
                            </div>
                        );
                    })}
                </>
            }
            {showLogin &&
                <div className="p-4 border rounded shadow-sm" style={{ maxWidth: 400, margin: '0 auto' }}>
                    <div className="text-center mb-4">
                        <img src={require("../../assets/img/brand/WI_Logo.png")} alt="logo" width={60} height={60} />
                        <h5 className="mt-3">Please log in to view your bookings</h5>
                    </div>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                    <div className="text-end">
                        <Button
                            color="primary"
                            style={{ backgroundColor: "#525f7f", border: 'none' }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            }

        </Container>
    );
};

export default BookingResume;
