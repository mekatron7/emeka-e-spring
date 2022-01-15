import {Accordion, Button, Card, Col, DropdownButton, Dropdown, Row} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {sendInviteBackend, showInviteModalBackend, startDeleteEvent, startEditEvent} from "../modules/user";
import {connect} from "react-redux";
import {useEffect, useState} from "react";

function Event({event, mode, userId, startDeleteEvent, startEditEvent, showInviteModalBackend, sendInviteBackend}) {
    // let eventDate = new Date(event.eventDate)
    // eventDate.setDate(eventDate.getDate() + 1)
    // eventDate = eventDate.toLocaleDateString()
    const [variant, setVariant] = useState('secondary')
    const [statusBtnText, setStatusBtnText] = useState('Select Attending Status')
    useEffect(() => {
        if (mode === 'invite' && event.attendingStatus !== 'pending')
        selectGoingStatus(event.attendingStatus.charAt(0).toUpperCase() + event.attendingStatus.slice(1))
    }, [])

    function selectGoingStatus(status) {
        console.log(`Mode: ${mode}`)
        console.log(`Event Name: ${event.eventName} | Event Id: ${event.id}`)
        console.log(`User id: ${userId}`)
        console.log(`Status: ${status}`)

        switch (status) {
            case 'Going':
                setStatusBtnText(status)
                setVariant('success')
                break
            case 'Probably':
                setStatusBtnText(status)
                setVariant('primary')
                break
            case 'Maybe':
                setStatusBtnText(status)
                setVariant('info')
                break
            case 'Idk':
                setStatusBtnText(status)
                setVariant('warning')
                break
            case 'Nah':
                setStatusBtnText(status)
                setVariant('danger')
                break
            default:
                setStatusBtnText('Select Attending Status')
                setVariant('secondary')
        }
    }

    function sendInviteStatus(status) {
        sendInviteBackend({
            eventId: event.id,
            inviteeId: userId,
            attendingStatus: status.toLowerCase()
        })
        selectGoingStatus(status)
    }

    return <>
        <Col sm={4} className='mt-4'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{event.eventName}</Accordion.Header>
                    <Accordion.Body className="text-center">
                        <Card.Header as={"h3"}>{event.eventName}</Card.Header>
                        <Card.Body>
                            {mode === 'event' ?
                            <>
                                <Card.Title>{event.eventDate}</Card.Title>
                                <Card.Title>{event.eventTime}</Card.Title>
                                <Card.Text>{event.eventDescription}</Card.Text>
                                <Card.Text>Location: {event.eventLocation}</Card.Text>
                            </>
                                :
                                <>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h6>Host: {event.hostFullName} ({event.hostUsername})</h6>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <h6>Date: {event.eventDate}</h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h6 style={{fontSize: 14}}>{event.hostEmail}</h6>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <h6>Event Time: {event.eventTime} PM</h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h7># of people invited: {event.qtyInvited}</h7>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <h7># of people going: {event.qtyGoing}</h7>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Card.Text>{event.eventDescription}</Card.Text>
                                    <Card.Text>Location: {event.eventLocation}</Card.Text>
                                </>}
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
                                        <Dropdown.Item onClick={() => sendInviteStatus('Going')}>Going</Dropdown.Item>
                                        <Dropdown.Item onClick={() => sendInviteStatus('Probably')}>Probably</Dropdown.Item>
                                        <Dropdown.Item onClick={() => sendInviteStatus('Maybe')}>Maybe</Dropdown.Item>
                                        <Dropdown.Item onClick={() => sendInviteStatus('Idk')}>Idk</Dropdown.Item>
                                        <Dropdown.Item onClick={() => sendInviteStatus('Nah')}>Nah</Dropdown.Item>
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

function mapStateToProps(state) {
    return {userId: state.currentUser.id}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({startDeleteEvent, startEditEvent, showInviteModalBackend, sendInviteBackend}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Event)