const inputBox = document.getElementById("input-box")  
const listContainer = document.getElementById("untagged-list").querySelector("ul");  

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

// this will trigger the addTask() when you hit enter inside the inputBox 
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

// SAVE DATA 

function saveData(){ 
    localStorage.setItem("data", listContainer.innerHTML) 
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();