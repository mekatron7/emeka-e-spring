import {bindActionCreators} from "redux";
import {
    addEventBackend, editEventBackend,
    hideEventModal, updateEventDate,
    updateEventDescription,
    updateEventLocation,
    updateEventName, updateEventTime
} from "../modules/user";
import {connect} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";

function EventModal({show, event, userId, name, description, date, time, location, addEventBackend, editEventBackend, hideEventModal,
                        updateEventName, updateEventDescription, updateEventDate, updateEventTime, updateEventLocation}) {

    function handleSubmit(e) {
        e.preventDefault()
        console.log(name)
        console.log(description)
        console.log('The date is: ' + date)
        console.log('The time is: ' + time)
        console.log(location)
        if(event)
            editEventBackend({
                ...event,
                eventName: name,
                eventDescription: description,
                eventDate: date,
                eventTime: time,
                eventLocation: location,
                lastUpdated: new Date()
            })
        else
            addEventBackend({
                userId: userId,
                eventName: name,
                eventDescription: description,
                eventDate: date,
                eventTime: time,
                eventLocation: location,
                lastUpdated: new Date()
            })
    }

    return <Modal scrollable={true} show={show} onHide={hideEventModal}>
        <Modal.Header closeButton>
            <Modal.Title>{event ? 'Edit Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => updateEventName(e.target.value)} placeholder="Event name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventDescription">
                    <Form.Label>Event Description</Form.Label>
                    <Form.Control as='textarea' value={description} onChange={e => updateEventDescription(e.target.value)}
                                  placeholder="Add a description for your event" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={e => updateEventDate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventTime">
                    <Form.Label>Event Time</Form.Label>
                    <Form.Control type="time" value={time} onChange={e => updateEventTime(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventLocation">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control type="text" value={location} onChange={e => updateEventLocation(e.target.value)} placeholder="Event location" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideEventModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>
                    {event ? 'Save Changes' : 'Create Event'}
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
}

function mapStateToProps(state) {
    return {
        show: state.showNewEventModal,
        userId: state.currentUser.id,
        event: state.eventToEdit,
        events: state.events,
        name: state.eventName,
        description: state.eventDescription,
        date: state.eventDate,
        time: state.eventTime,
        location: state.eventLocation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addEventBackend, editEventBackend, hideEventModal, updateEventName, updateEventDescription, updateEventDate, updateEventTime, updateEventLocation}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)