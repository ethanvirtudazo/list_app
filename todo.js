/*
Functionality: Add a new Task
*/

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // no screen reload
    const value = input.value; 

    if (!value) return; 

    const newTask = document.createElement("p");
    newTask.classList.add("task"); 
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;
    
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging"); // this is for styling 
    });
    
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging"); // this is for styling 
    });
todoLane.appendChild(newTask);

input.value = "";
});
