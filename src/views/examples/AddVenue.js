import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";

const AddVenue = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [status, setStatus] = useState(true);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [venueIndice, setVenueIndice] = useState(0);
    const [startTimeOperation, setStartTimeOperation] = useState('');
    const [endTimeOperation, setEndTimeOperation] = useState('');
    const [price, setPrice] = useState(0);

    const navigate = useNavigate();

    const { id } = useParams();

    const getVenue = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + "venues/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await res.json();
            if (json.error) {
                console.log(json.error);
            } else {
                setName(json.name || "");
                setCategory(json.category || "");
                setDescription(json.description || "");
                setCapacity(json.capacity || "");
                setStatus(json.isActive);
                setEmail(json.email || "");
                setPhone(json.phone || "");
                setAddress(json.address || "");
                setCity(json.city || "");
                setState(json.state || "");
                setCountry(json.country || "");
                setPostalCode(json.postalCode || "");
                setStartTimeOperation(json.startTimeOperation || "");
                setEndTimeOperation(json.endTimeOperation || "");
                setPrice(json.price || 0);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            description,
            address,
            city,
            state,
            country,
            postalCode,
            phone,
            email,
            category,
            capacity: capacity ? parseInt(capacity) : undefined,
            isActive: status,
            startTimeOperation: startTimeOperation,
            endTimeOperation: endTimeOperation,
            price: price
        };
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + "venues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (json.error) {
                console.log(json.error);
            } else {
                navigate("/admin/experience/list");
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            id,
            name,
            description,
            address,
            city,
            state,
            country,
            postalCode,
            phone,
            email,
            category,
            capacity: capacity ? parseInt(capacity) : undefined,
            isActive: status,
            startTimeOperation: startTimeOperation,
            endTimeOperation: endTimeOperation,
            price: price
        };
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + "venues", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (json.error) {
                console.log(json.error);
            } else {
                navigate("/admin/experience/list");
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        }
    };


    useEffect(() => {
        const indices = {
            'tennis': 1,
            'spa': 2,
            'fitness': 3,
            'fb': 4
        };
        setVenueIndice((indices[category]) ? indices[category] : 0);
    }, [category])


    useEffect(() => {
        if (id) {
            getVenue();
        } else {
            setName("");
            setCategory("");
            setDescription("");
            setCapacity("");
            setStatus(true);
            setEmail("");
            setPhone("");
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setPostalCode("");
            setStartTimeOperation("");
            setEndTimeOperation("");
            setPrice(0);
        }
    }, [id]);

    return (
        <>
            <UserHeader title={(id) ? 'Update Experience' : 'Add Experience'}
                description={(id) ? 'In this page you can update a experience.' : 'In this page you can add a new experience.'} />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{(id) ? 'Update' : 'Create'} Experience</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">Experience information</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-name">Name</label>
                                                    <Input
                                                        id="input-name"
                                                        placeholder="Experience name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-category">Category</label>
                                                    <Input
                                                        type="select"
                                                        id="input-category"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="form-control-alternative"
                                                        style={{
                                                            appearance: 'none',
                                                            WebkitAppearance: 'none',
                                                            MozAppearance: 'none',
                                                            backgroundColor: 'white',
                                                            borderColor: '#cad1d7',
                                                            color: '#525f7f',
                                                        }}
                                                    >
                                                        <option value="">Click to Select Category</option>
                                                        <option value="tennis">Tennis</option>
                                                        <option value="spa">SPA</option>
                                                        <option value="fitness">Fitness</option>
                                                        <option value="fb">Food & Bevarege</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-description">Description</label>
                                                    <Input
                                                        id="input-description"
                                                        placeholder="Description"
                                                        type="text"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />

                                    <h6 className="heading-small text-muted mb-4">Experience Location</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="8">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-address">Address</label>
                                                    <Input
                                                        id="input-address"
                                                        placeholder="Address"
                                                        type="text"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-postal-code">Postal code</label>
                                                    <Input
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="text"
                                                        value={postalCode}
                                                        onChange={(e) => setPostalCode(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="5">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-city">City</label>
                                                    <Input
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-state">State</label>
                                                    <Input
                                                        id="input-state"
                                                        placeholder="State"
                                                        type="text"
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="3">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-country">Country</label>
                                                    <Input
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        className="form-control-alternative"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>



                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" >
                                    <div className="card-profile-image">
                                        <img
                                            alt="..."
                                            src={require(`../../assets/img/theme/venue-${venueIndice}.jpg`)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-3">
                                <h6 className="heading-small text-muted mb-4 mt-4">Experience Details</h6>
                                <div className="pl-lg-2">
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-price">Service Price US$</label>
                                                <Input
                                                    id="input-price"
                                                    placeholder="00.00"
                                                    type="number"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="form-control-alternative"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-endTime">Start Time Operation</label>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        slotProps={{ textField: { fullWidth: true } }}
                                                        value={
                                                            startTimeOperation ? new Date( "1970-01-01T"+startTimeOperation) : null
                                                        }
                                                        onChange={(newValue) => {
                                                            setStartTimeOperation(moment( newValue ).format( "HH:mm"));
                                                        }
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-endTime">End Time Operation</label>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <TimePicker
                                                        slotProps={{ textField: { fullWidth: true } }}
                                                        value={
                                                            endTimeOperation ? new Date( '1970-01-01T'+endTimeOperation ) : null
                                                        }
                                                        onChange={(newValue) => {
                                                            setEndTimeOperation( moment( newValue ).format( "HH:mm") );
                                                        }
                                                        }
                                                    />
                                                </LocalizationProvider>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-capacity">Capacity</label>
                                                <Input
                                                    id="input-capacity"
                                                    placeholder="Capacity"
                                                    type="number"
                                                    value={capacity}
                                                    onChange={(e) => setCapacity(e.target.value)}
                                                    className="form-control-alternative"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-category">Status</label>
                                                <Input
                                                    type="select"
                                                    id="input-category"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="form-control-alternative"
                                                    style={{
                                                        appearance: 'none',
                                                        WebkitAppearance: 'none',
                                                        MozAppearance: 'none',
                                                        backgroundColor: 'white',
                                                        borderColor: '#cad1d7',
                                                        color: '#525f7f',
                                                    }}
                                                >
                                                    <option value="true">Active</option>
                                                    <option value="false">Inactive</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className="my-4" />
                                <h6 className="heading-small text-muted mb-4">Experience Contact</h6>
                                <div className="pl-lg-2">
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-email">Email</label>
                                                <Input
                                                    id="input-email"
                                                    placeholder="Email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control-alternative"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <FormGroup>
                                                <label className="form-control-label" htmlFor="input-phone">Phone</label>
                                                <Input
                                                    id="input-phone"
                                                    placeholder="Phone"
                                                    type="text"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="form-control-alternative"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="pl-lg-2 mb-4 mt-4">
                                    <Row>
                                        <Col lg="12" className="text-right">
                                            <Button
                                                color="info"
                                                href=""
                                                onClick={(e) => { (id) ? handleUpdate(e) : handleSubmit(e) }}
                                            >
                                                {(id) ? 'UPDATE' : 'CREATE'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};


export default AddVenue;
