import {Button, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {cancelInviteBackend, sendInviteBackend} from "../modules/user";

function UserInvite({user, invites, eventId, sendInviteBackend, cancelInviteBackend}) {
    const invited = invites.some(i => i.eventId === eventId && i.inviteeId === user.id)
    function sendInviteToUser() {
        sendInviteBackend({
            eventId,
            inviteeId: user.id,
            attendingStatus: 'pending'
        })
    }
    return <Row>
        <Col>
            {user.firstName} {user.lastName}
        </Col>
        {!invited ?
            <Col>
                <Button variant='outline-info' onClick={sendInviteToUser}>Invite</Button>
            </Col>
            :
            <Col>
                <Button variant='outline-danger' onClick={() => cancelInviteBackend(eventId, user.id)}>Cancel Invite</Button>
            </Col>
        }
    </Row>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendInviteBackend, cancelInviteBackend}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(UserInvite)