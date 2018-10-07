import { FETCH_TASK, CREATE_TASK} from "../actions/types";
import _ from 'lodash';

export default (state={}, action)=>{
  switch (action.type) {
    case FETCH_TASK:
      if(_.isUndefined(action.payload))
        return "0";
      return action.payload;
    case CREATE_TASK:
      return action.payload;
    default:
      return state;
  }
}
