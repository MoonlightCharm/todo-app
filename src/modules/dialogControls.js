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