import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

export function controlDatePicker() {
    const dialog = document.querySelector('#task-dialog');
    const datePickerBtn = document.querySelector('.date-picker-btn');
    const dueDate = datePickerBtn.querySelector('span');
    const defaultText = 'Due date';
    let selectedDate = '';
    let picker;

    function initializePicker() {
        if (!picker) {
            picker = new Pikaday({
                field: document.createElement('input'),
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

            picker.hide();

            document.addEventListener('click', (e) => {
                const pickerElement = picker.el;
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

    datePickerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        initializePicker();

        const rect = datePickerBtn.getBoundingClientRect();
        const dialogRect = dialog.getBoundingClientRect();

        const pickerElement = picker.el;
        pickerElement.style.position = 'absolute';
        pickerElement.style.top = `${rect.bottom - dialogRect.top}px`;
        pickerElement.style.left = `${rect.left - dialogRect.left}px`;
        pickerElement.style.zIndex = '9999';

        picker.show();
    });

    dialog.addEventListener('close', () => {
        dueDate.textContent = defaultText;
        selectedDate = '';
        if (picker) picker.hide();
    });

    return () => selectedDate;
}