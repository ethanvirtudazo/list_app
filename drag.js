/* 
Functionality: Drag-and-Drop

1. Using HTML Drag-and-Drop API   
2. Add EventListeners to the <task> and the <lanes> 
3. Place logic to place the dragged <task> in the right place 
- track the mouse's position 
*/ 

const draggables = document.querySelectorAll(".task")
const droppables = document.querySelectorAll(".swim-lane")

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging"); // this is for styling 
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging"); // this is for styling 
    });
});

droppables.forEach((zone) => { // zone is the swim-lane that the list item is being "dragged over"
    zone.addEventListener("dragover", (e) => {
        e.preventDefault(); 

        const bottomTask = insertAboveTask(zone, e.clientY); 
        const curTask = document.querySelector(".is-dragging"); 

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }

    });
});

const insertAboveTask = (zone, mouseY) => { 
    const els = zone.querySelectorAll(".task:not(.is-dragging)");  
    let closestTask = null; 
    let closestOffset = Number.NEGATIVE_INFINITY; 

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect(); 

        const offset = mouseY - top;

        if(offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};