import {FETCH_TASKS,CREATE_TASK,EDIT_TASK,DELETE_TASK} from "../actions/types";

export default (state=[], action)=>{
  switch (action.type) {
    case FETCH_TASKS:
      console.log("payload in reducer:");
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }

}
