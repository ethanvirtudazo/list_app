/*
Functionality: Add a new Task
*/

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const addLane = document.getElementById("general-lane");
const allLanes = document.querySelectorAll(".swim-lane");


        // ADDING TASKS

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
addLane.appendChild(newTask);

input.value = "";
});

        // REMOVING TASKS
allLanes.forEach((lane) => {
    lane.addEventListener("click" , (e) => {
        e.preventDefault();

        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
    })
})        
