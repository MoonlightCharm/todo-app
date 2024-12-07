const tasksByProject = {
    Home: [] // Default project
};

let currentProject = 'Home'; // Default project

export function addTask(getSelectedDate, getSelectedPriority) {
    const taskTitleInput = document.querySelector('#task-name');
    const taskDescriptionInput = document.querySelector('#task-description');
    const createTaskBtn = document.querySelector('.add-btn');
    const dialog = document.querySelector('#task-dialog');

    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            const task = {
                title: taskTitleInput.value || '',
                description: taskDescriptionInput.value || '',
                date: getSelectedDate(),
                priority: getSelectedPriority(),
            };

            if (!tasksByProject[currentProject]) {
                tasksByProject[currentProject] = [];
            }
            tasksByProject[currentProject].push(task);

            displayTasksForCurrentProject();

            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        });
    }

    dialog.addEventListener('close', () => {
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
    });
}

export function displayTasksForCurrentProject() {
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = ''; // Clear existing tasks

    const tasks = tasksByProject[currentProject] || [];
    tasks.forEach(task => displayTask(task));
}

function displayTask({ title, description, date, priority }) {
    const mainContainer = document.querySelector('main');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    taskContainer.innerHTML = `
        <div class="checkbox-title-description-container">
            <input type="checkbox" class="checkbox">
            <div class="title-description-container">
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
        </div>
        <div class="date-priority-container">
            <p>${date}</p>
            <p>${priority}</p>
        </div>
    `;

    mainContainer.appendChild(taskContainer);
}
