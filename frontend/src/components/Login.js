import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import NewUser from "./NewUser";
import {initiateLoginBackend, showSignUpModal} from "../modules/user";

function Login({dispatch, userReducer}){
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event){
        event.preventDefault()
        dispatch(initiateLoginBackend({username, password}))
    }

    return <>
        <NewUser dispatch={dispatch} userReducer={userReducer}/>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
            <Button variant="secondary" type="button" onClick={() => dispatch(showSignUpModal())}>
                Sign Up
            </Button>
        </Form>
    </>
}

export default Login