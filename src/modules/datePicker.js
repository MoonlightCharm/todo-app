import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

export default function controlDatePicker() {
    const datePickerBtn = document.querySelector('.date-picker-btn');
    const dueDateSpan = datePickerBtn.querySelector('span');
    const defaultText = 'Due date';
    let selectedDate = '';
    let picker;

    function initializePicker() {
        if (!picker) {
            picker = new Pikaday({
                field: document.createElement('input'),
                trigger: datePickerBtn,
                format: 'YYYY-MM-DD',
                bound: false,
                onSelect: function (date) {
                    selectedDate = this.toString();
                    dueDateSpan.textContent = selectedDate;
                    picker.hide();
                },
            });
            picker.hide();

            document.addEventListener('click', (e) => {
                if (!picker.el.contains(e.target) && e.target !== datePickerBtn) {
                    picker.hide();
                }
            });
        }
    }

    datePickerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        initializePicker();

        const rect = datePickerBtn.getBoundingClientRect();
        picker.el.style.position = 'absolute';
        picker.el.style.top = `${rect.bottom}px`;
        picker.el.style.left = `${rect.left}px`;
        picker.el.style.zIndex = '9999';

        picker.show();
    });

    return () => selectedDate;
}
