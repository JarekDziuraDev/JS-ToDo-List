import {setTimeMinutesInc} from './clock.js';
import {setTimeMinutesDec} from './clock.js';
import {setTimeHourInc} from './clock.js';
import {setTimeHourDec} from './clock.js';
import {Clock} from './clock.js';

let $idNumber = 0;
let $allTasks;

//TODO
let $todoList;
let $todoToEdit;

//MODAL (common elements)
let $modalOverlay;
let $modalIconTitle;
let $modalIconMsg;

//Modal Add Task
let $AddTaskModal;
let $modalAddTaskOpenBtn; 
let $modalAddTaskCloseBtn;
let $modalAddTaskBtn;
let $modalAddTaskInputTitle; 
let $modalAddTaskInputMsg;

//Modal Show Task
let $ShowTaskMsgModal;
let $modalShowTaskCloseBtn;

//Modal Edit Taks
let $EditTaskModal;
let $modalCloseEditTaskBtn;
let $modalEditTaskBtn;
let $modalEditTaskInputTitle;
let $modalEditTaskInputMsg;
let $modalEditTaskIconTitle;
let $modalEditTaskIconMsg;


//Table
let $tableAllTask;
let $tableProgressTask;
let $tableEffectivenessTask;

//Clock
let $Clock;
let $clockTime;
let $clockHour;
let $clockMinutes;
let $clockHourInc;
let $clockHourDec;
let $clockMinutesInc;
let $clockMinutesDec;

let $clockHourEdit;
let $clockMinutesEdit;
let $clockHourIncEdit;
let $clockHourDecEdit;
let $clockMinutesIncEdit;
let $clockMinutesDecEdit;


const main = () => {
    initDOMElements();
    initDOMEvents();
    initGlobalObject();
    checkInitDOMElements();
    updateTaskInfo();
};

const updateTaskInfo = () => {
    $tableAllTask.innerText = $allTasks.length;
}

const initDOMElements = () => {
    //TODO 
    $todoList = document.querySelector('.todoList ul');
    $allTasks = $todoList.getElementsByTagName('li');

    //Modal (common elements)
    $modalOverlay = document.getElementById('modalOverlay');
    $modalIconTitle = document.querySelector('.inconTitle');
    $modalIconMsg = document.querySelector('.inconMsg');
    //console.log($modalIconTitle)
    //Modal add task
    $AddTaskModal = document.querySelector('#modalFormAddTask');
    $modalAddTaskOpenBtn = document.querySelector('#modalOpenAddTask');
    $modalAddTaskCloseBtn = document.querySelector('#modalCloseAddTaskBtn');
    $modalAddTaskBtn = document.querySelector('#modalAddTaskBtn')
    $modalAddTaskInputTitle = document.querySelector('#modalAddTaskInputTitle');
    $modalAddTaskInputMsg = document.querySelector('#modalAddTaskInputMsg');
     
    //Modal edit task
    //modalOpenEditTaskBtn is in tools panel
    $EditTaskModal = document.querySelector('#modalFormEditTask');
    $modalCloseEditTaskBtn = document.querySelector('#modalEditTaskCloseBtn');
    $modalEditTaskBtn = document.querySelector('#modalEditTaskBtn');
    $modalEditTaskInputTitle = document.querySelector('#modalEditInputTitle');
    $modalEditTaskInputMsg = document.querySelector('#modalEditInputMsg');
    $modalEditTaskIconTitle = document.querySelector('#modalEditTaskIconTitle');
    $modalEditTaskIconMsg = document.querySelector('#modalEditTaskIconMsg');

    //Modal show task
    $ShowTaskMsgModal = document.querySelector('#modalFormShowTask');
    $modalShowTaskCloseBtn = document.querySelector('#modalShowTaskCloseBtn');
     
    //Table in Header Info
    $tableAllTask = document.querySelector('.allTask');
    $tableProgressTask = document.querySelector('.progressTask');
    $tableEffectivenessTask = document.querySelector('.effectivenessTask');
    
    //Clock in Modal Add Task
    $clockTime = document.querySelector('.clockTime');

    $clockHour = document.querySelector('#clockHour');
    $clockMinutes = document.querySelector('#clockMinutes');

    $clockHourInc = document.querySelector('.clockHourInc');
    $clockHourDec = document.querySelector('.clockHourDec');

    $clockMinutesInc = document.querySelector('.clockMinutesInc');
    $clockMinutesDec = document.querySelector('.clockMinutesDec');

    //Clock in Modal Edit Task
    $clockHourEdit = document.querySelector('#clockHourEdit');
    $clockHourIncEdit = document.querySelector('#clockHourIncEdit');
    $clockHourDecEdit = document.querySelector('#clockHourDecEdit');

    $clockMinutesEdit = document.querySelector('#clockMinutesEdit');
    $clockMinutesIncEdit = document.querySelector('#clockMinutesIncEdit');
    $clockMinutesDecEdit = document.querySelector('#clockMinutesDecEdit');
    
};

const initDOMEvents = () => {
    $todoList.addEventListener('click', checkTools);
    
    //Modal Add Task
    $modalAddTaskBtn.addEventListener('click', addNewTask);
    $modalAddTaskOpenBtn.addEventListener('click', () => {
        resetModalInput($modalAddTaskInputTitle);
        resetModalInput($modalAddTaskInputMsg);
        resetModalIcon($modalIconTitle);
        resetModalIcon($modalIconMsg);

        setTimeModal();
        openModal($AddTaskModal);
    });
    $modalAddTaskCloseBtn.addEventListener('click', () => {
        closeModal($AddTaskModal);
    });
    $modalAddTaskInputTitle.addEventListener('click', () => {
        resetModalIcon($modalIconTitle)});
    $modalAddTaskInputMsg.addEventListener('click', () => {
        resetModalIcon($modalIconMsg)});

    //Modal Show Task
    $modalShowTaskCloseBtn.addEventListener('click', () => {
        closeModal($ShowTaskMsgModal);
    });

    //Modal Edit Task
    $modalEditTaskBtn.addEventListener('click', editTask);
    $modalCloseEditTaskBtn.addEventListener('click', () => {
        closeModal($EditTaskModal);
    });
    $modalEditTaskInputTitle.addEventListener('click', () => {
        resetModalIcon($modalEditTaskIconTitle)});
    $modalEditTaskInputMsg.addEventListener('click', () => {
        resetModalIcon($modalEditTaskIconMsg)});

    //Clock
    $clockHourInc.addEventListener('click', () => {
        $clockHour = setTimeHourInc($clockHour)
    });
    $clockHourDec.addEventListener('click', () => {
        $clockHour = setTimeHourDec($clockHour);
    });
    $clockMinutesInc.addEventListener('click', () => {
        $clockMinutes = setTimeMinutesInc($clockMinutes);
    });
    $clockMinutesDec.addEventListener('click', () => {
        $clockMinutes = setTimeMinutesDec($clockMinutes);
    });

    $clockHourIncEdit.addEventListener('click', () => {
        $clockHourEdit = setTimeHourInc($clockHourEdit)
    });
    $clockHourDecEdit.addEventListener('click', () => {
        $clockHourEdit = setTimeHourDec($clockHourEdit)
    });
    $clockMinutesIncEdit.addEventListener('click', () => {
        $clockMinutesEdit = setTimeMinutesInc($clockMinutesEdit)
    });
    $clockMinutesDecEdit.addEventListener('click', () => {
        $clockMinutesEdit = setTimeMinutesDec($clockMinutesEdit)
    });

}
const initGlobalObject = () => {
    $Clock = new Clock($clockTime);
    const time = $Clock.getTimeParts();

    $clockHourEdit.innerText = "H:" + time.hour.toString().padStart(2, "0");
    $clockHourEdit.setAttribute('data-hour', time.hour);

    $clockMinutesEdit.innerText = "M:" + time.minutes.toString().padStart(2, "0");
    $clockMinutesEdit.setAttribute('data-minutes', time.minutes);
}
function toDoTimer() {
    $clockTime = $Clock.update();
    checkFailedTask($Clock.getTimeParts());
}

const setTimeModal = () => {
    const time = $Clock.getTimeParts();
    
    $clockHour.innerText = "H:" + time.hour.toString().padStart(2, "0");
    $clockHour.setAttribute('data-hour', time.hour);
    
    $clockMinutes.innerText = "M:" + time.minutes.toString().padStart(2, "0");
    $clockMinutes.setAttribute('data-minutes', time.minutes);
}

const openModal = (modal) => {
    if (modal == null) return;

    modal.classList.add('active');
    $modalOverlay.classList.add('active');
}

const closeModal = (modal) => {
    if (modal == null) return;
    modal.classList.remove('active');
    $modalOverlay.classList.remove('active');
}

const ShowTaskMsgOpenModal = (event) => {
    $ShowTaskMsgModal.querySelector('p').innerText = event.target.closest('li').querySelector('p').innerText;
    openModal($ShowTaskMsgModal);
}

const EditTaskOpenModal = (event) => {
    const task = event.target.closest('li');
    
    if (task.dataset.done === 'false') { 
        
        const title = task.querySelector('#title').innerText;
        const msg = task.querySelector('#msg').innerText;
        const hour = task.dataset.hour;
        const minutes = task.dataset.minutes;        
        const id = event.target.closest('li').id;
        
        $EditTaskModal.querySelector('#modalEditInputTitle').value = title;
        $EditTaskModal.querySelector('#modalEditInputMsg').value = msg;
        $EditTaskModal.querySelector('#clockHourEdit').innerText = "H:" + hour;
        $EditTaskModal.querySelector('#clockMinutesEdit').innerText = "M:" + minutes;
        
        $todoToEdit = task;
        openModal($EditTaskModal);
    }
}

const checkTools = (event) => {
    if (event.target.closest('button').classList.contains('accept')) {
        CompletedTask(event);
    } else if (event.target.closest('button').classList.contains('edit')) {
        EditTaskOpenModal(event);
    } else if (event.target.closest('button').classList.contains('delete')) {
        DeleteTask(event);
    } else if (event.target.closest('button').classList.contains('show')) {
        ShowTaskMsgOpenModal(event);
    }
}

const createToolsPanel = (newTask) => {
    const divToolsPanel = document.createElement('div');
    const showBtn = document.createElement('button');
    const acceptBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    divToolsPanel.classList.add('tools');
    showBtn.classList.add('show', 'toolsButton');
    showBtn.setAttribute('data-modal-target', '#modalFormShow');
    acceptBtn.classList.add('accept', 'toolsButton');
    editBtn.classList.add('edit', 'toolsButton');
    deleteBtn.classList.add('delete', 'toolsButton');

    showBtn.innerHTML = '<i class="far fa-file"></i>'
    acceptBtn.innerHTML = '<i class="fas fa-check"></i>';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    divToolsPanel.appendChild(showBtn);
    divToolsPanel.appendChild(acceptBtn);
    divToolsPanel.appendChild(editBtn);
    divToolsPanel.appendChild(deleteBtn);

    newTask.appendChild(divToolsPanel);
    return newTask;
}

const addNewTask = () => {
    let titleCondition = checkImputEmptyValue($modalAddTaskInputTitle);
    let msgCondition = checkImputEmptyValue($modalAddTaskInputMsg);

    //console.log($modalIconTitle)

    if (titleCondition) {
        setModalIcon($modalIconTitle);
    } 
    if (msgCondition) {
        setModalIcon($modalIconMsg);
    } 

    if (!titleCondition && !msgCondition) {
        $idNumber++;
        const hour = $clockHour.dataset.hour;
        const minutes = $clockMinutes.dataset.minutes;
        
        let newTask = document.createElement('li');
        newTask.classList.add('todoListItem');
        let newTaskId = document.createElement('h3');
        let newTaskTitle = document.createElement('h3');
        newTaskTitle.setAttribute('id', 'title');
        let newTaskEnd = document.createElement('h3');
        newTaskEnd.setAttribute('id', 'taskEnd');
        let newTaskMsg = document.createElement('p');
        newTaskMsg.setAttribute('id', 'msg');

        newTaskId.innerText = $idNumber;
        newTaskTitle.innerText = $modalAddTaskInputTitle.value;
        newTaskEnd.innerText = hour + " : " + minutes;
        newTaskMsg.innerText = $modalAddTaskInputMsg.value;

        newTaskMsg.classList.add('hide');

        newTask.appendChild(newTaskId);
        newTask.appendChild(newTaskTitle);
        newTask.appendChild(newTaskEnd);
        newTask.appendChild(newTaskMsg);
        newTask = createToolsPanel(newTask);
        newTask.setAttribute('id', `todo-${$idNumber}`);
        newTask.setAttribute('data-id', `${$idNumber}`);
        newTask.setAttribute('data-done', 'false'); //?
        newTask.setAttribute('data-hour', hour);
        newTask.setAttribute('data-minutes', minutes);
        $todoList.appendChild(newTask);

        closeModal($AddTaskModal);        
        updateTaskInfo();
    }
}

const checkImputEmptyValue = (input) => {
    if (input.value === '') {
        return true;
    } 
    return false;
}

const editTask = () => {
    let titleCondition = checkImputEmptyValue($modalEditTaskInputTitle);
    let msgCondition = checkImputEmptyValue($modalEditTaskInputMsg);
    
    if (titleCondition) {
        setModalIcon($modalEditTaskIconTitle);
    }
    if (msgCondition) {
        setModalIcon($modalEditTaskIconMsg);
    }

    if(!titleCondition && !msgCondition) {
        const hour = $clockHourEdit.dataset.hour;
        const minutes = $clockMinutesEdit.dataset.minutes;
    
        
        //.innerText = $modalAddTaskInputTitle.value;
        //.innerText = hour + " : " + minutes;
        //.innerText = $modalAddTaskInputMsg.value;
        
        
        $todoToEdit.querySelector('#title').innerText = $modalEditTaskInputTitle.value;
        $todoToEdit.querySelector('#msg').innerText = $modalEditTaskInputMsg.value;
        $todoToEdit.querySelector('#taskEnd').innerText = hour + " : " + minutes;
        
        $todoToEdit.setAttribute('data-hour', hour);
        $todoToEdit.setAttribute('data-minutes', minutes);
        
        console.log($todoToEdit);
    
        //$todoToEdit = newTask;
        closeModal($EditTaskModal);
        updateTaskInfo();
    }
}


//TOOL PANEL FUNCTIONS//////////////////////////////////////////
const CompletedTask = (event) =>{
    const checkDone = event.target.closest('li');

    if (checkDone.dataset.done === 'false') {
        let buttons = event.target.closest('li').querySelectorAll('button');
        addCompleteTaskButton(buttons);
        event.target.closest('.todoList li').classList.add('completedTask');
        event.target.closest('li').setAttribute('data-done', 'true');
    }
}
const DeleteTask = (event) => {
    const deleteToDo = event.target.closest('li');
    
    if (deleteToDo.dataset.done === 'false') {
        deleteToDo.remove();
        updateTaskInfo();
    }
}
////////////////////////////////////////////////////////////////

const addCompleteTaskButton = (buttons) => {
    buttons.forEach( item => {
        if (!item.classList.contains('show')) {
            (item.classList.add('completedTaskButtons'));
        }
    });
}
const checkFailedTask = (time) => {
    const liList = $todoList.querySelectorAll("li");
    liList.forEach( item => {
        if (item.dataset.hour <= time.hour && item.dataset.minutes < time.minutes && item.dataset.done === 'false') {
            item.setAttribute('data-done', 'true');
            item.classList.add('failedTask');
            const buttons = item.querySelectorAll('button');
            addCompleteTaskButton(buttons);
        }
    })
}
      
const resetModalIcon = (icon) => {
    icon.classList.add('hide');
}
const setModalIcon = (icon) => {
    icon.classList.remove('hide');
}

const resetModalInput = (input) => {
    input.value = '';
    
}
const eneterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
}

const checkInitDOMElements = () => {

}

document.addEventListener('DOMContentLoaded', main)

setInterval(toDoTimer, 1000)