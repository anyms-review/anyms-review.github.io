// problem: user interaction doesn't provide desire result
// solution: add interactivity so the user can mange daily task.

var taskInput = document.getElementById('new-task'),  // new task
    addButton = document.getElementsByTagName('button')[0],     //first button
    incompleteTasksHolder = document.getElementById('incomplete-tasks'),   // incomplete-tasks
    completedTasksHolder = document.getElementById('completed-tasks');    // completed-tasks

// new task list item
var createTaskElement = function(taskString) {
    // create list item
    var listItem = document.createElement('li');
    // create (checkbox)
    var checkBox = document.createElement('input'); // checkbox
    checkBox.setAttribute('type', 'checkbox');
    // label
    var label = document.createElement('label');
    label.innerHTML = taskString;
    // input (text)
    var editInput = document.createElement('input'); // text
    editInput.setAttribute('type', 'text');
    // button.edit
    var editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    editButton.setAttribute('class', 'edit');
    // button.delete
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute('class', 'delete');


    // each elements, will need to be modifying

    // each elements, need to be appending

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

// add a new task
var addTask = function() {
    console.log('Add task...');
    // create a new list item with the text from #new-task
    var listItem = createTaskElement(taskInput.value);

    // append the list item to incomplete task holder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
};


// edit an existing task
var editTask = function() {
    console.log('Edit task...');
    var listItem = this.parentNode;
    var input = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector('label');
        // if the class of the parent has the class .editMode
    if(listItem.className != 'editMode') {
        // switch to .editMode
        listItem.classList.add('editMode');
        // label text become the (input) value
        input.value = label.innerHTML;
        this.innerHTML = "Save";
        input.focus();
    }else { // else
        // switch from .editMode
        listItem.classList.remove('editMode');
        // (input) value become the label text
        label.innerHTML = input.value;
        this.innerHTML = "Edit";
    }

    // toggle .editMode on the parent
};

// delete an existing task
var deleteTask = function() {
    console.log('Delete task...');

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // remove the parent (list) item from the (ul)
    ul.removeChild(listItem);
};

// mark a task as complete
var taskCompleted = function() {
    console.log('Task complete...');
    // append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplte)
};

// mark a task as incomplete
var taskIncomplte = function() {
    console.log('Task incomplete...');
    // append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

function bindTaskEvents(taskListItems, checkBoxEventHandler) {
    console.log("Binding...");
    // select taskListItem's children
    var checkBox  = taskListItems.querySelector('input[type=checkbox]');
    var editButton = taskListItems.querySelector('button.edit');
    var deleteButton = taskListItems.querySelector('button.delete');

    // bind (editTask) to edit button
    editButton.onclick = editTask;
    // bind (deleteTask) to delete button
    deleteButton.onclick = deleteTask;
    // bind (checkBoxEventHandler) to checkbox
    checkBox.onchange = checkBoxEventHandler;
}



// set event listeners
addButton.addEventListener('click', addTask, false);


// cycle over (incompleteTasksHolder) ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}


// cycle over (completedTasksHolder) ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplte);
}


