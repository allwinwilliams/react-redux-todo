import {FETCH_TASKS,CREATE_TASK,EDIT_TASK,DELETE_TASK} from "../actions/types";
import _ from 'lodash';

export default (state=[], action)=>{
  switch (action.type) {
    case FETCH_TASKS:
      console.log("tasks");
      console.log(action.payload);
      return action.payload;
    case DELETE_TASK:
      console.log("to be deleted");
      console.log(action.payload);
      var new_state=_.remove(state, (o)=>o.id!==action.payload);
      console.log(new_state);
      return new_state;
    case CREATE_TASK:
      console.log("CREATETASK");
      console.log(action.payload);
      return _.concat(state,{id:_.uniqueId(), title: action.payload.title,description: action.payload.description,dueDate: action.payload.dueDate,state: _.toInteger(action.payload.state), member: action.payload.member});
      return state
    default:
      return state;
  }

}
