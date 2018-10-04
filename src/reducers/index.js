import {combineReducers} from 'redux';

import TasksReducer from './tasks_reducer';
import ActiveTaskReducer from './active_task_reducer';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  activeTask: ActiveTaskReducer
});

export default rootReducer;
