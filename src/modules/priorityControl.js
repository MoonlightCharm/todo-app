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