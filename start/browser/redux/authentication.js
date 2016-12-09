import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOGIN = 'SET_CURRENT_USER'
const SIGNUP = 'SIGN_UP_USER'
const LOGOUT = 'LOG_OUT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const login = user => ({ type: LOGIN, user })
const signUp = user => ({ type: SIGNUP, user})
const logout = user => ({ type: LOGOUT, user})

/* ------------       REDUCER     ------------------ */

export default function reducer (user = {}, action) {
  switch (action.type) {

    case LOGIN:
      return action.user
    case SIGNUP:
      return action.user
    case LOGOUT:
      return user;
    default:
      return user;

  }
}

/* ------------       DISPATCHERS     ------------------ */

export const loginUser = user => dispatch => {
    axios.post(`/login`, user)
      .then(res => dispatch(login(res.data)))
      .catch(err => console.error(`Logging in user: ${user} unsuccesful`, err))
}

export const signUpUser = user => dispatch => {
    axios.post(`/signUp`, user)
      .then(res => dispatch(signUp(res.data)))
      .catch(err => console.error(`Signing up user: ${user} unsuccesful`, err))
}

export const logoutUser = () => dispatch => {
  axios.get(`/logout`)
      .then(dispatch(logout()))
      .catch(err => console.error(`Logging out unsuccesful`, err))
}
