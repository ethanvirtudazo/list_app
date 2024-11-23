/* Functionality: Add a new Task */ 
const form = document.getElementById("todo-form"); 
const input = document.getElementById("todo-input"); 
const allLanes = document.querySelectorAll(".swim-lane"); 

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];

    // Loop through each swim-lane and its tasks
    document.querySelectorAll('.swim-lane').forEach(lane => {
        lane.querySelectorAll('.task').forEach(task => {
            tasks.push({
                text: task.innerText.replace('×', '').trim(),
                lane: lane.id // Save the lane ID (e.g., 'general-lane', 'groceries-lane')
            }); 
        }); 
    }); 

    // Save the tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskData => {
        const task = createTaskElement(taskData.text);
        const lane = document.getElementById(taskData.lane);
        if (lane) {
            lane.appendChild(task);
        }
    });
}

// Create task element (to avoid repetition)
function createTaskElement(text) {
    const task = document.createElement("p");
    task.classList.add("task");
    task.setAttribute("draggable", "true");

    // Add task text inside the task, but ensure span is separate
    task.textContent = text;  // Use textContent to ensure the text is handled properly
    task.setAttribute("contenteditable", "true");

    // Create delete button for the task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";  
    span.setAttribute("contenteditable", "false");  // Make the span non-editable
    task.appendChild(span);

    // Drag start and end event listeners
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging"); // For styling
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging"); // Remove styling
        saveTasks(); // Save to localStorage after dragging
    });

    // Task delete event listener
    span.addEventListener("click", () => {
        task.remove();
        saveTasks(); // Update localStorage after removing a task
    });

    // Handle Enter key to save task edit
    task.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent creating a new line inside contenteditable
            task.blur(); // Remove focus from the task (trigger save)
            saveTasks(); // Save to localStorage after editing the task
        }
    });

    // Handle blur (when focus is lost) to save the task
    task.addEventListener("blur", () => {
        saveTasks(); // Save task to localStorage when the task loses focus
    });

    return task;
}


// Add task functionality
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload
    const value = input.value; 

    if (!value) return; // If no value, return

    const newTask = createTaskElement(value);

    // Default task is added to the "general-lane" (ToDo lane)
    const addLane = document.getElementById("general-lane");
    addLane.appendChild(newTask);

    input.value = ""; // Clear input

    saveTasks(); // Save updated tasks to localStorage
});

// Removing tasks
allLanes.forEach((lane) => {
    lane.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveTasks(); // Update localStorage after removing a task
        }
    });
});

// Drag-and-Drop functionality
function enableDragAndDrop() {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".swim-lane");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
            saveTasks(); // Save to localStorage after dragging
        });
    });

    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();

            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
                zone.appendChild(curTask);
            } else {
                zone.insertBefore(curTask, bottomTask);
            }

            saveTasks(); // Save updated tasks after drag
        });
    });
}

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};

// Load tasks and enable drag-and-drop when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    enableDragAndDrop(); // Enable drag-and-drop functionality for all tasks
});