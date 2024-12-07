// dialogControls.js
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

    closeDialogBtn.addEventListener('click', () => dialog.close());

    document.addEventListener('click', (event) => {
        if (dialog.open && event.target === dialog) dialog.close();
    });
}
