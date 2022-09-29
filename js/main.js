const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let task = [];

if (localStorage.getItem('task')) {
    task = JSON.parse (localStorage.getItem('task'));
    task.forEach ((task) => renderTask(task));  
}

checkEmptyList ()

form.addEventListener ('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)


function addTask (event) {
    event.preventDefault ();
    
    const taskText = taskInput.value;
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,

    };

    task.push (newTask);
    
    saveToLS ();
    renderTask (newTask);
    
    taskInput.value = "";
    taskInput.focus();
    checkEmptyList ()

}
function deleteTask (event) {

    if (event.target.dataset.action === 'delete') {
        const parenNode = event.target.closest ('.list-group-item');
        
        const id = parenNode.id;
        
        const index = task.findIndex ((task) => task.id == id);  

        task.splice (index, 1);

        saveToLS ();
       
        parenNode.remove ();
        
        checkEmptyList ();

         
    }

}
function doneTask (event) {
    if (event.target.dataset.action === 'done') {
        const parenNode = event.target.closest ('.list-group-item');
        const taskTitle = parenNode.querySelector ('.task-title');
        taskTitle.classList.toggle('task-title--done');

        const id = parenNode.id;
        const tasks = task.find((task) => task.id == id);
        tasks.done = !tasks.done
        
        saveToLS ();
       

    }

}
function checkEmptyList () {
    if (task.length === 0){
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                    <div class="empty-list__title">Список дел пуст</div>
                </li>`;
        taskList.insertAdjacentHTML ("afterbegin", emptyListElement);

    }

    if (task.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}
function saveToLS () {
    localStorage.setItem ('task', JSON.stringify(task));
}
function renderTask (task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';


    const taskHTML = `
                <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`
    
    taskList.insertAdjacentHTML ('beforeend', taskHTML);

}