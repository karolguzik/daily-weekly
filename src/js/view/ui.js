import { DOMElements as DOM } from '../base';

class UI {
  getLogin() {
    return {
      loginUsername: DOM.loginUsernameInput.value,
      loginPassword: DOM.loginPasswordInput.value
    }
  }

  clearLoginFields() {
    DOM.loginUsernameInput.value = '';
    DOM.loginPasswordInput.value = '';
  }

  getRegistration() {
    return {
      registrationUsername: DOM.registrationUsernameInput.value,
      registrationPassword: DOM.registrationPasswordInput.value
    }
  }

  clearRegistrationFields() {
    DOM.registrationUsernameInput.value = '';
    DOM.registrationPasswordInput.value = '';
  }

  getTask() {
    return {
      taskName: DOM.taskName.value,
      taskDescription: DOM.taskDescription.value
    }
  }

  clearTaskFields() {
    DOM.taskName.value = '';
    DOM.taskDescription.value = '';
  }

  showMessage(location, text, type) {
    const el = document.createElement('span');
    el.textContent = text;
    el.classList.add(type);
    const parent = location.parentNode;
    parent.insertBefore(el, location);

    setTimeout(() => {
      el.remove();
    },2000);
  }

  showLoadingMessage() {
    DOM.loadingSpinnerContainer.style.display = 'flex';
    
    setTimeout(() => {
      DOM.loadingSpinnerTextBefore.style.display = 'none';
      DOM.loadingSpinnerTextAfter.style.display = 'block';
      DOM.loadingSpinner.style.display = 'none';
    }, 3000);
  }

  hideLoadingMessage() {
    DOM.loadingSpinnerContainer.style.display = 'none';
    DOM.loadingSpinnerTextBefore.style.display = 'block';
    DOM.loadingSpinnerTextAfter.style.display = 'none';
    DOM.loadingSpinner.style.display = 'block';
  }

  showAddTaskMessage() {
    DOM.addTaskMessage.style.display = 'block';

    setTimeout(() => {
      DOM.addTaskMessage.style.display = 'none';
    }, 2000);
  }

  showDoneTaskMessage() {
    DOM.doneTaskMessage.style.display = 'block';

    setTimeout(() => {
      DOM.doneTaskMessage.style.display = 'none';
    }, 2000);
  }

  showDeleteTaskConfirm() {
    DOM.deleteTaskConfirmContainer.style.display = 'block';
  }

  hideDeleteTaskConfirm() {
    DOM.deleteTaskConfirmContainer.style.display = 'none';
  }

  renderUserAccountDetails(user){
    DOM.userName.textContent = user.username;
    DOM.startUserName.textContent = user.username;
  }

  renderDailyTasks(tasks) {
    let taskHTML = '';

    if(tasks.length > 0) {
      tasks.forEach(task => {
        taskHTML += `
          <div class="daily__task" id="task-${task.id}">
            <a href="#task-${task.id}" class="task__title heading heading--tertiary">
              ${task.name}
              ${task.status === 'finished' ? '<span class="finished-tag">Done!</span>' : ''}
            </a>
            <div class="task__content">
              <p class="task__description lead">
                ${task.description}
              </p>
              <div class="task__manage">
                
                  ${task.status === 'active' ? 
                  '<div class="task__manage--done"><i class="fa fa-check-square done-task-icon" aria-hidden="true"></i></div>' : ''}
                  <div class="task__manage--delete">
                  <i class="fa fa-trash delete-task-icon" aria-hidden="true"></i>
                  </div>
                
                <div class="task__manage--created-date">Created: ${task.createdDate}</div>
                ${task.finishedDate !== null ? '<div class="task__manage--finished-date">Finished: ' + task.finishedDate + '</div>' : ''}
              </div>
            </div>
          </div>
        `
      })

      DOM.dailyTasksContainer.innerHTML = taskHTML;
    }
  }

  renderActivityTasks(activeTasks, finishedTasks) {
    let activeHTML = '';
    let finishedHTML = '';
    
    activeTasks.forEach(task => {
      activeHTML += `
          <li class="active__task">${task.name}</li>
        `;
    });

    finishedTasks.forEach(task => {
      finishedHTML += `
          <li class="finished__task">${task.name}</li>
        `;
    });

    DOM.activeTasksContainer.innerHTML = activeHTML;
    DOM.finishedTasksContainer.innerHTML = finishedHTML;

    activeTasks.length > 0 ? DOM.activeTasksCountLabel.style.display = 'flex' : DOM.activeTasksCountLabel.style.display = 'none';

    finishedTasks.length > 0 ? DOM.finishedTasksCountLabel.style.display = 'flex' : DOM.finishedTasksCountLabel.style.display = 'none';

    DOM.activeTasksCountLabel.textContent = activeTasks.length; 
    DOM.finishedTasksCountLabel.textContent = finishedTasks.length;
  }

  renderProgressPrecentage(precentage) {
    DOM.progressPrecentageNumber.textContent = `${precentage}%`;
    DOM.progressPrecentageBar.style.strokeDashoffset = `calc(320 - (320 * ${precentage}) / 100)`;
  }

  renderSortStatusBtn(tasks){
    tasks.length > 1 ? DOM.sortByStatusBtn.style.display = 'block' : DOM.sortByStatusBtn.style.display = 'none';
    
  }

  showMenu(){
    DOM.menu.classList.add("menu--isActive");
  }

  hideMenu(){
    DOM.menu.classList.remove("menu--isActive");
  }

  toggleMenu(){
    DOM.menu.classList.toggle("menu--toggle");
  }

  showLoginModal(){
    DOM.loginModal.style.display = 'flex';
  }

  closeLoginModal(e){
    e.preventDefault();
    DOM.loginModal.style.display = 'none';
    DOM.loginUsernameInput.value = '';
    DOM.loginPasswordInput.value = '';
  }

  showRegistrationModal(){
    DOM.registrationModal.style.display = 'flex'
  }

  closeRegistrationModal(e){
    e.preventDefault();
    DOM.registrationModal.style.display = 'none';
    DOM.registrationUsernameInput.value = '';
    DOM.registrationPasswordInput.value = '';
  }

  showSortDailyTasksBtn() {
    DOM.sortDailyTasksBtn.style.display = 'block';
  }

  hideSortDailyTasksBtn() {
    DOM.sortDailyTasksBtn.style.display = 'none';
  }

  showMainPanel() {
    DOM.mainPanel.style.display = 'block';
    DOM.welcomePage.style.display = 'none';
    DOM.loginModal.style.display = 'none';
    DOM.registrationModal.style.display = 'none';
    DOM.todoPage.style.display = 'none';
    DOM.dailyPage.style.display = 'none';
    DOM.weeklyPage.style.display = 'none';
    DOM.activityPage.style.display = 'none';
  }

  renderPageInPanel(page) {
    switch(page) {
      case 'nav__todo':
        DOM.startPage.style.display = 'none';
        DOM.todoPage.style.display = 'flex';
        DOM.dailyPage.style.display = 'none';
        DOM.weeklyPage.style.display = 'none';
        DOM.activityPage.style.display = 'none';
        DOM.menuNavTodo.classList.add('isActive');
        DOM.menuNavDaily.classList.remove('isActive');
        DOM.menuNavWeekly.classList.remove('isActive');
        DOM.menuNavActivity.classList.remove('isActive')
        DOM.mainPanelTopHeading.textContent = 'Add task';
        this.toggleMenu();
        this.hideSortDailyTasksBtn()
        break;
      case 'nav__daily':
        DOM.startPage.style.display = 'none';
        DOM.todoPage.style.display = 'none';
        DOM.dailyPage.style.display = 'block';
        DOM.weeklyPage.style.display = 'none';
        DOM.activityPage.style.display = 'none';
        DOM.menuNavDaily.classList.add('isActive');
        DOM.menuNavTodo.classList.remove('isActive');
        DOM.menuNavWeekly.classList.remove('isActive');
        DOM.menuNavActivity.classList.remove('isActive');
        DOM.mainPanelTopHeading.textContent = 'Daily';
        DOM.mainPanelTop
        this.toggleMenu();
        this.showSortDailyTasksBtn();
        break;
      case 'nav__weekly':
        DOM.startPage.style.display = 'none';
        DOM.todoPage.style.display = 'none';
        DOM.dailyPage.style.display = 'none';
        DOM.weeklyPage.style.display = 'block';
        DOM.activityPage.style.display = 'none';
        DOM.menuNavWeekly.classList.add('isActive');
        DOM.menuNavTodo.classList.remove('isActive');
        DOM.menuNavDaily.classList.remove('isActive');
        DOM.menuNavActivity.classList.remove('isActive');
        DOM.mainPanelTopHeading.textContent = 'Weekly';
        this.toggleMenu();
        this.hideSortDailyTasksBtn();
        break;
      case 'nav__activity':
        DOM.startPage.style.display = 'none';
        DOM.todoPage.style.display = 'none';
        DOM.dailyPage.style.display = 'none';
        DOM.weeklyPage.style.display = 'none';
        DOM.activityPage.style.display = 'block';
        DOM.menuNavActivity.classList.add('isActive');
        DOM.menuNavTodo.classList.remove('isActive');
        DOM.menuNavDaily.classList.remove('isActive');
        DOM.menuNavWeekly.classList.remove('isActive');
        DOM.mainPanelTopHeading.textContent = 'Activity';
        this.toggleMenu();
        this.hideSortDailyTasksBtn();
        break;
      case 'nav__logout':
        location.reload();
        location.href = 'http://localhost:8080/';
        return false;
    }
  }
}

export const ui = new UI();