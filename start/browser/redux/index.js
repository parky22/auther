import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import authentication from './authentication';

export default combineReducers({ users, stories, authentication });
