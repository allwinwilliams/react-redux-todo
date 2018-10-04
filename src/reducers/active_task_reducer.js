import {EDIT_TASK, FETCH_TASK} from "../actions/types";

export default (state=[], action)=>{
  switch (action.type) {
    case EDIT_TASK:
      return action.payload;
    case FETCH_TASK:
      console.log("active task");
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
  return state;
}
