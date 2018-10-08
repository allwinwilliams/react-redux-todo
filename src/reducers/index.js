import {combineReducers} from 'redux';

import TasksReducer from './tasks_reducer';
import ActiveTaskReducer from './active_task_reducer';
import MessageReducer from './message_reducer';

import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  tasks: TasksReducer,
  activeTaskKey: ActiveTaskReducer,
  form: FormReducer,
  message: MessageReducer
});

export default rootReducer;
