const submitTodo = document.querySelector("#submit-todo");
const todosField = document.querySelector("#todos-field")
const searchField = document.querySelector("#search")
const inputTodo = document.querySelector("#todo")
const divDate = document.querySelector(".date")

SetUpDate()


function SetUpDate() {
    let date = new Date();
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear() + "";
    let yearLastTwoDigit = year.slice(2);
    day = day < 10 ? "0" + day : day;
    divDate.textContent = day + "Th" + " " + month + "," + " " + yearLastTwoDigit;

}


let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

rander(todos)


submitTodo.addEventListener("click", addTodos);
searchField.addEventListener("keyup", searchFilter)
inputTodo.addEventListener("keyup", disableBtn)

function createElementTodo(todo) {

    var newDiv = document.createElement("li");
    let circleDiv = document.createElement("div");
    let newNote = document.createElement("h3");
    let tick = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete")
    tick.classList.add("tick")

    deleteBtn.onclick = deleteTodo;
    newDiv.classList.add("new-note");
    circleDiv.classList.add("circle");
    circleDiv.onclick = checkTodo;
    newNote.classList.add("new-note-content");

    newNote.textContent = todo;
    circleDiv.appendChild(tick)
    newDiv.appendChild(circleDiv);
    newDiv.appendChild(newNote);
    newDiv.appendChild(deleteBtn)
    todosField.insertBefore(newDiv, todosField.firstElementChild);
}

function disableBtn() {
    submitTodo.disabled = inputTodo.value === "";
}

function rander(todoss) {
    todosField.innerHTML = "";
    todoss.forEach(todo => {
        createElementTodo(todo.value)
    });
    inputTodo.value = "";
}

function addTodos() {
    let todo = inputTodo.value;
    todos.push({ value: todo, id: Date.now() });
    localStorage.setItem("todos", JSON.stringify(todos));

    if (todos) {
        rander(todos)
    }
    searchFilter()
}

function checkTodo(e) {
    e.target.classList.toggle("circle-bg")
    e.target.firstElementChild.classList.toggle("show")
    e.target.parentNode.lastElementChild.classList.toggle("show")
}

function deleteTodo(e) {
    let todo = e.target.previousElementSibling.textContent;

    if (confirm("are you sure??")) {
        removeTodos(todo)
        rander(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}

function removeTodos(todo) {

    return todos = todos.filter(item => {
        return item.value != todo;
    })

}

function searchFilter() {

    let todo = searchField.value.toLowerCase();
    let result = todos.filter(word => word.value.toLowerCase().includes(todo));
    rander(result)
}