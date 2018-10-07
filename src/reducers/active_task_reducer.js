import {EDIT_TASK, FETCH_TASK} from "../actions/types";
import _ from 'lodash';

export default (state={}, action)=>{
  switch (action.type) {
    case FETCH_TASK:
      console.log("ACTIVE task KEY");
      console.log(action.payload);
      if(_.isUndefined(action.payload)) return null;
      return action.payload;
    default:
      return state;
  }
  return state;
}
