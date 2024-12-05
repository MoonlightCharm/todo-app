import "./style.css";
import { openDialog, closeDialog, controlDatePicker, setPriority, addTask, openProjectDialog, closeProjectDialog, createProject, highlightSelectedProject } from "./DOM";

document.addEventListener("DOMContentLoaded", () => {

    highlightSelectedProject();
    // Initialize dialog controls
    openDialog();
    closeDialog();

    // Initialize date picker and priority, and get accessor functions
    const getSelectedDate = controlDatePicker();
    const getSelectedPriority = setPriority();

    // Initialize addTask and pass the accessors
    addTask(getSelectedDate, getSelectedPriority);

    openProjectDialog();
    closeProjectDialog();

    createProject();
});
