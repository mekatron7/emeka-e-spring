import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {checkUsername, hideSignUpModal, register} from "../modules/user";

function NewUser({dispatch, userReducer}){
    const[validUser, setValidUser] = useState(false)
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[fName, setFName] = useState('')
    const[lName, setLName] = useState('')
    const[email, setEmail] = useState('')
    const[availability, setAvailability] = useState('Username must be at least 3 characters.')

    useEffect(() => {
        validateUsername()
    }, [username]);

    function validateUsername(){
        if(username.length < 3) {
            setAvailability('Username must be at least 3 characters.')
            setValidUser(false)
        }
        else {
            //Display spinner by the availability element
            dispatch(checkUsername(username))
            if (userReducer.foundUsername === 'true') {
                setAvailability('Sorry this username is already taken.')
                setValidUser(false)
            }
            else {
                setAvailability('This username is available!')
                setValidUser(true)
            }
        }
    }

    function validateNewUser(event){
        event.preventDefault()

        let valid = true
        if(fName === '') {
            alert('Please enter a first name.')
            valid = false
        }
        if(lName === '') {
            alert('Please enter a last name.')
            valid = false
        }
        if(!validUser){
            alert('Please enter a valid username.')
            valid = false
        }
        if(password === '') {
            alert('Please enter a password.')
            valid = false
        }
        else if(password !== confirmPassword) {
            alert('Both password fields need to match. Please try again.')
            valid = false
        }
        if(email === '') {
            alert('Please enter an email address.')
            valid = false
        }
        if(valid){
            setValidUser(false)
            dispatch(register({
                dateCreated: new Date(),
                username: username,
                password: password,
                firstName: fName,
                lastName: lName,
                email: email
            }))
        }
    }
    return <>
        <Modal show={userReducer.showSignUpModal} onHide={() => dispatch(hideSignUpModal())}>
            <Modal.Header closeButton>
                <Modal.Title>Sign up for React Calendar</Modal.Title>
            </Modal.Header>
            <Form onSubmit={validateNewUser}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First name" onChange={e => setFName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={e => setLName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="username" type="text" placeholder="Enter username" onChange={e => {
                            setUsername(e.target.value)
                        }}/>
                        <Form.Text className="text-muted">{availability}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(hideSignUpModal())}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
}

export default NewUser