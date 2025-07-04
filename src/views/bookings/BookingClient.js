import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "animate.css";
import "../custom.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "services/api";

const BookingClient = ({ user, setUser }) => {
  const initialLogin = { email: null, password: null };
  const [availableExperiences, setAvailableExperiences] = useState([]);
  const [searching, setSearching] = useState(false);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState({});
  const [bookings, setBookings] = useState([]);
  const [bookingsByVenue, setBookingsByVenue] = useState({});
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bookingConfirm, setBookingConfirm] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [setupForm, setSetupForm] = useState({
    email: null,
    dateOfBirth: null,
    password: null,
  });
  const [loginMsg, setLoginMsg] = useState(null);

  const handleHourClick = (experienceId, hour) => {
    setSelectedHours((prev) => ({
      ...prev,
      [experienceId]: prev[experienceId] === hour ? null : hour,
    }));
  };

  const FindExperiences = async () => {
    if (!category || !date) {
      console.warn("Please fill the following fields: category, date and time");
      return;
    }
    try {
      const { data } = await api.get(`experiences`, {params:{'category': category}});
      setAvailableExperiences(data.data);
      setSearching(true);
      GetBookings();
    } catch (err) {
      console.log(err);
    }
  };

  async function GetBookings() {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const { data } = await api.get("bookings", {
        params: { date: formattedDate },
      });
      const grouped = {};
      data.forEach((booking) => {
        const experienceId = booking.experienceId;
        const hour = moment("1970-01-01T" + booking.startTime).format("HH:00");
        if (!grouped[experienceId]) grouped[experienceId] = new Set();
        grouped[experienceId].add(hour);
      });
      setBookingsByVenue(grouped);
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function Booking(expId) {
    if (!date || Object.keys(selectedHours).length === 0) {
      return;
    }

    const payload = {
      experienceId: expId,
      memberId: user.id,
      date: new Date(date).toISOString().split("T")[0],
      startTime: Object.values(selectedHours)[0],
      endTime: moment(Object.values(selectedHours)[0], "HH:mm")
        .add(1, "hour")
        .format("HH:mm"),
      status: "pending",
      notes: "",
    };

    const { data } = await api.post(`bookings`, payload);
    // getNotification(data);
    setSelectedHours({});
    setBookingConfirm(true);
  }
  /* 
  async function getNotification(booking) {
    const message =
      `*Booking Confirmation*\n\n` +
      `Your booking is complete!\n\n` +
      `🧘 *Experience:* ${booking.experience?.name}\n` +
      `📍 *Location:* ${booking.experience?.address}, ${booking.experience?.city} - ${booking.experience?.state}\n` +
      `🕒 *When:* ${moment(booking.date).format("MM/DD/YY")} | ${moment(
        "1970-01-01T" + booking.startTime
      ).format("LT")} - ${moment("1970-01-01T" + booking.endTime).format(
        "LT"
      )}\n` +
      `📌 *Status:* ${
        booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
      }\n\n` +
      `🔗 *Confirm your booking:\n\n* https://williams-island.vercel.app/booking/${booking._id}/confirm\n\n` +
      `Need to make changes? Please contact us.\n\n` +
      `Thank you! 🌟`;

    const payload = {
      to: booking.userId.phone,
      category: booking.experience.category,
      message: message,
    };
    try {
      const res = await fetch("https://avent7.app.n8n.cloud/webhook/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
    } catch (err) {}
  } */

  const handleLoginForm = (e) => {
    const { id, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSetUpForm = (e) => {
    setLoginMsg(null);
    const { id, value } = e.target;
    setSetupForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  async function handleLogin() {
    if (!loginForm.email || !loginForm.password) {
      setLoginMsg("Fill in all fields");
      return;
    }

    try {
      const { data } = await api.post("members-auth/login", loginForm);
      setLoginModalOpen(false);
      setLoginMsg(null);
      if (data) {
        const { data } = await api.get(`members`, {
          params: { email: loginForm.email.trim() },
        });
        setUser(data.data[0]);
      }
    } catch (err) {
      setLoginMsg("Incorrect email or password");
    }
  }

  async function handleSetup() {
    if (!setupForm.email || !setupForm.password || !setupForm.dateOfBirth) {
      setLoginMsg("Please fill in all fields");
      return;
    }
    let memberToSetup = null;
    try {
      const { data } = await api.get(`members`, {
        params: { email: setupForm.email.trim() },
      });
      memberToSetup = data.data[0]
      console.log(memberToSetup)
      if (memberToSetup) {
        if (memberToSetup.dateOfBirth === setupForm.dateOfBirth) {
          const response = await api.post(
            `/members/${memberToSetup.id}/password`,
            { password: setupForm.password }
          );
          setSetupOpen(false);
          setLoginModalOpen(true);
          setLoginForm({
            email: setupForm.email,
            password: setupForm.password,
          });
          setLoginMsg(null);
        } else {
          setLoginMsg("Incorrect information");
        }
      } else {
        setLoginMsg("Incorrect information");
      }
    } catch {}
  }

  function clear() {
    setSearching(false);
    setDate(null);
    setCategory(null);
    setSelectedHours({});
  }

  const indices = {
    Sports: 1,
    Spa: 2,
    Pet: 2,
    Fitness: 3,
    Pool: 3,
    Marina: 3,
    Restaurant: 4,
    Cafe: 4,
    Bar: 4,
  };

  return (
    <Container className="mt-5" fluid>
      {searching === false && (
        <Row className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn">
          <img
            src={require("../../assets/img/brand/WI_Logo.png")}
            alt="logo"
            width={120}
            height={120}
          />
        </Row>
      )}
      <Row className="d-flex justify-content-center align-items-center mt-5 animate__animated animate__fadeIn">
        <h1>Book Your Perfect Experience</h1>
      </Row>
      {searching === false && (
        <Row className="d-flex justify-content-center align-items-center mt-2 animate__animated animate__fadeIn">
          <span>
            Find and booking the ideal experience for you. Tennis courts,
            football fields, swimming pools, and more.
          </span>
        </Row>
      )}
      <Row className="bg-secondary shadow border-0 rounded d-flex justify-content-center align-items-center mt-5 pt-3 pb-3 animate__animated animate__fadeIn">
        <Col xl="5" className="mt-3">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              value={category ?? null}
              onChange={(selected) => setCategory(selected.target.value)}
            >
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Restaurant">Restaurants</MenuItem>
              <MenuItem value="Cafe">Cafe</MenuItem>
              <MenuItem value="Bar">Bar</MenuItem>
              <MenuItem value="Pet">Pets</MenuItem>
              <MenuItem value="Spa">Spa</MenuItem>
              <MenuItem value="Pool">Pool</MenuItem>
              <MenuItem value="Fitness">Fitness</MenuItem>
              <MenuItem value="Marina">Marina</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col xl="5" className="mt-3">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              slotProps={{ textField: { fullWidth: true } }}
              value={date ?? null}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </Col>
        <Col xl="2" className="mt-3">
          <Button
            className="w-100"
            style={{
              backgroundColor: "#525f7f",
              border: "none",
              color: "white",
              height: "55px",
            }}
            onClick={FindExperiences}
            disabled={!category || !date}
          >
            Find
          </Button>
        </Col>
      </Row>
      {searching == false && (
        <Row className="d-flex justify-content-center align-items-center mt-3 animate__animated animate__fadeIn">
          <Col xl="3" className="mt-3">
            <span className="d-flex justify-content-center align-items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ width: 20, marginRight: 8 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Instant Booking
            </span>
          </Col>
          <Col xl="3" className="mt-3">
            <span className="d-flex justify-content-center align-items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ width: 20, marginRight: 8 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No Booking Fees
            </span>
          </Col>
          <Col xl="3" className="mt-3">
            <span className="d-flex justify-content-center align-items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ width: 20, marginRight: 8 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Free Cancellation
            </span>
          </Col>
        </Row>
      )}
      {availableExperiences.length > 0 && searching === true && (
        <Row className="d-flex justify-content-center align-items-center mt-3 animate__animated animate__fadeIn">
          {searching && (
            <Col xl="12" className="mt-3">
              <Button
                style={{
                  backgroundColor: "#f5f5f5",
                  border: "none",
                  color: "#666666",
                }}
                onClick={clear}
                disabled={!category || !date}
              >
                Clear All
              </Button>
            </Col>
          )}
          <Col xl="12" className="mt-4">
            {availableExperiences.map((experience) => {
              const generateHours = (start, end) => {
                let slots = [];
                let [startHour] = start.split(":").map(Number);
                let [endHour] = end.split(":").map(Number);

                if (endHour === 0) endHour = 24;

                for (let hour = startHour; hour < endHour; hour++) {
                  slots.push(`${hour.toString().padStart(2, "0")}:00`);
                }

                return slots;
              };

              const availableHours = generateHours(
                experience.startTimeOperation,
                experience.endTimeOperation
              );

              const bookedHours = bookingsByVenue[experience.id] || new Set();
              const selectedHour = selectedHours[experience.id];

              return (
                <Row className="mb-4 px-0 g-0" key={experience.id}>
                  <Col xl="12">
                    <Card className="border-0 shadow-lg animate__animated animate__fadeIn overflow-hidden">
                      <Row className="g-0">
                        <Col
                          xl="4"
                          className="d-flex align-items-center justify-content-center"
                        >
                          <img
                            src={require(`../../assets/img/theme/venue-${
                              indices[experience.category]
                            }.jpg`)}
                            alt={experience.name}
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col xl="8">
                          <CardBody className="position-relative px-4">
                            <CardTitle tag="h4" className="fw-bold mb-1">
                              {experience.name} | {experience.description}
                            </CardTitle>
                            <CardText className="mb-3 text-muted">
                              <i className="fa fa-clock mr-1"></i>
                              {moment(
                                `1970-01-01T${experience.startTimeOperation}`
                              ).format("LT")}
                              {" - "}
                              {moment(
                                `1970-01-01T${experience.endTimeOperation}`
                              ).format("LT")}
                              <i
                                className="fa fa-dollar-sign ml-2"
                                style={{ color: "#11cdef" }}
                              ></i>
                              <strong style={{ color: "#11cdef" }}>
                                {experience.price}
                              </strong>{" "}
                              / hour
                            </CardText>
                            <Row className="mb-3">
                              {availableHours.map((hour) => {
                                const isBooked = bookedHours.has(hour);
                                const isSelected = selectedHour === hour;

                                return (
                                  <Col
                                    key={hour}
                                    xs="6"
                                    sm="4"
                                    md="3"
                                    lg="2"
                                    className="mb-2"
                                  >
                                    <button
                                      onClick={() =>
                                        !isBooked &&
                                        handleHourClick(experience.id, hour)
                                      }
                                      className={`btn btn-sm w-100 ${
                                        isSelected ? "text-white" : ""
                                      }`}
                                      style={{
                                        borderColor: isBooked
                                          ? "#ccc"
                                          : "#11cdef",
                                        backgroundColor: isBooked
                                          ? "#eee"
                                          : isSelected
                                          ? "#11cdef"
                                          : "transparent",
                                        color: isBooked
                                          ? "#999"
                                          : isSelected
                                          ? "#fff"
                                          : "#11cdef",
                                        cursor: isBooked
                                          ? "not-allowed"
                                          : "pointer",
                                      }}
                                      disabled={isBooked}
                                    >
                                      {moment(`1970-01-01T${hour}`).format(
                                        "LT"
                                      )}
                                    </button>
                                  </Col>
                                );
                              })}
                            </Row>
                            <div className="d-flex justify-content-between align-items-end gap-3 mt-3">
                              <span className="small text-muted mr-2">
                                You're in luck! We still have{" "}
                                <strong>
                                  {availableHours.length - bookedHours.size}
                                </strong>{" "}
                                timeslots left
                              </span>
                              {!user ? (
                                <button
                                  className="btn"
                                  style={{
                                    backgroundColor: "#11cdef",
                                    color: "white",
                                  }}
                                  onClick={() => setLoginModalOpen(true)}
                                >
                                  Login to Book
                                </button>
                              ) : (
                                <button
                                  className="btn"
                                  style={{
                                    backgroundColor: "#11cdef",
                                    color: "white",
                                  }}
                                  onClick={() => Booking(experience.id)}
                                >
                                  Book
                                </button>
                              )}
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      )}
      <Modal
        isOpen={loginModalOpen}
        toggle={() => setLoginModalOpen(!loginModalOpen)}
      >
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <img
            src={require("../../assets/img/brand/WI_Logo.png")}
            alt="logo"
            width={60}
            height={60}
          />
        </Row>
        <ModalBody>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={loginForm.email}
              onChange={(e) => {
                handleLoginForm(e);
                setLoginMsg(null);
              }}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={loginForm.password}
              onChange={(e) => {
                handleLoginForm(e);
                setLoginMsg(null);
              }}
              placeholder="Enter your password"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-column w-100">
            <a
              className="mb-4 text-dark ml-auto link-hover"
              onClick={() => {
                setLoginModalOpen(false);
                setSetupOpen(true);
                setLoginMsg(null);
              }}
            >
              First time logging in?
            </a>
            <div className="d-flex align-items-end ms-auto justify-content-end w-100">
              {loginMsg && (
                <span className="text-center mr-3 my-auto">{loginMsg}</span>
              )}
              <div className="ms-auto">
                <Button
                  color="primary"
                  style={{ backgroundColor: "#525f7f", border: "none" }}
                  onClick={handleLogin}
                  className="me-2"
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    setLoginModalOpen(false);
                    setLoginForm(initialLogin);
                    setLoginMsg(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={bookingConfirm}
        toggle={() => setBookingConfirm(!bookingConfirm)}
      >
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <img
            src={require("../../assets/img/brand/WI_Logo.png")}
            alt="logo"
            width={60}
            height={60}
          />
        </Row>
        <ModalBody>
          <Row className="d-flex justify-content-center align-items-center mt-2 px-5">
            <span className="text-center">Thank you!</span>
            <span className="text-center">
              You will shortly receive information about your reservation and
              how to confirm it
            </span>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setBookingConfirm(false);
              clear();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={setupOpen} toggle={() => setSetupOpen(!setupOpen)}>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <img
            src={require("../../assets/img/brand/WI_Logo.png")}
            alt="logo"
            width={60}
            height={60}
          />
        </Row>
        <ModalBody>
          <span className="d-flex justify-content-center mb-5">
            {" "}
            Set up your member account{" "}
          </span>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={setupForm.email}
              onChange={(e) => {
                handleSetUpForm(e);
              }}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email"> Date of birth </Label>
            <Input
              type="date"
              id="dateOfBirth"
              value={setupForm.dateOfBirth}
              onChange={(e) => {
                handleSetUpForm(e);
              }}
              placeholder="Enter your date of birth"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={setupForm.password}
              onChange={(e) => {
                handleSetUpForm(e);
              }}
              placeholder="Enter your password"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-column w-100">
            <div className="d-flex align-items-end ms-auto justify-content-end w-100">
              {loginMsg && (
                <span className="text-right mr-3 my-auto">{loginMsg}</span>
              )}
              <div className="ms-auto d-flex flex-col">
                <Button
                  color="primary"
                  style={{ backgroundColor: "#525f7f", border: "none" }}
                  onClick={handleSetup}
                  className="me-2"
                >
                  Login
                </Button>
                <Button color="secondary" onClick={() => setSetupOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default BookingClient;
