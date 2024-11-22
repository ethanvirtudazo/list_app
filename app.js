// selecting the main containers
const inputBox = document.getElementById("input-box")  // the input box for adding tasks 
const listContainer = document.getElementById("untagged-list").querySelector("ul");  // the "Untagged" list container 

// variables for draggability feature
const draggables = document.querySelectorAll(".draggable") // selects draggable elements 
const containers = document.querySelectorAll(".list-column") // selects the list columns (Untagged, To-Do, & Groceries)

// ADD TASKS 
function addTask(){ 
    if (inputBox.value === ''){ 
        alert("No task entered.") 
    } 
    else {
        // creates a list item ("li") 
        let li = document.createElement("li");   
        li.innerHTML = inputBox.value; 
        li.setAttribute("draggable","true"); // this makes this list-item draggable 

        // adds that list item into the untagged list-container
        listContainer.appendChild(li);  
        let span = document.createElement("span");  // adds the "x" to the list-item
        span.innerHTML = "\u00d7";  
        li.appendChild(span);  
    } 
    inputBox.value = ""; 
    saveData(); 
}

// ADD TASKS via KEYBOARD 
inputBox.addEventListener("keydown", function(e) { 
    if (e.key === "Enter") { // Check if the "Enter" key was pressed 
        addTask(); // Trigger the addTask function 
    } 
}); 

// REMOVE TASKS 
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){ // checks if the element triggering the event is a list <li> element
        e.target.classList.toggle("checked"); // this adds the class "checked" to the list item
        saveData();
    }
    else if(e.target.tagName === "SPAN"){ // checks if the element being clicked is the "x" 
        e.target.parentElement.remove();  //→ if it is, it removes the parent Element (list-item) 
        saveData();
    }
}, false); 


// DRAG-AND-DROP 
// Adds EventListeners to the list-columns  
containers.forEach(container => {
    // adds "dragging" class to any element with the attribute draggable when dragging  
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
        e.preventDefault(); 
        // Check if the target is a draggable element 
        if (e.target && e.target.hasAttribute("draggable")) { 
            const draggable = document.querySelector(".dragging") // selects the element which has the "dragging" class 
            // working code: 
            e.target.parentNode.insertBefore(draggable, e.target.nextSibling);  // Insert after the current item 
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
