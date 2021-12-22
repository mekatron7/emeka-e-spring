import {Accordion, Button, Card, Col, DropdownButton, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {showInviteModalBackend, startDeleteEvent, startEditEvent} from "../modules/user";
import {connect} from "react-redux";
import {useState} from "react";

function Event({event, mode, startDeleteEvent, startEditEvent, showInviteModalBackend}) {
    // let eventDate = new Date(event.eventDate)
    // eventDate.setDate(eventDate.getDate() + 1)
    // eventDate = eventDate.toLocaleDateString()
    const [variant, setVariant] = useState('secondary')
    const [statusBtnText, setStatusBtnText] = useState('Select Attending Status')

    function selectGoingStatus(status) {
        switch (status) {
            case 'going':
                setStatusBtnText('Going')
                setVariant('success')
                break
            case 'probably':
                setStatusBtnText('Probably')
                setVariant('primary')
                break
            case 'maybe':
                setStatusBtnText('Maybe')
                setVariant('info')
                break
            case 'idk':
                setStatusBtnText('I')
                setVariant('warning')
                break
            case 'nah':
                setStatusBtnText('Nah')
                setVariant('danger')
        }
    }

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
                                        <Button variant="outline-info" onClick={() => showInviteModalBackend(event)}>Invite</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={() => startDeleteEvent(event)}>Delete</Button>
                                    </Col>
                                </Row>
                                :
                                <Row className='text-center'>
                                    <DropdownButton variant={variant} id="dropdown-basic-button" title={statusBtnText}>
                                        <Dropdown.Item onClick={() => selectGoingStatus('going')}>Going</Dropdown.Item>
                                        <Dropdown.Item onClick={() => selectGoingStatus('probably')}>Probably</Dropdown.Item>
                                        <Dropdown.Item onClick={() => selectGoingStatus('maybe')}>Maybe</Dropdown.Item>
                                        <Dropdown.Item onClick={() => selectGoingStatus('idk')}>I Might</Dropdown.Item>
                                        <Dropdown.Item onClick={() => selectGoingStatus('nah')}>Nah</Dropdown.Item>
                                    </DropdownButton>
                                </Row>
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
    return bindActionCreators({startDeleteEvent, startEditEvent, showInviteModalBackend}, dispatch)
}

export default connect(undefined, matchDispatchToProps)(Event)