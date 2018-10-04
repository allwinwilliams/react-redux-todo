import {EDIT_TASK} from "../actions/types";

export default (state=[], action)=>{
  switch (action.type) {
    case EDIT_TASK:
      return action.payload;
  }
  return state;
}
