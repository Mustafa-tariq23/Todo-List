window.onload = function (){ 
    let btn = document.getElementById("addTodo");
    btn.onclick = handleNewTodo;

    loadTodo();

    let clearAllBtn = document.getElementById("clearAll");
    clearAllBtn.onclick = clearAllTodos;
}

function handleNewTodo() {
    let newTodo = document.getElementById("newToDo").value;
    let todos = document.getElementById("todoList");

    if (newTodo.trim() === "") {
        alert("Please enter a todo before adding.");
        return;
    }

    let CheckBox = document.createElement("input");
    CheckBox.type = "checkbox";

    let todoText = document.createTextNode(newTodo);
    let newLi = document.createElement("li");

    newLi.appendChild(CheckBox);
    newLi.appendChild(todoText);

    let addDeleteButton = document.createElement("button");
    let Delete = document.createTextNode("Delete");

    addDeleteButton.appendChild(Delete);
    newLi.appendChild(addDeleteButton);
    addDeleteButton.onclick = deleteTodo;

    todos.appendChild(newLi);

    document.getElementById("newToDo").value = "";

    saveTodos();
}

function deleteTodo()
{
    let li = this.parentNode;
    li.parentNode.removeChild(li)

    saveTodos();
}

function clearAllTodos() {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = '';

    localStorage.removeItem("todo");

}

function saveTodos() {
    let todos = [];
    let todoList = document.getElementById('todoList').getElementsByTagName("li");

    for (let i = 0; i < todoList.length; i++) {
        let todoText = todoList[i].getElementsByTagName("input")[0].nextSibling.textContent;
        let isCompleted = todoList[i].getElementsByTagName("input")[0].checked;

        // Store each todo as an object with text and completion status
        todos.push({ text: todoText, completed: isCompleted });
    }

    localStorage.setItem("todo", JSON.stringify(todos));
}

function loadTodo() {
    let savedTodos = localStorage.getItem("todo");

    if (savedTodos) {
        let todos = JSON.parse(savedTodos);
        let todoList = document.getElementById("todoList");

        for (let i = 0; i < todos.length; i++) {
            let newLi = document.createElement("li");

            // Create a checkbox for task completion
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            // Adjust the 'checked' property based on completion status
            checkbox.checked = todos[i].completed;

            // Create a text node for the todo text
            let todoText = document.createTextNode(todos[i].text);

            // Append the checkbox, text node, and delete button to the li element
            newLi.appendChild(checkbox);
            newLi.appendChild(todoText);

            let addDeleteButton = document.createElement("button");
            let deleteText = document.createTextNode("Delete");
            addDeleteButton.appendChild(deleteText);
            addDeleteButton.onclick = deleteTodo;

            newLi.appendChild(addDeleteButton);
            todoList.appendChild(newLi);
        }
    }
}
