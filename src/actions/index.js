import {initializeApp} from 'firebase';
import _ from 'lodash';

import {FETCH_TASKS, FETCH_TASK, CREATE_TASK, EDIT_TASK, DELETE_TASK} from './types';

const Tasks = initializeApp({
    databaseURL: 'https://todo-8e9bc.firebaseio.com/',
    projectId: 'todo-8e9bc'
  });

export function fetchTasks(){
  return (dispatch) =>{
    Tasks.database().ref().on('value', (snapshot)=>{
      let payload=[];
      snapshot.forEach((snapChild)=>{
        payload.push({...snapChild.val(), key: snapChild.key});
      })
      dispatch({
          type: FETCH_TASKS,
          payload: _.sortBy(payload, ['dueDate'])
      })
    });
  }
}

export function fetchTask(key){
  return {
    type: FETCH_TASK,
    payload: key
  }
}

export function createTask(task){
  var key=Tasks.database().ref().push()
  return (dispatch)=> {
    var key=Tasks.database().ref().push(task).getKey();
    dispatch({
      type: CREATE_TASK,
      payload: key
    })
  }
}

export function editTask(key, task){
  return (dispatch) => Tasks.database().ref(`/${key}`).update(task);
}

export function deleteTask(key){
  return (dispatch) => Tasks.database().ref(`/${key}`).remove();
}
