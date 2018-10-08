import {FETCH_TASKS, SEARCH_TASKS} from "../actions/types";
import _ from 'lodash';

export default (state="Loading...", action)=>{
  switch (action.type){
    case FETCH_TASKS:
      return "Loading tasks...";
    case SEARCH_TASKS:
      if(_.isEmpty(action.payload)){
        return "No tasks found!! Try a different query..";
      }
      return "Searching...";
    default:
      return state;
  }
}
