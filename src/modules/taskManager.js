import { tasksByProject } from './dataStore';

export function addTask(getSelectedDate, getSelectedPriority) {
    const taskTitleInput = document.querySelector('#task-name');
    const taskDescriptionInput = document.querySelector('#task-description');
    const createTaskBtn = document.querySelector('.add-btn');
    const dialog = document.querySelector('#task-dialog');

    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            const taskTitle = taskTitleInput.value.trim();
            const taskDescription = taskDescriptionInput.value.trim();
            const selectedDate = getSelectedDate();
            const selectedPriority = getSelectedPriority();

            if (!taskTitle) return;

            const task = createTask(taskTitle, taskDescription, selectedDate, selectedPriority);
            const currentProject = document.querySelector('main h1').textContent;

            if (!tasksByProject[currentProject]) {
                tasksByProject[currentProject] = [];
            }
            tasksByProject[currentProject].push(task);

            displayTask(task.title, task.description, task.date, task.priority, currentProject);

            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        });
    }

    dialog.addEventListener('close', () => {
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
    });
}

function createTask(title, description, date, priority) {
    return { title, description, date, priority };
}

export function displayTask(title, description, date, priority, projectName) {
    const mainContainer = document.querySelector('main');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkboxTitleDescriptionContainer = document.createElement('div');
    checkboxTitleDescriptionContainer.classList.add('checkbox-title-description-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    clearTask(taskContainer, checkbox, projectName, title);

    const titleDescriptionContainer = document.createElement('div');
    titleDescriptionContainer.classList.add('title-description-container');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    titleDescriptionContainer.appendChild(taskTitle);
    titleDescriptionContainer.appendChild(taskDescription);

    checkboxTitleDescriptionContainer.appendChild(checkbox);
    checkboxTitleDescriptionContainer.appendChild(titleDescriptionContainer);

    const datePriorityContainer = document.createElement('div');
    datePriorityContainer.classList.add('date-priority-container');

    const taskDate = document.createElement('p');
    taskDate.textContent = date;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = priority;

    datePriorityContainer.appendChild(taskDate);
    datePriorityContainer.appendChild(taskPriority);

    taskContainer.appendChild(checkboxTitleDescriptionContainer);
    taskContainer.appendChild(datePriorityContainer);

    mainContainer.appendChild(taskContainer);
}

function clearTask(taskContainer, checkbox, projectName, taskTitle) {
    let removalTimeout;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            removalTimeout = setTimeout(() => {
                taskContainer.remove();
                tasksByProject[projectName] = tasksByProject[projectName].filter(
                    task => task.title !== taskTitle
                );
            }, 1500);
        } else {
            clearTimeout(removalTimeout);
        }
    });
}

export function clearDisplayedTasks() {
    const mainContainer = document.querySelector('main');
    const taskContainers = mainContainer.querySelectorAll('.task-container');
    taskContainers.forEach(taskContainer => taskContainer.remove());
}