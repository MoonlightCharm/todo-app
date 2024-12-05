import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

// Manage the dialog state
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

// Handle date picker functionality
export function controlDatePicker() {
    const dialog = document.querySelector('#task-dialog');
    const datePickerBtn = document.querySelector('.date-picker-btn');
    const dueDate = datePickerBtn.querySelector('span');
    const defaultText = 'Due date';
    let selectedDate = '';
    let picker; // Declare picker outside to persist its state

    // Initialize the picker on first use
    function initializePicker() {
        if (!picker) {
            picker = new Pikaday({
                field: document.createElement('input'), // Dummy input
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

            picker.hide(); // Ensure picker is initially hidden

            // Ensure the picker is hidden when clicking outside it
            document.addEventListener('click', (e) => {
                const pickerElement = picker.el; // Picker's DOM element
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

    // Handle 'Due date' button click
    datePickerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        initializePicker(); // Initialize picker if not already done

        const rect = datePickerBtn.getBoundingClientRect();
        const dialogRect = dialog.getBoundingClientRect();

        // Adjust picker position relative to dialog
        const pickerElement = picker.el;
        pickerElement.style.position = 'absolute';
        pickerElement.style.top = `${rect.bottom - dialogRect.top}px`;
        pickerElement.style.left = `${rect.left - dialogRect.left}px`;
        pickerElement.style.zIndex = '9999';

        picker.show(); // Show picker
    });

    // Reset state when the dialog is closed
    dialog.addEventListener('close', () => {
        dueDate.textContent = defaultText;
        selectedDate = ''; // Reset selected date
        if (picker) picker.hide(); // Hide picker on dialog close
    });

    return () => selectedDate; // Return function to access selected date
}

// Handle priority selection
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
        selectedPriority = ''; // Reset the value when dialog closes
    });

    return () => selectedPriority; // Return a function to access the current priority
}

// Add task functionality
export function addTask(getSelectedDate, getSelectedPriority) {
    const taskTitleInput = document.querySelector('#task-name');
    const taskDescriptionInput = document.querySelector('#task-description');
    const createTaskBtn = document.querySelector('.add-btn');
    const dialog = document.querySelector('#task-dialog');

    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            const task = createTask(
                taskTitleInput?.value || '',
                taskDescriptionInput?.value || '',
                getSelectedDate(), // Use the accessor to get the latest date
                getSelectedPriority() // Use the accessor to get the latest priority
            );

            displayTask(task.title, task.description, task.date, task.priority);

            console.log(task); // Debugging

            // Reset inputs after task creation
            taskTitleInput.value = '';
            taskDescriptionInput.value = '';
        });
    }

    dialog.addEventListener('close', () => {
        taskTitleInput.value = ''; // Reset title input on close
        taskDescriptionInput.value = ''; // Reset description input on close
    });
}

// Task factory function
function createTask(title, description, date, priority) {
    return {
        title,
        description,
        date,
        priority,
    };
}

export function displayTask(title, description, date, priority) {
    const mainContainer = document.querySelector('main');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    // Use clearTask to attach removal functionality to the checkbox
    clearTask(taskContainer, checkbox);

    const checkboxTitleDescriptionContainer = document.createElement('div');
    checkboxTitleDescriptionContainer.classList.add('checkbox-title-description-container');

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    const titleDescriptionContainer = document.createElement('div');
    titleDescriptionContainer.classList.add('title-description-container');
    titleDescriptionContainer.appendChild(taskTitle);
    titleDescriptionContainer.appendChild(taskDescription);

    checkboxTitleDescriptionContainer.appendChild(checkbox);
    checkboxTitleDescriptionContainer.appendChild(titleDescriptionContainer);

    const taskDate = document.createElement('p');
    taskDate.textContent = date;

    const taskPriority = document.createElement('p');
    taskPriority.textContent = priority;

    const datePriorityContainer = document.createElement('div');
    datePriorityContainer.classList.add('date-priority-container');
    datePriorityContainer.appendChild(taskDate);
    datePriorityContainer.appendChild(taskPriority);

    taskContainer.appendChild(checkboxTitleDescriptionContainer);
    taskContainer.appendChild(datePriorityContainer);

    mainContainer.appendChild(taskContainer);
}

export function clearTask(taskContainer, checkbox) {
    let removalTimeout; // Variable to store the timeout ID

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Set a timeout to remove the taskContainer after 1 second
            removalTimeout = setTimeout(() => {
                taskContainer.remove();
            }, 1500);
        } else {
            // Clear the timeout if the checkbox is unchecked
            clearTimeout(removalTimeout);
        }
    });
}

export function openProjectDialog() {
    const addProjectBtn = document.querySelector('.add-project-btn');
    const dialog = document.querySelector('#project-dialog');
    addProjectBtn.addEventListener('click', () => dialog.showModal());
}

export function closeProjectDialog() {
    const dialog = document.querySelector('#project-dialog');
    const closeDialogBtn = document.querySelector('.cancel-project-btn');
    const createProjectBtn = document.querySelector('.create-project-btn');
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

    createProjectBtn.addEventListener('click', () => {
        dialog.close();
    });

}

export function createProject() {
    const projectName = document.querySelector('#project-name');
    const createProjectBtn = document.querySelector('.create-project-btn');
    const projectListContainer = document.querySelector('.project-list-container');

    createProjectBtn.addEventListener('click', () => {
        const projectNameSpan = document.createElement('span');
        projectNameSpan.textContent = projectName.value;
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        projectContainer.appendChild(projectNameSpan);
        projectListContainer.appendChild(projectContainer);
    });
}


export function highlightSelectedProject() {
    const projectListContainer = document.querySelector('.project-list-container');
    const defaultProjectContainer = document.querySelector('.default-project-container');

    // Initially add 'selected-project' to the default project
    defaultProjectContainer.classList.add('selected-project');

    // Add event listener to the parent container for delegation
    projectListContainer.addEventListener('click', (event) => {
        // Check if the clicked element is a project container
        const clickedContainer = event.target.closest('.project-container') || 
                                 event.target.closest('.default-project-container');
        if (!clickedContainer) return;

        // Remove 'selected-project' class from all containers
        projectListContainer.querySelectorAll('.project-container, .default-project-container')
            .forEach(container => container.classList.remove('selected-project'));

        // Add 'selected-project' class to the clicked container
        clickedContainer.classList.add('selected-project');
    });
}


