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

render(todos)


submitTodo.addEventListener("click", addTodos);
searchField.addEventListener("keyup", searchTodos)
inputTodo.addEventListener("keyup", disableBtn)

function createElementTodo(todo) {
    const { value, id, complited } = todo;
    var newDiv = document.createElement("li");
    let circleDiv = document.createElement("div");
    let newNote = document.createElement("h3");
    let tick = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete")
    tick.classList.add("tick")

    deleteBtn.onclick = () => deleteTodo(id);
    newDiv.classList.add("new-note");
    circleDiv.classList.add("circle");
    if (complited) circleDiv.classList.add("circle-bg");
    circleDiv.onclick = () => checkTodo(id);
    newNote.classList.add("new-note-content");

    newNote.textContent = value;
    circleDiv.appendChild(tick)
    newDiv.appendChild(circleDiv);
    newDiv.appendChild(newNote);
    newDiv.appendChild(deleteBtn)
    todosField.insertBefore(newDiv, todosField.firstElementChild);
}

function disableBtn() {
    submitTodo.disabled = inputTodo.value === "";
}

function render(todoss) {
    todosField.innerHTML = "";
    todoss.forEach(todo => {
        createElementTodo(todo)
    });
    inputTodo.value = "";
}

function addTodos() {
    let todoValue = inputTodo.value;
    todos.push({ value: todoValue, complited: false, id: Date.now() });
    localStorage.setItem("todos", JSON.stringify(todos));

    render(todos)
    searchTodos()
    disableBtn()
}

function checkTodo(id) {
    todos.forEach((todo, index, todos) => {
        if (todo.id === id) {
            todos[index].complited = !todos[index].complited;
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
    render(todos);
}

function deleteTodo(todoId) {

    if (confirm("are you sure??")) {
        removeTodos(todoId)
        render(todos)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}

function removeTodos(todoId) {
    return todos = todos.filter(item => {
        return item.id !== todoId;
    })
}

function searchTodos() {
    let todo = searchField.value.toLowerCase();
    let result = todos.filter(word => word.value.toLowerCase().includes(todo));
    render(result)
}