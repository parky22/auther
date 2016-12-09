import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOGIN = 'SET_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const login = user => ({ type: LOGIN, user })

/* ------------       REDUCER     ------------------ */

export default function reducer (user = {}, action) {
  switch (action.type) {

    case LOGIN:
      return action.user

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
