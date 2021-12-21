import {useState} from "react";
import EventModal from "./EventModal";
import InviteModal from "./InviteModal";
import {Button, Col, Form, Row} from "react-bootstrap";
import Event from "./Event";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {clearInvitesFilter, filterInvites} from "../modules/user";

function Invites({invites, filteredInvites, invitesFilterMode, currentUser, filterInvites, clearInvitesFilter}){
    const user = currentUser
    console.log(invites)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    function filterByDateRange() {
        if(startDate !== '' && endDate !== ''){
            filterInvites(startDate, endDate)
        }
    }

    function clearFilterResults() {
        setStartDate('')
        setEndDate('')
        clearInvitesFilter()
    }

    return <>
        <h1>{user.firstName}'s Events</h1>
        <hr/>
        <EventModal/>
        <InviteModal/>
        <Row>
            <Col>
            </Col>
            <Col>
                <Form.Control type='date' id='startDate' value={startDate} onChange={e => setStartDate(e.target.value)}/>
            </Col>
            <Col>
                <Form.Control type='date' id='endDate' value={endDate} onChange={e => setEndDate(e.target.value)}/>
            </Col>
            <Col>
                <Button variant='outline-primary' onClick={filterByDateRange}>Filter Invites</Button>
                <Button style={{marginLeft: '15px'}} variant='outline-danger' onClick={clearFilterResults}>Clear Filter</Button>
            </Col>
        </Row>
        <hr/>
        {invitesFilterMode ? <Row>{filteredInvites.map((event, idx) => <Event key={idx} event={event} mode={'invite'}/>)}</Row>
            : <Row>{invites.map((event, idx) => <Event key={idx} event={event} mode={'invite'}/>)}</Row>}
    </>

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({filterInvites, clearInvitesFilter}, dispatch)
}

function mapStateToProps(state) {
    console.log(state.invites)
    console.log(state.events)
    return {
        invites: state.events.filter(e => state.invites.includes(e.id)),
        filteredInvites: state.filteredInvites.filter(e => state.invites.includes(i => i.eventId === e.id && i.inviteeId === state.currentUser.id)),
        invitesFilterMode: state.invitesFilterMode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invites)