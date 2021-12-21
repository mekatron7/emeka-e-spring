import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {showInviteModal, startDeleteEvent, startEditEvent} from "../modules/user";
import {connect} from "react-redux";

function Event({event, mode, startDeleteEvent, startEditEvent, showInviteModal}) {
    // let eventDate = new Date(event.eventDate)
    // eventDate.setDate(eventDate.getDate() + 1)
    // eventDate = eventDate.toLocaleDateString()

    return <>
        <Col sm={4} className='mt-4'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{event.eventName}</Accordion.Header>
                    <Accordion.Body className="text-center">
                        <Card.Header as={"h3"}>{event.eventName}</Card.Header>
                        <Card.Body>
                            <Card.Title>{event.eventDate}</Card.Title>
                            <Card.Title>{event.eventTime}</Card.Title>
                            <Card.Text>{event.eventDescription}</Card.Text>
                            <Card.Text>Location: {event.eventLocation}</Card.Text>
                            {mode === 'event' ?
                                <Row>
                                    <Col>
                                        <Button variant="primary" onClick={() => startEditEvent(event)}>Edit</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-info" onClick={() => showInviteModal(event)}>Invite</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={() => startDeleteEvent(event)}>Delete</Button>
                                    </Col>
                                </Row>
                                :
                                <p>Attending status dropdown for invites goes here</p>
                            }
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Last updated {event.lastUpdated}
                        </Card.Footer>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Col>
    </>
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({startDeleteEvent, startEditEvent, showInviteModal}, dispatch)
}

export default connect(undefined, matchDispatchToProps)(Event)