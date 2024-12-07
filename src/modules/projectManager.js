import { tasksByProject } from './dataStore';
import { clearDisplayedTasks, displayTask } from './taskManager';

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

        // Update main view header
        h1Tag.textContent = projectName;

        // Clear existing tasks from view
        clearDisplayedTasks();

        // Ensure add-task container is visible
        if (!mainContainer.contains(addTaskContainer)) {
            mainContainer.appendChild(addTaskContainer);
        }

        // Fetch and display tasks for the selected project
        const projectTasks = tasksByProject[projectName] || [];
        projectTasks.forEach(task => {
            displayTask(task.title, task.description, task.date, task.priority, projectName);
        });
    });
}