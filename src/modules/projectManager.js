let currentProject = 'Home'; // Default project
const tasksByProject = { Home: [] }; // Initialize task storage

export function openProjectDialog() {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const dialog = document.querySelector('#project-dialog');

    addProjectBtn.addEventListener('click', () => dialog.showModal());
}

export function closeProjectDialog() {
    const dialog = document.querySelector('#project-dialog');
    const closeDialogBtn = document.querySelector('.cancel-project-btn');
    const projectNameInput = document.querySelector('#project-name');

    closeDialogBtn.addEventListener('click', () => {
        dialog.close();
        projectNameInput.value = ''; // Reset input
    });

    document.addEventListener('click', (event) => {
        if (dialog.open && event.target === dialog) {
            dialog.close();
            projectNameInput.value = '';
        }
    });
}

export function createProject() {
    const createProjectBtn = document.querySelector('.create-project-btn');
    const projectNameInput = document.querySelector('#project-name');
    const projectListContainer = document.querySelector('.project-list-container');

    createProjectBtn.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        if (projectName && !tasksByProject[projectName]) {
            tasksByProject[projectName] = []; // Add new project to storage

            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            projectContainer.setAttribute('data-project', projectName);
            projectContainer.innerHTML = `<span>${projectName}</span>`;
            projectListContainer.appendChild(projectContainer);
        }

        projectNameInput.value = '';
        document.querySelector('#project-dialog').close();
    });
}

export function highlightSelectedProject(displayTasksCallback) {
    const projectListContainer = document.querySelector('.project-list-container');
    const defaultProjectContainer = document.querySelector('.default-project-container');

    defaultProjectContainer.classList.add('selected-project');
    defaultProjectContainer.setAttribute('data-project', 'Home');

    projectListContainer.addEventListener('click', (event) => {
        const clickedProject = event.target.closest('.project-container, .default-project-container');
        if (!clickedProject) return;

        projectListContainer.querySelectorAll('.project-container, .default-project-container')
            .forEach(project => project.classList.remove('selected-project'));

        clickedProject.classList.add('selected-project');
        currentProject = clickedProject.getAttribute('data-project'); // Update current project

        displayTasksCallback(); // Update displayed tasks for the selected project
    });
}

export function getCurrentProject() {
    return currentProject;
}

export function getTasksByProject() {
    return tasksByProject;
}
