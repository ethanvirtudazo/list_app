// selecting the main containers
const inputBox = document.getElementById("input-box")  
const listContainer = document.getElementById("untagged-list").querySelector("ul");  

// variables for draggability feature
const draggables = document.querySelectorAll(".draggable") // selects draggable elements 
const containers = document.querySelectorAll(".list-column") // selects the list columns (Untagged, To-Do, & Groceries)

// ADD TASKS

function addTask(){
    if (inputBox.value === ''){
        alert("No task entered.")
    } 
    else {
        let li = document.createElement("li");  
        li.innerHTML = inputBox.value;  
        li.setAttribute("draggable","true"); // this makes this list item draggable

    
        listContainer.appendChild(li);  
        let span = document.createElement("span");  
        span.innerHTML = "\u00d7";  
        li.appendChild(span);  
    } 
    inputBox.value = ""; 
    saveData(); 
    
}

// Add Task via Keyboard 

inputBox.addEventListener("keydown", function(e) { 
    if (e.key === "Enter") { // Check if the "Enter" key was pressed 
        addTask(); // Trigger the addTask function 
    } 
}); 


// REMOVE TASKS 
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // this adds the class "checked" to the list item
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false); 


// DRAG-AND-DROP 

containers.forEach(container => {
    // adds "dragging" class → when dragging
    container.addEventListener("dragstart", (e) => {
        // Check if the target is a draggable element
        if (e.target && e.target.hasAttribute("draggable")) {
            console.log("We are dragging:", e.target);
            e.target.classList.add("dragging");
        }
    });
    // removes "dragging" class → when no longer dragging
    container.addEventListener("dragend", (e) => {
        // Check if the target is a draggable element
        if (e.target && e.target.hasAttribute("draggable")) {
            e.target.classList.remove("dragging");
        }
    });

    //
    container.addEventListener("dragover", (e) => {
        // Check if the target is a draggable element
        if (e.target && e.target.hasAttribute("draggable")) {
            const draggable = document.querySelector(".dragging") // selects the element which has the "dragging" class
            // container.appendChild(draggable);
            console.log("we are dragging over");
        }
    });
});


// SAVE DATA 

function saveData(){ 
    localStorage.setItem("data", listContainer.innerHTML) 
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
