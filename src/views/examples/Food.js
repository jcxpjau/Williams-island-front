import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Badge,
} from "reactstrap";
import Header from "components/Headers/Header";

const FoodAndDrinks = () => {
  const lastOrders = [
    {
      date: "Apr 14, 2024",
      item: "Cheeseburger Combo",
      type: "Food",
      quantity: 2,
      status: "Delivered",
    },
    {
      date: "Apr 14, 2024",
      item: "Caesar Salad",
      type: "Food",
      quantity: 1,
      status: "In Preparation",
    },
    {
      date: "Apr 13, 2024",
      item: "Coke",
      type: "Drink",
      quantity: 3,
      status: "Delivered",
    },
    {
      date: "Apr 13, 2024",
      item: "Beer (Pint)",
      type: "Drink",
      quantity: 2,
      status: "Cancelled",
    },
    {
      date: "Apr 12, 2024",
      item: "Pizza Margherita",
      type: "Food",
      quantity: 1,
      status: "Delivered",
    },
  ];

  const restaurant = {
    name: "Sunset Grill",
    address: "123 Ocean Drive, Miami Beach",
    contact: "(305) 555-1234",
    openHours: "10:00 AM - 10:00 PM",
    status: "Open",
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge color="success">{status}</Badge>;
      case "In Preparation":
        return <Badge color="warning">{status}</Badge>;
      case "Cancelled":
        return <Badge color="danger">{status}</Badge>;
      default:
        return <Badge color="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Header/>
      <Container className="mt--7" fluid>
        <Row>
          {/* Últimos Pedidos */}
          <Col md="8">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Last Orders</h3>
              </CardHeader>
              <CardBody>
                <Table className="table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Date</th>
                      <th>Item</th>
                      <th>Type</th>
                      <th>Qty</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.date}</td>
                        <td>{order.item}</td>
                        <td>{order.type}</td>
                        <td>{order.quantity}</td>
                        <td>{getStatusBadge(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Restaurante Selecionado */}
          <Col md="4">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <h3 className="mb-0">Selected Restaurant</h3>
              </CardHeader>
              <CardBody>
                <p><strong>Name:</strong> {restaurant.name}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Contact:</strong> {restaurant.contact}</p>
                <p><strong>Hours:</strong> {restaurant.openHours}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <Badge color={restaurant.status === "Open" ? "success" : "danger"}>
                    {restaurant.status}
                  </Badge>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FoodAndDrinks;
