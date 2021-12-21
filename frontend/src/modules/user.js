//Actions
import {login} from "../services/User";

const LOGIN_REQUEST = 'react-redux-calendar/users/LOGIN_REQUEST'
const LOGIN_FAILURE = 'react-redux-calendar/users/LOGIN_FAILURE'
const LOGIN_SUCCESS = 'react-redux-calendar/users/LOGIN_SUCCESS'
const LOGOUT = 'react-redux-calendar/users/LOGOUT'
const CREATE_USER = 'react-redux-calendar/users/CREATE_USER'
const SHOW_SIGN_UP_MODAL = 'react-redux-calendar/users/SHOW_SIGN_UP_MODAL'
const HIDE_SIGN_UP_MODAL = 'react-redux-calendar/users/HIDE_SIGN_UP_MODAL'
const ADD_EVENT = 'react-redux-calendar/event/ADD_EVENT'
const EDIT_EVENT = 'react-redux-calendar/event/EDIT_EVENT'
const DELETE_EVENT = 'react-redux-calendar/event/DELETE_EVENT'
const START_NEW_EVENT = 'react-redux-calendar/event/START_NEW_EVENT'
const START_EDIT_EVENT = 'react-redux-calendar/event/START_EDIT_EVENT'
const HIDE_EVENT_MODAL = 'react-redux-calendar/event/HIDE_EVENT_MODAL'
const UPDATE_EVENT_NAME = 'react-redux-calendar/event/UPDATE_EVENT_NAME'
const UPDATE_EVENT_DESCRIPTION = 'react-redux-calendar/event/UPDATE_EVENT_DESCRIPTION'
const UPDATE_EVENT_DATE = 'react-redux-calendar/event/UPDATE_EVENT_DATE'
const UPDATE_EVENT_TIME = 'react-redux-calendar/event/UPDATE_EVENT_TIME'
const UPDATE_EVENT_LOCATION = 'react-redux-calendar/event/UPDATE_EVENT_LOCATION'
const FILTER_EVENTS = 'react-redux-calendar/event/FILTER_EVENTS'
const FILTER_INVITES = 'react-redux-calendar/event/FILTER_INVITES'
const CLEAR_EVENTS_FILTER = 'react-redux-calendar/event/CLEAR_EVENTS_FILTER'
const CLEAR_INVITES_FILTER = 'react-redux-calendar/event/CLEAR_INVITES_FILTER'
const SHOW_INVITE_MODAL = 'react-redux-calendar/event/SHOW_INVITE_MODAL'
const HIDE_INVITE_MODAL = 'react-redux-calendar/event/HIDE_INVITE_MODAL'
const SEND_INVITE = 'react-redux-calendar/event/SEND_INVITE'
const CANCEL_INVITE = 'react-redux-calendar/event/CANCEL_INVITE'
const EDIT_INVITE = 'react-redux-calendar/event/EDIT_INVITE'
const SET_USERS = 'react-redux-calendar/event/SET_USERS'
const START_CHECK_USERNAME = 'react-redux-calendar/event/START_CHECK_USERNAME'
const GOT_USERNAME_STATUS = 'react-redux-calendar/event/GOT_USERNAME_STATUS'
const SET_EVENTS = 'react-redux-calendar/event/SET_EVENTS'
const START_DELETE_EVENT = 'react-redux-calendar/event/START_DELETE_EVENT'
const HIDE_DELETE_EVENT_MODAL = 'react-redux-calendar/event/HIDE_DELETE_EVENT_MODAL'

//Reducer
const initialState = {
    loginPending: false,
    currentUser: null,
    errorMessage: '',
    users: [],
    showSignUpModal: false,
    events: [],
    eventToEdit: null,
    showNewEventModal: false,
    invites: [],
    inviteToEdit: null,
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    filteredEvents: [],
    filteredInvites: [],
    eventToInviteTo: null,
    showInviteModal: false,
    eventsFilterMode: false,
    invitesFilterMode: false,
    checkingUsername: false,
    foundUsername: false,
    eventToDelete: null,
    showDeleteEventModal: false
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginPending: true,
                errorMessage: ''
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false,
                errorMessage: action.message
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                currentUser: action.currentUser,
                errorMessage: ''
            }

        case LOGOUT:
            return {
                ...initialState,
                users: state.users,
                events: state.events,
                invites: state.invites
            }

        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.newUser]
            }

        case SHOW_SIGN_UP_MODAL:
            return {
                ...state,
                showSignUpModal: true
            }

        case HIDE_SIGN_UP_MODAL:
            return {
                ...state,
                showSignUpModal: false
            }

        case START_NEW_EVENT:
            return {
                ...state,
                showNewEventModal: true,
                eventToEdit: null,
                eventName: '',
                eventDescription: '',
                eventDate: '',
                eventTime: '',
                eventLocation: ''
            }

        case START_EDIT_EVENT:
            return {
                ...state,
                showNewEventModal: true,
                eventToEdit: action.event,
                eventName: action.event.eventName,
                eventDescription: action.event.eventDescription,
                eventDate: action.event.eventDate,
                eventTime: action.event.eventTime,
                eventLocation: action.event.eventLocation
            }

        case EDIT_EVENT:
            return {
                ...state,
                showNewEventModal: false,
                events: state.events.map(event => event.id === action.event.id ? action.event : event)
            }

        case HIDE_EVENT_MODAL:
            return {
                ...state,
                showNewEventModal: false
            }

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.id)
            }

        case UPDATE_EVENT_NAME:
            return {
                ...state,
                eventName: action.name
            }

        case UPDATE_EVENT_DESCRIPTION:
            return {
                ...state,
                eventDescription: action.description
            }

        case UPDATE_EVENT_DATE:
            return {
                ...state,
                eventDate: action.date
            }

        case UPDATE_EVENT_TIME:
            return {
                ...state,
                eventTime: action.time
            }

        case UPDATE_EVENT_LOCATION:
            return {
                ...state,
                eventLocation: action.location
            }

        case FILTER_EVENTS:
            return {
                ...state,
                filteredEvents: [...state.events].filter(e => e.eventDate >= action.startDate && e.eventDate <= action.endDate),
                eventsFilterMode: true
            }

        case FILTER_INVITES:
            return {
                ...state,
                filteredInvites: [...state.events].filter(e => e.eventDate >= action.startDate && e.eventDate <= action.endDate),
                invitesFilterMode: true
            }

        case CLEAR_EVENTS_FILTER:
            return {
                ...state,
                filteredEvents: [],
                eventsFilterMode: false
            }

        case CLEAR_INVITES_FILTER:
            return {
                ...state,
                filteredInvites: [],
                invitesFilterMode: false
            }

        case SHOW_INVITE_MODAL:
            return {
                ...state,
                showInviteModal: true,
                eventToInviteTo: action.event
            }

        case HIDE_INVITE_MODAL:
            return {
                ...state,
                showInviteModal: false,
                eventToInviteTo: null
            }

        case SEND_INVITE:
            return {
                ...state,
                invites: [...state.invites, action.invite]
            }

        case CANCEL_INVITE:
            return {
                ...state,
                invites: state.invites.filter(i => i.eventId !== action.invite.eventId || i.inviteeId !== action.invite.userId)
            }

        case START_CHECK_USERNAME:
            return {
                ...state,
                checkingUsername: true,
                foundUsername: false
            }

        case GOT_USERNAME_STATUS:
            return {
                ...state,
                checkingUsername: false,
                foundUsername: action.found
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

        case SET_EVENTS:
            return {
                ...state,
                showNewEventModal: false,
                eventToEdit: null,
                events: action.events
            }

        case START_DELETE_EVENT:
            return {
                ...state,
                showDeleteEventModal: true,
                eventToDelete: action.event
            }

        case HIDE_DELETE_EVENT_MODAL:
            return {
                ...state,
                showDeleteEventModal: false,
                eventToDelete: null
            }

        default:
            return state
    }
}

//Action Creators
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginFailure(errorMessage) {
    alert(errorMessage)
    return {type: LOGIN_FAILURE, message: errorMessage}
}

export function loginSuccess(currentUser) {
    return {type: LOGIN_SUCCESS, currentUser}
}

export function logout(){
    return {type: LOGOUT}
}

export function createUser(newUser) {
    return {type: CREATE_USER, newUser: newUser}
}

export function showSignUpModal() {
    return {type: SHOW_SIGN_UP_MODAL}
}

export function hideSignUpModal() {
    return {type: HIDE_SIGN_UP_MODAL}
}

export function editEvent(event) {
    return {type: EDIT_EVENT, event}
}

export function deleteEvent(id) {
    return {type: DELETE_EVENT, id}
}

export function startNewEvent() {
    return {type: START_NEW_EVENT}
}

export function startEditEvent(event) {
    return {type: START_EDIT_EVENT, event}
}

export function hideEventModal() {
    return {type: HIDE_EVENT_MODAL}
}

export function updateEventName(name) {
    return {type: UPDATE_EVENT_NAME, name}
}

export function updateEventDescription(description) {
    return {type: UPDATE_EVENT_DESCRIPTION, description}
}

export function updateEventDate(date) {
    return {type: UPDATE_EVENT_DATE, date}
}

export function updateEventTime(time) {
    return {type: UPDATE_EVENT_TIME, time}
}

export function updateEventLocation(location) {
    return {type: UPDATE_EVENT_LOCATION, location}
}

export function filterEvents(startDate, endDate) {
    return {type: FILTER_EVENTS, startDate, endDate}
}

export function filterInvites(startDate, endDate) {
    return {type: FILTER_INVITES, startDate, endDate}
}

export function clearEventsFilter() {
    return {type: CLEAR_EVENTS_FILTER}
}

export function clearInvitesFilter() {
    return {type: CLEAR_INVITES_FILTER}
}

export function showInviteModal(event) {
    return {type: SHOW_INVITE_MODAL, event}
}

export function hideInviteModal() {
    return {type: HIDE_INVITE_MODAL}
}

export function sendInvite(invite) {
    return {type: SEND_INVITE, invite}
}

export function cancelInvite(invite) {
    return {type: CANCEL_INVITE, invite}
}

export function startCheckUsername() {
    return {type: START_CHECK_USERNAME}
}

export function gotUsernameStatus(found) {
    return {type: GOT_USERNAME_STATUS, found}
}

export function setUsers(users) {
    return {type: SET_USERS, users}
}

export function setEvents(events) {
    return {type: SET_EVENTS, events}
}

export function startDeleteEvent(event) {
    return {type: START_DELETE_EVENT, event}
}

export function hideDeleteEventModal() {
    return {type: HIDE_DELETE_EVENT_MODAL}
}

export function initiateLoginBackend(credentials) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            if (!response.ok)
                return dispatch(loginFailure('Some f**kery happened while trying to connect to the server.'))

            response.text().then(text => {
                if (text === 'success') dispatch(setCurrentUser(credentials.username))
                else dispatch(loginFailure(text))
            })
        }).catch(error => dispatch(loginFailure(error)))
    }
}

export function setCurrentUser(username) {
    return function sideEffect(dispatch) {
        fetch(`http://localhost:8080/user/getUser/${username}`, {
            method: "GET"
        }).then(response => {
            if (!response.ok)
                return dispatch(loginFailure('Unexpected error.'))

            response.json().then(currentUser => {
                dispatch(loginSuccess(currentUser))
                dispatch(getEvents())
            })
        }).catch(error => dispatch(loginFailure(error)))
    }
}

export function checkUsername(username) {
    return function sideEffect(dispatch) {
        dispatch(startCheckUsername())
        fetch(`http://localhost:8080/user/checkUsername?username=${username}`, {
            method: "GET"
        }).then(response => {
            if (!response.ok)
                return dispatch(loginFailure('Unexpected error.'))

            response.text().then(text => {
                dispatch(gotUsernameStatus(text))
            })
        }).catch(error => dispatch(loginFailure(error)))
    }
}

export function register(newUser) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (!response.ok)
                return alert('Create user failure')
            dispatch(hideSignUpModal())
        })
    }
}

export function getAllUsers() {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/user/getAll", {
            method: "GET"
        }).then(response => {
            if (!response.ok)
                return alert('Failed to get users.')
            response.json().then(users => {
                dispatch(setUsers(users))
            })
        }).catch(error => alert(error))
    }
}

export function addEventBackend(event) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/event/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        }).then(response => {
            if (!response.ok)
                return alert('Some f**kery happened while trying to connect to the server.')
            response.text().then(text => {
                if (text === 'success')
                    dispatch(getEvents())
            })
        }).catch(error => alert(error))
    }
}

export function getEvents() {
    return function sideEffect(dispatch, getState) {
        fetch(`http://localhost:8080/event/getEvents/${getState().currentUser.id}`, {
            method: "GET"
        }).then(response => {
            if (!response.ok)
                return alert('Some f**kery happened while trying to connect to the server.')
            response.json().then(events => {
                dispatch(setEvents(events))
            })
        }).catch(error => alert(error))
    }
}

export function editEventBackend(editedEvent) {
    return function sideEffect(dispatch) {
        fetch("http://localhost:8080/event/edit", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedEvent)
        }).then(response => {
            if(!response.ok)
                return alert('Nice try. The server is too powerful to be broken like that.')
            response.text().then(text => {
                if (text === 'success')
                    dispatch(getEvents())
            })
        }).catch(error => alert(error))
    }
}

export function deleteEventBackend(id) {
    return function sideEffect(dispatch) {
        fetch(`http://localhost:8080/event/delete/${id}`, {
            method: "DELETE"
        }).then(response => {
            if(!response.ok)
                return alert("Silly rabbit, tricks are for kids. You can't delete what doesn't exist.")
            response.text().then(text => {
                if (text === 'success') {
                    dispatch(getEvents())
                    dispatch(hideDeleteEventModal())
                }
            })
        }).catch(error => alert(error))
    }
}