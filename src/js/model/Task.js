import { http } from '../http';
import { URL } from '../base';
import { DOMElements as DOM } from '../base';

class Task {
  constructor(){
    this.tasks = [];
    this.activeTasks = [];
    this.finishedTasks = [];
    this.addedTask = 0;
  }

  getUserTasks(user) {
    this.tasks = user.tasks;
  }

  getActiveTasks() {
    if(this.tasks.length > 0) {
      this.activeTasks =this.tasks.filter(task => task.status === 'active');
    }
  }

  getFinishedTasks() {
    if(this.tasks.length > 0) {
      this.finishedTasks = this.tasks.filter(task => task.status === 'finished');
    }
  }

  addTask(user, name, description, priority){
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); 
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    const newTask = {
      id: this.tasks.length + 1,
      name: name,
      description: description,  
      createdDate: dateTime,
      finishedDate: null,
      priority: priority,
      status: 'active'
    }

    this.tasks.push(newTask);
    user.tasks = this.tasks;
    
    http.put(`${URL}/${user.id}`, user)
    .then(user => {
      console.log('Well done! You added new task!');
      this.addedTask++;
    })
    .catch(err => console.log(error));  
  }

  deleteTask(user,id){
    const newTasks = this.tasks.filter(task => task.id != id);
    this.tasks = newTasks;
    user.tasks = this.tasks;

    http.put(`${URL}/${user.id}`, user)
    .then(user => {
      console.log('Well done! You delete task!');
    })
    .catch(err => console.log(error));  
  }

  finishTask(user, id) {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); 
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    this.tasks.forEach(task => {
      if(task.id == id) {
        task.status = 'finished';
        task.finishedDate = dateTime;
      }
    })

    user.tasks = this.tasks;

    http.put(`${URL}/${user.id}`, user)
    .then(user => {
      console.log('Well done! Your task is done!');
    })
    .catch(err => console.log(error));
  }

  sortTasks() {
    const sortedTasks = [];

    if(DOM.sortByStatusBtn.classList.contains('sort-active')) {
      this.tasks.forEach(task => {
        if(task.status === 'active') {
          sortedTasks.push(task);
        } else {
          sortedTasks.unshift(task);
        }
      })
  
      document.querySelector('.sort-by-status').textContent = 'Sort by active';
      document.querySelector('.sort-by-status').classList.remove('sort-active');
      document.querySelector('.sort-by-status').classList.add('sort-done');
    } else {
      this.tasks.forEach(task => {
        if(task.status === 'active') {
          sortedTasks.unshift(task);
        } else {
          sortedTasks.push(task);
        }
      })
  
      document.querySelector('.sort-by-status').textContent = 'Sort by done';
      document.querySelector('.sort-by-status').classList.remove('sort-done');
      document.querySelector('.sort-by-status').classList.add('sort-active');
    }

    this.tasks = sortedTasks;
  }

  calcProgressTasks() {
    let progressPrecentage = 0;

    if(this.tasks.length > 0) {
     progressPrecentage = Math.round((this.finishedTasks.length / this.tasks.length ) * 100);
    }

    return progressPrecentage;
  }
}


export default Task;