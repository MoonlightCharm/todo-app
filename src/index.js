import "./style.css";
import {
    openDialog,
    closeDialog,
    controlDatePicker,
    setPriority,
    addTask,
    openProjectDialog,
    closeProjectDialog,
    createProject,
    highlightSelectedProject,
    updateMainView,
} from "./DOM";

document.addEventListener("DOMContentLoaded", () => {
    highlightSelectedProject();
    updateMainView();

    openDialog();
    closeDialog();

    const getSelectedDate = controlDatePicker();
    const getSelectedPriority = setPriority();

    addTask(getSelectedDate, getSelectedPriority);

    openProjectDialog();
    closeProjectDialog();

    createProject();
});
