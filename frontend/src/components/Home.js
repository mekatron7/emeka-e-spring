import {Tab, Tabs} from "react-bootstrap";
import User from "./User";
import Events from "./Events";
import Invites from "./Invites";

function Home(props){

    return <>
        <h1>Hey there {props.currentUser.firstName}, welcome to the React Calendar.</h1>
        <hr/>
        <Tabs justify transition={true} defaultActiveKey="userInfo" id="home-tabs" className="mb-3">
            <Tab eventKey="userInfo" title="User Info">
                <User user={props.currentUser} dispatch={props.dispatch}/>
            </Tab>
            <Tab eventKey="events" title="Events">
                <Events currentUser={props.currentUser}/>
            </Tab>
            <Tab eventKey="invites" title="Invites">
                <Invites currentUser={props.currentUser} invites={props.invites} setInvites={props.setInvites}/>
            </Tab>
        </Tabs>
    </>
}

export default Home