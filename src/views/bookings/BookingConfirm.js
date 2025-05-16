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

const BookingConfirm = () => {

    const [booking, setBooking] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) confirmedBooking();
    }, [])



    async function confirmedBooking() {

        console.log(id);

        if (!id) return;

        const payload = {
            id: id,
            status: "confirmed"
        }

        try {
            const res = await fetch( process.env.REACT_APP_API_URL +  "bookings/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            const json = await res.json();
            getNotification( json );
            setBooking(json);
        } catch (err) {
            console.error("Cancellation failed", err);
        }
    }

    async function getNotification(booking)
        {
            const message = `*Booking Confirmation*\n\n` +
                `Your booking was successfully!\n\n` +
                `🧘 *Experience:* ${booking.venueId?.name}\n` +
                `📍 *Location:* ${booking.venueId?.address}, ${booking.venueId?.city} - ${booking.venueId?.state}\n` +
                `🕒 *When:* ${moment(booking.date).format("MM/DD/YY")} | ${moment("1970-01-01T" + booking.startTime).format("LT")} - ${moment("1970-01-01T" + booking.endTime).format("LT")}\n` +
                `📌 *Status:* ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}\n\n` +
                `🔗 *Confirm your booking:\n\n* https://williams-island.vercel.app/booking/${booking._id}/confirm\n\n` +
                `Need to make changes? Please contact us.\n\n` +
                `Thank you! 🌟`;
    
            const payload = {
                to: booking.userId.phone,
                message: message
                
            }
            try {
                const res = await fetch("https://avent7.app.n8n.cloud/webhook/booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
    
                });
                const json = await res.json();
            } catch (err) {
    
            }
    
        }

    const indices = {
        'tennis': 1,
        'spa': 2,
        'fitness': 3,
        'fb': 4
    };


    return (
        <Container className="mt-5">
            <Row className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn">
                <img src={require("../../assets/img/brand/WI_Logo.png")} alt="logo" width={120} height={120} />
            </Row>
            <Row className="d-flex justify-content-center align-items-center mt-5 animate__animated animate__fadeIn">
                <h2 className="mb-4">Manage My Bookings</h2>
            </Row>
            {booking && (
                <Row
                    className="d-flex justify-content-center align-items-center"
                >
                    <Col xs="12" sm="8" md="6" lg="5" xl="4" className="mb-4">
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BookingConfirm;
