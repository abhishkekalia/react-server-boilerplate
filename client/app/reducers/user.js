import {
  SAVE_USER, LOG_OUT,USER_LIST,EDIT_USER,NEW_USER,FILTER_DATA,ADMIN_DATA
} from '../actions/types.js';

const INITIAL_STATE = {
  user: {},
  userList:[],
  editUser:{},
  fdata:{},
  admindata:{}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER:
      return  Object.assign({}, state, {user: action.payload});
      case USER_LIST:
      return  Object.assign({}, state, {userList: action.payload});
      case  EDIT_USER:
      return  Object.assign({}, state, {editUser: action.payload});
      case NEW_USER:
      return  Object.assign({}, state, {newUSER: action.payload});
      case FILTER_DATA:
      return  Object.assign({}, state, {fdata: action.payload});
      case ADMIN_DATA:
      return  Object.assign({}, state, {admindata: action.payload});
      case LOG_OUT:
      return  INITIAL_STATE
    default:
      return state;
  }
}
