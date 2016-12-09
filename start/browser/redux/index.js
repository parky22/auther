import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import login from './login';

export default combineReducers({ users, stories, login });
