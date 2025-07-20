// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Task array to store all tasks
let tasks = [];
let currentFilter = 'all';

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

// Delete task function
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Create task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id})">
        <span class="task-text">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    
    return li;
}

// Filter tasks based on current filter
function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'uncompleted':
            return tasks.filter(task => !task.completed);
        default:
            return tasks;
    }
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        const li = document.createElement('li');
        li.style.textAlign = 'center';
        li.style.color = '#888';
        li.style.padding = '20px';
        li.textContent = 'No tasks found.';
        taskList.appendChild(li);
        return;
    }
    
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Set active filter
function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    renderTasks();
}

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        setActiveFilter(this.dataset.filter);
    });
});

// Initial render
renderTasks();