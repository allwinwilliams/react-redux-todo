import {EDIT_TASK, FETCH_TASK} from "../actions/types";
import _ from 'lodash';

export default (state={}, action)=>{
  switch (action.type) {
    case FETCH_TASK:
      console.log("active task");
      console.log(action.payload);
      if(!action.payload) return {};
      return action.payload;
    default:
      return state;
  }
  return state;
}
