import {FETCH_TASKS, SEARCH_TASKS} from "../actions/types";

export default (state=[], action)=>{
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    case SEARCH_TASKS:
      return action.payload;
    default:
      return state;
  }

}
