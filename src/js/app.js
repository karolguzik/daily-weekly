import '../scss/main.scss';
import { DOMElements as DOM } from './base';
import { ui } from './view/ui';
import User from './model/User';
import Task from './model/Task';


const state = {};

const init = () => {
  state.user = new User();
  state.task = new Task();

  try {
    state.user.getAllUsers();
  } catch(err) {
    alert('Something is wrong');
  }
}

init();


const userLogin = (e) => {
  e.preventDefault();

  const { loginUsername, loginPassword } = ui.getLogin();
  
  if(loginUsername.trim() === '' || loginPassword.trim() === '') {
    ui.showMessage(DOM.loginUsernameInput, 'U have to fill username and password fields.', 'error');
    ui.clearLoginFields();
    return;
  }
  
  const existUser = state.user.usersList.filter(user => (loginUsername === user.username && loginPassword === user.password));
      
  if(existUser.length === 0) {
    ui.showMessage(DOM.loginUsernameInput, 'This account dosen\'t exist. Please register account first.', 'error');
  } else {
    state.user.loginUser(...existUser); 
    state.task.getUserTasks(state.user.loggedUser);
    state.task.getActiveTasks();
    state.task.getFinishedTasks();
    const precentage = state.task.calcProgressTasks();
    ui.renderUserAccountDetails(state.user.loggedUser);
    ui.renderDailyTasks(state.task.tasks);
    ui.renderActivityTasks(state.task.activeTasks, state.task.finishedTasks);
    ui.renderProgressPrecentage(precentage);
    ui.showMainPanel();
    ui.showMenu();
  }
  
  ui.clearLoginFields();
}

DOM.loginForm.addEventListener('submit', userLogin);





const userRegistration = (e) => {
  e.preventDefault();

  const { registrationUsername, registrationPassword } = ui.getRegistration();

 if(registrationUsername.trim() === '' || registrationPassword.trim() === '') {
    ui.showMessage(DOM.registrationUsernameInput, 'U have to fill username and password fields.', 'error');
    ui.clearRegistrationFields();
    return;
  }

  const existUser = state.user.usersList.filter(user => (registrationUsername === user.username && registrationPassword === user.password));

  if(existUser.length === 0){
    try{
      state.user.registrationUser(registrationUsername, registrationPassword);
      ui.showLoadingMessage();
      setTimeout(ui.hideLoadingMessage, 5000);
    } catch(error) {
      console.log(error);
    }
  } else {
    ui.showMessage(DOM.registrationUsernameInput, 'Account with that details is exist. Please provide different details.', 'error');
  }
  
  ui.clearRegistrationFields();
}

DOM.registrationForm.addEventListener('submit', userRegistration);




const addTask = (e) => {
  e.preventDefault();

  const { taskName, taskDescription } = ui.getTask();

  if(taskName === '' || taskDescription === '') {
    ui.showMessage(DOM.taskName, 'U have to fill name and description fields.', 'error');
    ui.clearTaskFields();
    return;
  }

  state.task.addTask(state.user.loggedUser, taskName, taskDescription, 'important');
  state.task.getActiveTasks();
  state.task.getFinishedTasks();
  const precentage = state.task.calcProgressTasks();
  ui.renderDailyTasks(state.task.tasks);
  ui.renderActivityTasks(state.task.activeTasks, state.task.finishedTasks);
  ui.renderProgressPrecentage(precentage);
  ui.renderSortStatusBtn(state.task.tasks);
  ui.showAddTaskMessage();
  ui.clearTaskFields();
}

DOM.btnAddTask.addEventListener('click', addTask);




const deleteTask = (e) => {
  const taskElement = e.target.parentNode.parentNode.parentNode.parentNode;
  let id = 0;

  if(e.target.classList.contains('delete-task-icon')) {
    
    ui.showDeleteTaskConfirm();
    
    DOM.deleteTaskConfirmContainer.addEventListener('click', (e) => {
      if(e.target.classList.contains('btn-delete-yes')){
        id = taskElement.getAttribute('id').split('-')[1]; 
        state.task.deleteTask(state.user.loggedUser, id);
        state.task.getActiveTasks();
        state.task.getFinishedTasks();
        const precentage = state.task.calcProgressTasks();
        ui.renderProgressPrecentage(precentage);
        ui.renderDailyTasks(state.task.tasks);
        ui.renderActivityTasks(state.task.activeTasks, state.task.finishedTasks);
        ui.renderSortStatusBtn(state.task.tasks);
        ui.hideDeleteTaskConfirm();
      } else if(e.target.classList.contains('btn-delete-no')){
        ui.hideDeleteTaskConfirm();
      } 
    })
  } else if(e.target.classList.contains('done-task-icon')) {
    id = taskElement.getAttribute('id').split('-')[1]; 
    state.task.finishTask(state.user.loggedUser, id);
    ui.showDoneTaskMessage();
    state.task.getActiveTasks();
    state.task.getFinishedTasks();
    const precentage = state.task.calcProgressTasks();
    ui.renderProgressPrecentage(precentage);
    ui.renderDailyTasks(state.task.tasks);
    ui.renderActivityTasks(state.task.activeTasks, state.task.finishedTasks);
  }
}

DOM.dailyTasksContainer.addEventListener('click', deleteTask);


const sortDailyTasks = () => {
  state.task.sortTasks();
  ui.renderDailyTasks(state.task.tasks);
}

DOM.sortByStatusBtn.addEventListener('click', sortDailyTasks);


const menuNavItems = document.querySelectorAll('.nav__item');

const renderPageInPanel = (e) => {
  e.preventDefault();
  const activeItem = e.target;
  const className = activeItem.getAttribute('class').split(' ')[1];

  ui.renderPageInPanel(className);
}

menuNavItems.forEach(item => item.addEventListener('click', renderPageInPanel));



DOM.menuHandle.addEventListener('click', ui.toggleMenu);
DOM.btnShowLoginModal.addEventListener('click', ui.showLoginModal);
DOM.btnLoginCancel.addEventListener('click', ui.closeLoginModal);
DOM.btnShowRegistrationModal.addEventListener('click', ui.showRegistrationModal);
DOM.btnRegistrationCancel.addEventListener('click', ui.closeRegistrationModal);

