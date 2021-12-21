import {Button, Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {cancelInvite, sendInvite} from "../modules/user";

function UserInvite({user, invites, eventId, sendInvite, cancelInvite}) {
    const invited = invites.find(i => i.eventId === eventId && i.inviteeId === user.id)
    function sendInviteToUser() {
        sendInvite({
            eventId,
            inviteeId: user.id,
            attendingStatus: 'pending'
        })
    }
    return <Row>
        <Col>
            {user.firstName} {user.lastName}
        </Col>
        {invited === undefined ?
            <Col>
                <Button variant='outline-info' onClick={sendInviteToUser}>Invite</Button>
            </Col>
            :
            <Col>
                <Button variant='outline-danger' onClick={() => cancelInvite({eventId, userId: user.id})}>Cancel Invite</Button>
            </Col>
        }
    </Row>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendInvite, cancelInvite}, dispatch)
}

export default connect(undefined, mapDispatchToProps)(UserInvite)