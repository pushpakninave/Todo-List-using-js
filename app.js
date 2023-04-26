// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    /* 
    since the todoButton has type submit it submits and refreshes the browser,
     to prevent this we have added the preventDefault method
    */
    event.preventDefault();
    //create todoDiv element inside todo list container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li element todo div
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // Add todo to localstorage. 
    if(todoInput.value!=""){
        saveLocalTodos(todoInput.value);
    }
    // check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"><i/>';
    completedButton.classList.add('complete-btn');

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"><i/>';
    trashButton.classList.add('trash-btn');

    // appending list, trash, completebutton to the todoDiv
    /*
    <div class="todo">
        <li></li>
        <button>Trash</button>
        <button>Checked</button>
    </div>
    */
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    // finally append todo-div to todo-List.
    /**
     <ul class="todo-list">
        ...    
     </ul>
     */
    if (todoInput.value != "") {
        todoList.append(todoDiv);
    }

    todoInput.value = "";
}

function deleteCheck(event) {
    // capture the target on which the click event occur
    const item = event.target;

    if (item.classList[0] === "trash-btn") {
        // instead of item we want to delete the whole todo div.
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }
    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

// filter
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none";
                }
                break;
            case "pending":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            default:
                break;
        }
    });
}

//save to local storage.
function saveLocalTodos(todo) {
    let todos;
    // check if storage contains todo
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    // if yes parse local storage to the todos array.
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // push the recently made todo to the already existing todos array.
    todos.push(todo);
    // set it back into the local storage.
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    // check if storage contains todo
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    // if yes parse local storage to the todos array.
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        console.log(todos);
    }
    todos.forEach(function (todo) {
        // create todoDiv element inside todo list container
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li element todo div
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        console.log(newTodo.innerText);
        newTodo.classList.add("todo-item");

        // check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"><i/>';
        completedButton.classList.add('complete-btn');

        // trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"><i/>';
        trashButton.classList.add('trash-btn');

        // appending list, trash, completebutton to the todoDiv
        /*
        <div class="todo">
            <li></li>
            <button>Trash</button>
            <button>Checked</button>
        </div>
        */

        todoDiv.appendChild(newTodo);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);

        // finally append todo-div to todo-List.
        /**
         <ul class="todo-list">
            ...    
         </ul>
         */
            todoList.append(todoDiv);
    })
}
function removeLocalTodos(todo) {
    let todos;
    // check if storage contains todo
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    // if yes parse local storage to the todos array.
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.childNodes[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    // console.log(todos.indexOf("pushpak"));
    localStorage.setItem("todos", JSON.stringify(todos));
}