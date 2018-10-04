import Firebase from 'firebase';
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

export function fetchTasks(){
  return {
    type: FETCH_TASKS,
    payload: INIT_TASKS
  }
}
export function fetchTask(id){
  console.log("action, fetchtask");
  console.log(id);
  return {
    type: FETCH_TASK,
    payload: _.find(INIT_TASKS, (x)=>x.id==id)
  }
}
export function createTask(task){
  return{
    type: CREATE_TASK,
    payload: task
  }
}

export function editTask(key, task){
  return{
    type: EDIT_TASK,
    payload: [key, task]
  }
}

export function deleteTask(id){
  console.log("delete");
  console.log(id);
  return{
    type: DELETE_TASK,
    payload: id
  }
}
