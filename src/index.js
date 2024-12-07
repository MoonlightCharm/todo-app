import "./style.css";
import { openDialog, closeDialog, openProjectDialog, closeProjectDialog } from './modules/dialogControls';
import { controlDatePicker } from './modules/datePicker';
import { setPriority } from './modules/priorityControl';
import { addTask } from './modules/taskManager';
import { createProject, highlightSelectedProject, updateMainView } from './modules/projectManager';

document.addEventListener("DOMContentLoaded", () => {
    // Highlight the selected project and update the main view on page load
    highlightSelectedProject();
    updateMainView();

    // Initialize dialog controls for tasks and projects
    openDialog();
    closeDialog();
    openProjectDialog();
    closeProjectDialog();

    // Set up date picker and priority selection, and get their handlers
    const getSelectedDate = controlDatePicker();
    const getSelectedPriority = setPriority();

    // Set up task management
    addTask(getSelectedDate, getSelectedPriority);

    // Enable project creation functionality
    createProject();
});