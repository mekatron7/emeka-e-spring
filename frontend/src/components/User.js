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
            <p>Date Created: {new Date(user.dateCreated).toLocaleDateString()}</p>
            <p>Time Created: {new Date(user.dateCreated).toLocaleTimeString()}</p>
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
                    <th></th>
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
                        <td>{new Date(u.dateCreated).toLocaleDateString()}</td>
                        <td>{u.admin.toString()}</td>
                        <td className='text-center'><Button variant='outline-info'>Edit</Button></td>
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