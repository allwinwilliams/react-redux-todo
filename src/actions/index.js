import {initializeApp} from 'firebase';
import _ from 'lodash';

import {FETCH_TASKS, FETCH_TASK, CREATE_TASK, EDIT_TASK, DELETE_TASK} from './types';


const INIT_TASKS=[
  {
    "id": 1,
    "title": "designing",
    "state": 0,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "26 AUG 2017"
  },
  {
    "id": 2,
    "title": "testing",
    "state": 1,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "18 AUG 2017"
  },
  {
    "id": 3,
    "title": "marketing",
    "state": 0,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "22 AUG 2017"
  },
  {
    "id": 4,
    "title": "check progress",
    "state": 2,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "22 AUG 2017"
  },
  {
    "id": 5,
    "title": "allot resources",
    "state": 1,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "26 AUG 2017"
  },
  {
    "id": 6,
    "title": "check resources allocation",
    "state": 0,
    "description": "salkdl alskd lasdkn. saldk laskdn",
    "dueDate": "26 AUG 2017"
  }
];

const Tasks = initializeApp({
    databaseURL: 'https://todo-8e9bc.firebaseio.com/',
    projectId: 'todo-8e9bc'
  });


export function fetchTasks(){
  return (dispatch) =>{
    Tasks.database().ref().on('value', (snapshot)=>{
      console.log("FIREBASE SNAPSHOT");
      let payload=[];
      snapshot.forEach((snapChild)=>{
        payload.push({...snapChild.val(), key: snapChild.key});
      })
      dispatch({
          type: FETCH_TASKS,
          payload: payload
      })
    });
  }
}

export function fetchTask(key){
  console.log("action, fetchtask");
  console.log(key);
  return {
    type: FETCH_TASK,
    payload: key
  }
}
export function createTask(task){
  console.log("createTask");
  console.log(task);
  return (dispatch)=> Tasks.database().ref().push(task);
  return{
    type: CREATE_TASK,
    payload: task
  }
}

export function editTask(key, task){
  return{
    type: EDIT_TASK,
    payload: {id: key, task: task}
  }
}

export function deleteTask(key){
  console.log("delete");
  console.log(key);
  return (dispatch) => Tasks.database().ref(`/${key}`).remove();
}
