import {FETCH_TASKS,CREATE_TASK,EDIT_TASK,DELETE_TASK} from "../actions/types";
import _ from 'lodash';

export default (state=[], action)=>{
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }

}
