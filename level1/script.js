const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const remainingTasks = document.getElementById('remaining-tasks');
const clearTasksBtn = document.getElementById('clear-tasks');
const markAllCompletedBtn = document.getElementById('mark-all-completed');

let tasks = [];

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        updateTaskList();
        taskInput.value = '';
    }
});

taskList.addEventListener('change', function (event) {
    const index = event.target.dataset.index;
    tasks[index].completed = event.target.checked;
    updateTaskList();
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-task')) {
        const index = event.target.dataset.index;
        tasks.splice(index, 1);
        updateTaskList();
    }
});

markAllCompletedBtn.addEventListener('click', function () {
    const allCompleted = tasks.every(task => task.completed);
    tasks.forEach(task => task.completed = !allCompleted);
    updateTaskList();
});

clearTasksBtn.addEventListener('click', function () {
    tasks = [];
    updateTaskList();
});
// ... kode sebelumnya ...

function updateTaskList() {
    taskList.innerHTML = '';
    let remainingCount = 0;
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
                    <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                    <span>${task.text}</span>
                    <button class="delete-task" data-index="${index}">Hapus</button>
                `;
        taskList.appendChild(taskItem);
        if (!task.completed) {
            remainingCount++;
        }
    });

    remainingTasks.textContent = remainingCount;

    if (remainingCount === 0 && tasks.length > 0) {
        setTimeout(() => {
            alert('Selamat! Anda telah menyelesaikan semua tugas.');
        }, 1000);
    }
}
