import {Button, Col, Table} from "react-bootstrap";
import {logout} from "../modules/user";
import {connect} from "react-redux";

function User({dispatch, user, users}){
    console.log(users)
    return <>
        <h1>{user.firstName}'s Account Info</h1>
        <hr/>
        <Col>
            <p>Username: {user.username}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Date Created: {user.dateCreated}</p>
            <p>Time Created: {user.dateCreated}</p>
            <Button onClick={() => dispatch(logout())}>Log Out</Button>
        </Col>
        {user.admin &&
        <Col>
            <br/>
            <hr/>
            <h1>Admin Section</h1>
            <hr/>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th>Admin</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u =>
                    <tr>
                        <td>{u.id}</td>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.username}</td>
                        <td>{u.password}</td>
                        <td>{u.email}</td>
                        <td>{u.dateCreated}</td>
                        <td>{u.admin.toString()}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Col>}
    </>
}

function mapStateToProps(state) {
    return {users: state.users}
}

export default connect(mapStateToProps)(User)