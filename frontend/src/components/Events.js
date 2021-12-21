import {Button, Col, Form, Row} from "react-bootstrap";
import Event from "./Event";
import EventModal from "./EventModal";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {clearEventsFilter, filterEvents, startNewEvent} from "../modules/user";
import {useState} from "react";
import InviteModal from "./InviteModal";
import DeleteEventModal from "./DeleteEventModal";

function Events({events, filteredEvents, eventsFilterMode, currentUser, startNewEvent, filterEvents, clearEventsFilter}){
    const user = currentUser
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    function filterByDateRange() {
        if(startDate !== '' && endDate !== ''){
            console.log(`Events before filter: ${events}`)
            filterEvents(startDate, endDate)
            console.log(`Events after filter: ${events}`)
        }
    }

    function clearFilterResults() {
        setStartDate('')
        setEndDate('')
        clearEventsFilter()
    }

    return <>
        <h1>{user.firstName}'s Events</h1>
        <hr/>
        <EventModal/>
        <InviteModal/>
        <DeleteEventModal/>
        <Row>
            <Col>
                <Button variant='outline-primary' onClick={startNewEvent}>New Event</Button>
            </Col>
            <Col>
                <Form.Control type='date' id='startDate' value={startDate} onChange={e => setStartDate(e.target.value)}/>
            </Col>
            <Col>
                <Form.Control type='date' id='endDate' value={endDate} onChange={e => setEndDate(e.target.value)}/>
            </Col>
            <Col>
                <Button variant='outline-primary' onClick={filterByDateRange}>Filter Events</Button>
                <Button style={{marginLeft: '15px'}} variant='outline-danger' onClick={clearFilterResults}>Clear Filter</Button>
            </Col>
        </Row>
        <hr/>
        {eventsFilterMode ? <Row>{filteredEvents.map((event, idx) => <Event key={idx} event={event} mode={'event'}/>)}</Row>
        : <Row>{events.map((event, idx) => <Event key={idx} event={event} mode={'event'}/>)}</Row>}
    </>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({startNewEvent, filterEvents, clearEventsFilter}, dispatch)
}

function mapStateToProps(state) {
    return {
        events: state.events.filter(e => e.userId === state.currentUser.id),
        filteredEvents: state.filteredEvents.filter(e => e.userId === state.currentUser.id),
        eventsFilterMode: state.eventsFilterMode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)