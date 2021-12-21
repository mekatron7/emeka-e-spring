import {Col, Container, Row} from "react-bootstrap";
import Home from "./components/Home";
import Login from "./components/Login";
import {connect} from "react-redux";

function App({dispatch, userReducer}) {
  return (
    <Container fluid>
        <Row>
            {userReducer.currentUser !== null ? <Col><Home currentUser={userReducer.currentUser} dispatch={dispatch}/></Col>
                : <Col xs={6}><Login dispatch={dispatch} userReducer={userReducer}/></Col>}
        </Row>
    </Container>
  );
}

function mapStateToProps(state){
    return {
        userReducer: state
    }
}

export default connect(mapStateToProps)(App);
