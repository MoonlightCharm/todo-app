export function addTask() {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const addTaskBtn2 = document.querySelector('.main-task-btn');
    const closeDialogBtn = document.querySelector('.cancel-btn');
    const dialog = document.querySelector('dialog');

    addTaskBtn.addEventListener('click', () => {
        dialog.showModal();
    });
    
    addTaskBtn2.addEventListener('click', () => {
        dialog.showModal();
    });

    closeDialogBtn.addEventListener('click', () => {
        dialog.close();
    });
    
    document.addEventListener('click', (event) => {
        if (dialog.open && event.target === dialog) {
            dialog.close();
        }
    });
}