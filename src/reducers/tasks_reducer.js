import {FETCH_TASKS,CREATE_TASK,EDIT_TASK,DELETE_TASK} from "../actions/types";
import _ from 'lodash';

export default (state=[], action)=>{
  switch (action.type) {
    case FETCH_TASKS:
      console.log("FETCH_TASK Reducer");
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }

}
