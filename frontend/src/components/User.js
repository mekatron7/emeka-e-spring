import {Button} from "react-bootstrap";
import {logout} from "../modules/user";

function User(props){
    const user = props.user
    return <>
        <h1>{user.firstName}'s Account Info</h1>
        <hr/>
        <p>Username: {user.username}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Date Created: {user.dateCreated}</p>
        <p>Time Created: {user.dateCreated}</p>
        <Button onClick={() => props.dispatch(logout())}>Log Out</Button>
    </>
}

export default User