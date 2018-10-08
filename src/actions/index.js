import {initializeApp} from 'firebase';
import _ from 'lodash';

import {FETCH_TASKS, FETCH_TASK, CREATE_TASK, SEARCH_TASKS} from './types';
import{TASK_STATES} from './states';

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

export function searchTasks(q){
  return (dispatch, getState)=>{
    let state=getState();
    let payload=[];
    if(q!==""){
      payload=_.filter(state.tasks,(task)=>{
        if(task.title.indexOf(q)!==-1)
          return task
        if(task.description&&task.description.indexOf(q)!==-1)
          return task
        if(task.member&&task.member.indexOf(q)!==-1)
          return task
        if(TASK_STATES[_.toInteger(task.state)] && TASK_STATES[_.toInteger(task.state)].name.indexOf(q)!==-1)
          return task
        if(_.join(task.tags, ' ').indexOf(q)!==-1)
          return task

        });
    }else{
      payload=state.tasks;
    }
    console.log("search result");
    console.log(payload);
    dispatch({
      type: SEARCH_TASKS,
      payload: payload
    })
  }
}
