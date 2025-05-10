import React, { useEffect, useState } from "react";
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

const VenueList = () => {
    const [originalVenues, setOriginalVenues] = useState([]);
    const [venues, setVenues] = useState([]);
    const [filter, setFilter] = useState();
    const navigate = useNavigate();

    async function getVenues() {
        try {
            const res = await fetch( process.env.REACT_APP_API_URL + "venues", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await res.json();
            if (json.error) {
                console.log(json.error);
            } else {
                setOriginalVenues(json);
                setVenues(json);
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
        }

    }





    const getStatusBadge = (status) => {

        if (status) {
            return <Badge color="success">Active</Badge>;
        } else {
            return <Badge color="danger">Inactive</Badge>;
        }
    };

    const deleteVenue = async (id) => {

        try {
            const res = await fetch( process.env.REACT_APP_API_URL + "venues", {
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
                setOriginalVenues(venues.filter(v => v._id !== id));
                setVenues(venues.filter(v => v._id !== id));
            }
        } catch (err) {
            console.error("Erro ao deletar venue:", err);
        }
    };

    const updateStatus = async (id) => {

        try {
            const res = await fetch( process.env.REACT_APP_API_URL + "venues/status", {
                method: "POST",
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
            }
            setOriginalVenues(prevVenues =>
                prevVenues.map(v =>
                    v._id === id ? { ...v, isActive: json.isActive } : v
                )
            );
            setVenues(prevVenues =>
                prevVenues.map(v =>
                    v._id === id ? { ...v, isActive: json.isActive } : v
                )
            );

        } catch (err) {
            console.error("Erro ao alterar status venue:", err);
        }
    };


    useEffect(() => {
        if (!filter || filter === "All") {
            setVenues(originalVenues);
        } else if (filter === "Active" || filter === "Inactive") {
            setVenues(originalVenues.filter(v =>
                filter === "Active" ? v.isActive : !v.isActive
            ));
        } else if ( filter === "Food & Beverage" ) {
            setVenues(originalVenues.filter(v =>
                v.category === 'fb'
            ));
        }else {
            setVenues(originalVenues.filter(v =>
                v.category === filter.toLowerCase()
            ));
        }
    }, [filter, originalVenues]);

    const categoryIcons = {
        fb: { className: "fas fa-utensils", title: "Food & Beverage" },
        spa: { className: "fas fa-spa", title: "Spa" },
        fitness: { className: "fas fa-dumbbell", title: "Fitness" },
        tennis: { className: "fas fa-table-tennis", title: "Tennis" },
    };

    useEffect(() => {
        getVenues();
    }, [])

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
                                        <h3 className="mb-0">Venues List</h3>
                                    </Col>
                                    <Col xs="6" className="text-right">
                                        <SimpleFilterDropdown
                                            label="Filter"
                                            options={["All", "Tennis", "SPA", "Fitness", "Food & Beverage", "Active", "Inactive"]}
                                            onChange={setFilter}
                                        />
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table className="table-flush" responsive>
                                    <thead className="thead-light">
                                        {venues.length > 0 &&
                                            <tr>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Capacity</th>
                                                <th>Operation</th>
                                                <th>Phone</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        }
                                    </thead>
                                    <tbody>
                                        {venues.length > 0 ?
                                            venues.map((venue, index) => (
                                                <tr key={index}>
                                                    <td>{venue.name}</td>
                                                    <td>
                                                    {categoryIcons[venue.category] ? (
                                                        <span class="text-info">
                                                        <i
                                                            className={categoryIcons[venue.category].className}
                                                            title={categoryIcons[venue.category].title}
                                                        ></i>
                                                        </span>
                                                    ) : (
                                                        venue.category
                                                    )}
                                                    </td>
                                                    <td>{venue.capacity}</td>
                                                    <td>{venue.startTimeOperation} - {venue.endTimeOperation}</td>
                                                    <td>{venue.phone}</td>
                                                    <td>{getStatusBadge(venue.isActive)}</td>
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
                                                                    href=""
                                                                    onClick={(e) => navigate("/admin/venue/edit/" + venue._id)}
                                                                >
                                                                    Edit
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    href="#"
                                                                    onClick={(e) => deleteVenue(venue._id)}
                                                                >
                                                                    Delete
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    href="#pablo"
                                                                    onClick={(e) => updateStatus(venue._id)}
                                                                >
                                                                    {venue.isActive ? 'Inactive' : 'Active'}
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td>
                                                    <span>Venues List is Empty</span>
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

export default VenueList;
