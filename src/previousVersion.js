import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

// Store tasks by project
const tasksByProject = {
    Home: [], // Default project
};

// Dialog management
export function openDialog() {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const addTaskBtn2 = document.querySelector('.main-task-btn');
    const dialog = document.querySelector('#task-dialog');

    addTaskBtn.addEventListener('click', () => dialog.showModal());
    addTaskBtn2.addEventListener('click', () => dialog.showModal());
}

export function closeDialog() {
    const dialog = document.querySelector('#task-dialog');
    const closeDialogBtn = document.querySelector('.cancel-btn');
    const createTaskBtn = document.querySelector('.add-btn');

    closeDialogBtn.addEventListener('click', () => dialog.close());

    document.addEventListener('click', (event) => {
        if (dialog.open && event.target === dialog) dialog.close();
    });

    createTaskBtn.addEventListener('click', () => dialog.close());
}

// Date picker control
export function controlDatePicker() {
    const dialog = document.querySelector('#task-dialog');
    const datePickerBtn = document.querySelector('.date-picker-btn');
    const dueDate = datePickerBtn.querySelector('span');
    const defaultText = 'Due date';
    let selectedDate = '';
    let picker;

    function initializePicker() {
        if (!picker) {
            picker = new Pikaday({
                field: document.createElement('input'),
                trigger: datePickerBtn,
                container: dialog,
                format: 'YYYY-MM-DD',
                bound: false,
                onSelect: function (date) {
                    selectedDate = this.toString();
                    dueDate.textContent = selectedDate;
                    picker.hide();
                },
            });

            picker.hide();

            document.addEventListener('click', (e) => {
                const pickerElement = picker.el;
                if (
                    !pickerElement.contains(e.target) &&
                    e.target !== datePickerBtn &&
                    !datePickerBtn.contains(e.target)
                ) {
                    picker.hide();
                }
            });
        }
    }

    datePickerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        initializePicker();

        const rect = datePickerBtn.getBoundingClientRect();
        const dialogRect = dialog.getBoundingClientRect();

        const pickerElement = picker.el;
        pickerElement.style.position = 'absolute';
        pickerElement.style.top = `${rect.bottom - dialogRect.top}px`;
        pickerElement.style.left = `${rect.left - dialogRect.left}px`;
        pickerElement.style.zIndex = '9999';

        picker.show();
    });

    dialog.addEventListener('close', () => {
        dueDate.textContent = defaultText;
        selectedDate = '';
        if (picker) picker.hide();
    });

    return () => selectedDate;
}

// Priority control
export function setPriority() {
    const dialog = document.querySelector('#task-dialog');
    const priorityBtn = document.querySelector('.priority-btn');
    const customDropdown = document.querySelector('.custom-dropdown');
    let selectedPriority = '';

    priorityBtn.addEventListener('click', () => {
        customDropdown.classList.toggle('hidden');
    });

    customDropdown.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            selectedPriority = event.target.textContent;
            priorityBtn.querySelector('span').textContent = selectedPriority;
            customDropdown.classList.add('hidden');
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.priority-container')) {
            customDropdown.classList.add('hidden');
        }
    });

    dialog.addEventListener('close', () => {
        priorityBtn.querySelector('span').textContent = 'Priority';
        selectedPriority = '';
    });

    return () => selectedPriority;
}

// Add task functionality
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

            if (!taskTitle) return; // Prevent adding tasks with empty titles

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

// Project dialog and management
export function openProjectDialog() {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const dialog = document.querySelector('#project-dialog');
    addProjectBtn.addEventListener('click', () => dialog.showModal());
}

export function closeProjectDialog() {
    const dialog = document.querySelector('#project-dialog');
    const closeDialogBtn = document.querySelector('.cancel-project-btn');
    const projectName = document.querySelector('#project-name');

    closeDialogBtn.addEventListener('click', () => {
        dialog.close();
        projectName.value = '';
    });

    document.addEventListener('click', (event) => {
        if (dialog.open && event.target === dialog) {
            dialog.close();
            projectName.value = '';
        }
    });
}

export function createProject() {
    const projectNameInput = document.querySelector('#project-name');
    const createProjectBtn = document.querySelector('.create-project-btn');
    const projectListContainer = document.querySelector('.project-list-container');
    const dialog = document.querySelector('#project-dialog');

    createProjectBtn.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();

        if (!projectName || tasksByProject[projectName]) return;

        tasksByProject[projectName] = [];

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectNameSpan = document.createElement('span');
        projectNameSpan.textContent = projectName;

        projectContainer.appendChild(projectNameSpan);
        projectListContainer.appendChild(projectContainer);

        projectNameInput.value = '';
        dialog.close();
    });
}

export function highlightSelectedProject() {
    const projectListContainer = document.querySelector('.project-list-container');
    const defaultProjectContainer = document.querySelector('.default-project-container');

    defaultProjectContainer.classList.add('selected-project');

    projectListContainer.addEventListener('click', (event) => {
        const clickedContainer = event.target.closest('.project-container') ||
            event.target.closest('.default-project-container');
        if (!clickedContainer) return;

        projectListContainer.querySelectorAll('.project-container, .default-project-container')
            .forEach(container => container.classList.remove('selected-project'));

        clickedContainer.classList.add('selected-project');
    });
}

export function updateMainView() {
    const projectListContainer = document.querySelector('.project-list-container');
    const mainContainer = document.querySelector('main');
    const h1Tag = mainContainer.querySelector('h1');
    const addTaskContainer = mainContainer.querySelector('.add-task-container');

    projectListContainer.addEventListener('click', (event) => {
        const clickedProject = event.target.closest('.project-container') ||
            event.target.closest('.default-project-container');

        if (!clickedProject) return;

        const projectName = clickedProject.querySelector('span').textContent;

        h1Tag.textContent = projectName;

        clearDisplayedTasks();

        if (!mainContainer.contains(addTaskContainer)) {
            mainContainer.appendChild(addTaskContainer);
        }

        const projectTasks = tasksByProject[projectName] || [];
        projectTasks.forEach(task => {
            displayTask(task.title, task.description, task.date, task.priority, projectName);
        });
    });
}

function clearDisplayedTasks() {
    const mainContainer = document.querySelector('main');
    const taskContainers = mainContainer.querySelectorAll('.task-container');
    taskContainers.forEach(taskContainer => taskContainer.remove());
}
