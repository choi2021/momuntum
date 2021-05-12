const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const pendingList = document.querySelector(".todo-lists__pending");
const finishedList = document.querySelector(".todo-lists__finished");

let FINISHEDTODOS = [];
let PENDINGTODOS = [];
const TODO_P_LS = "todo-pending";
const TODO_F_LS = "todo-finished";

function saveFinishedToDo() {
    localStorage.setItem(TODO_F_LS , JSON.stringify(FINISHEDTODOS));
}

function savePendingToDo() {
    localStorage.setItem(TODO_P_LS, JSON.stringify(PENDINGTODOS));
}

function onClickDelBtn(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;
    if (ul.id=="pending") {
        pendingList.removeChild(li);
        const filtered = PENDINGTODOS.filter(todo => parseInt(li.id) !== todo.id);
        PENDINGTODOS = filtered;
        savePendingToDo();
    } else {
        finishedList.removeChild(li);
        const filtered = FINISHEDTODOS.filter(todo => parseInt(li.id) !== todo.id);
        FINISHEDTODOS = filtered;
        saveFinishedToDo();
    }

}

function onClickFinishbtn(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.childNodes[0];
    const text = span.innerText;
    const id = li.id;
    li.removeChild(btn);
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    const todoObj = {
        id,
        text
    }
    FINISHEDTODOS.push(todoObj);
    const filteredPending = PENDINGTODOS.filter(todo => parseInt(li.id) !== todo.id);
    PENDINGTODOS = filteredPending;
    savePendingToDo();
    saveFinishedToDo();
}

function paintPendingTodo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delbtn = document.createElement("button");
    const finishBtn=document.createElement("button");
    const newId = PENDINGTODOS.length + 1;
    span.innerText = `${text}`;
    span.setAttribute("class", "todo-item");
    delbtn.innerText = `Delete`;
    delbtn.addEventListener("click", onClickDelBtn)
    finishBtn.innerText = `finish`;
    finishBtn.addEventListener("click", onClickFinishbtn)
    li.appendChild(span);
    li.appendChild(delbtn);
    li.appendChild(finishBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const todoObj = {
        id: newId,
        text: text
    }
    PENDINGTODOS.push(todoObj);
    savePendingToDo();
}

function paintFinishedTodo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delbtn = document.createElement("button");
    const newId = FINISHEDTODOS.length + 1;
    span.innerText = `${text}`;
    span.setAttribute("class", "todo-item");
    delbtn.innerText = `Delete`;
    delbtn.addEventListener("click", onClickDelBtn);
    li.appendChild(span);
    li.appendChild(delbtn);
    li.id = newId;
    finishedList.appendChild(li);
    const todoObj = {
        id: newId,
        text: text
    }
    FINISHEDTODOS.push(todoObj);
    saveFinishedToDo();
}

function onSubmitInput(event) {
    event.preventDefault();
    const value = todoInput.value;
    paintPendingTodo(value);
    todoInput.value = '';
}



const loadPendingTodo = localStorage.getItem(TODO_P_LS);
const loadFinishedTodo=localStorage.getItem(TODO_F_LS);
if (loadPendingTodo !== null || loadFinishedTodo!== null) {
    const parsedPendingTodo = JSON.parse(loadPendingTodo);
    const parsedFinishedTodo = JSON.parse(loadFinishedTodo);
    parsedPendingTodo.forEach(todo => paintPendingTodo(todo.text));
    parsedFinishedTodo.forEach(todo => paintFinishedTodo(todo.text));
}

todoForm.addEventListener("submit", onSubmitInput);
