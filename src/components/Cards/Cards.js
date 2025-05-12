import moment from "moment";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const Cards = ({ cards }) => {
    return (
        <Row>
            {cards.map((card, index) => (
                <Col lg="6" xl="3" key={index}>
                    <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                            <Row>
                                <div className="col">
                                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                        {card.title}
                                    </CardTitle>
                                    <span className="h2 font-weight-bold mb-0">{card.value}</span>
                                </div>
                                <Col className="col-auto">
                                    <div className={`icon icon-shape bg-${card.color} text-white rounded-circle shadow`}>
                                        <i className={card.icon} />
                                    </div>
                                </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm">                               
                                <span className="text-nowrap" style={{
                                    fontSize: "13px"
                                }}>real-time values</span>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default Cards;
