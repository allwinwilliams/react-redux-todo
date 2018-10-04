import {combineReducers} from 'redux';

import TasksReducer from './tasks_reducer';
import ActiveTaskReducer from './active_task_reducer';

import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  activeTask: ActiveTaskReducer,
  form: FormReducer
});

export default rootReducer;
