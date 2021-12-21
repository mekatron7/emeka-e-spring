import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {deleteEventBackend, hideDeleteEventModal} from "../modules/user";
import {connect} from "react-redux";

function DeleteEventModal({eventName, eventId, show, deleteEventBackend, hideDeleteEventModal}) {
    return <Modal show={show} onHide={hideDeleteEventModal}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete the event {eventName}?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={hideDeleteEventModal}>Nope not yet</Button>
            <Button variant="danger" onClick={() => deleteEventBackend(eventId)}>Send event to the Shadow Realm</Button>
        </Modal.Footer>
    </Modal>
}

function mapStateToProps(state) {
    return {
        eventName: state.eventToDelete?.eventName,
        eventId: state.eventToDelete?.id,
        show: state.showDeleteEventModal
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteEventBackend, hideDeleteEventModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventModal)