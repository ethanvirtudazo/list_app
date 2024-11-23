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
    newTask.innerText = value;
    newTask.classList.add("task"); 
    newTask.setAttribute("draggable", "true"); 

    // deleting tasks 
    let span = document.createElement("span");  
    span.innerHTML = "\u00d7";  
    newTask.appendChild(span); 
    
    
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging"); // this is for styling 
    });
    
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging"); // this is for styling 
    });
todoLane.appendChild(newTask);

input.value = "";
});
