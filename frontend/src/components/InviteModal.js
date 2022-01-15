import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {hideInviteModal} from "../modules/user";
import UserInvite from "./UserInvite";

function InviteModal({show, users, invitesList, eventToInviteTo, hideInviteModal}) {
    return <Modal scrollable={true} show={show} onHide={hideInviteModal}>
        <Modal.Header closeButton>
            <Modal.Title>Invite People to {show ? eventToInviteTo.eventName : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{users.map(u => <UserInvite user={u} eventId={show ? eventToInviteTo.id : 0} invites={invitesList}/>)}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={hideInviteModal}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
}

function mapStateToProps(state) {
    return {
        show: state.showInviteModal,
        users: state.users.filter(u => u.id !== state.currentUser.id),
        eventToInviteTo: state.eventToInviteTo,
        invitesList: state.allInvites
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({hideInviteModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteModal)