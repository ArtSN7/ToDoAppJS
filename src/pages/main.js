// Store DOM elements
const elements = {
    form: document.getElementById('task_input'),
    taskInput: document.getElementById('task'),
    dateInput: document.getElementById('due-date'),
    timeInput: document.getElementById('due-time'),
    priorityInput: document.getElementById('priority'),
    taskList: document.getElementById('task-list')
};

// Initialize the app
function initializeApp() {
    elements.form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewTask();
    });

    // Load tasks from localStorage
    loadTasks();
    loadProperties();
}

function loadProperties() {
    const username = JSON.parse(localStorage.getItem('users'))[0].username;
    const date = new Date().toLocaleDateString();
    const task_count = JSON.parse(localStorage.getItem('tasks')).length;
    document.getElementById('username').textContent = `Name: ${username}`;
    document.getElementById('date').textContent = `Date: ${date}`;
    document.getElementById('task_count').textContent = `Tasks: ${task_count}`;
}

function addNewTask() {
    const taskText = elements.taskInput.value.trim();
    const taskDate = elements.dateInput.value;
    const taskTime = elements.timeInput.value;
    const taskPriority = elements.priorityInput.value;

    if (!validateTask(taskText, taskDate)) return;

    const taskItem = createTaskElement(taskText, taskDate, taskTime, taskPriority);
    elements.taskList.appendChild(taskItem);

    // Save to localStorage
    saveTask(taskText, taskDate, taskTime, taskPriority);

    // Reset form
    elements.form.reset();

}

function validateTask(taskText, taskDate) {
    if (taskText === '' || taskDate === '') {
        showError('Please enter both a task and a date!');
        return false;
    }
    return true;
}

function createTaskElement(taskText, taskDate, taskTime, taskPriority) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const formattedDate = new Date(taskDate).toLocaleDateString();

    if (taskPriority === '1') {
        taskPriority = '!';
    } else if (taskPriority === '2') {
        taskPriority = '!!';
    } else if (taskPriority === '3') {
        taskPriority = '!!!';
    }

    taskItem.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox">
            <div class="task-text">
                <strong>${taskText}</strong>
                <div class="task-date">Due: ${formattedDate}</div>
                <div class="task-time">Time: ${taskTime}</div>
                <div class="task-priority">${taskPriority}</div>
            </div>
        </div>
        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Add event listeners
    const checkbox = taskItem.querySelector('.task-checkbox');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const editBtn = taskItem.querySelector('.edit-btn');

    checkbox.addEventListener('change', () => toggleTaskComplete(taskItem));
    deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    editBtn.addEventListener('click', () => editTask(taskItem));

    return taskItem;
}

function toggleTaskComplete(taskItem) {
    const taskText = taskItem.querySelector('.task-text');
    taskText.classList.toggle('completed');
    saveTasks();
}


function deleteTask(taskItem) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskItem.remove();
        saveTasks();
    }
}

function editTask(taskItem) {
    const taskTextElement = taskItem.querySelector('strong');
    const currentText = taskTextElement.textContent;
    const newText = prompt('Edit task:', currentText);
    
    if (newText && newText.trim() !== '') {
        taskTextElement.textContent = newText.trim();
        saveTasks();
    }
}

function showError(message) {
    alert(message); // You could replace this with a more elegant error display
}

// localStorage functions
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('strong').textContent,
            date: item.querySelector('.task-date').textContent.replace('Due: ', ''),
            completed: item.querySelector('.task-text').classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadProperties();
}

function saveTask(taskText, taskDate, taskTime, taskPriority) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({
        text: taskText,
        date: taskDate,
        time: taskTime,
        priority: taskPriority,
        completed: false
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.date, task.time, task.priority);
        if (task.completed) {
            taskItem.querySelector('.task-text').classList.add('completed');
            taskItem.querySelector('.task-checkbox').checked = true;
        }
        elements.taskList.appendChild(taskItem);
    });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);