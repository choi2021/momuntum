const pendingBtn = document.querySelector(".pending-btn");
const finishedBtn = document.querySelector(".finished-btn");
const pendingContainer=document.querySelector(".pending-container")
const finishedContainer=document.querySelector(".finished-container")

const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const pendingList = document.querySelector(".pending-list");
const finishedList = document.querySelector(".finished-list");

const PENDING_LS = "pending";
const FINISHED_LS = "finished"
let PENDING_TODOS = [];
let FINISHED_TODOS = [];
let clickedPending = false;
let clickedFinsihed = false;

function onClickPendingBtn() {
    if (!clickedPending) {
        showPending();
        clickedPending = true;
    } else {
        hidePending();
        clickedPending = false;
    }
}

function onClickFinishedBtn() {
    if (!clickedFinsihed) {
        showFinished();
        clickedFinsihed = true;
    } else {
        hideFinished();
        clickedFinsihed = false;
    }
}

function showPending() {
    pendingContainer.style.opacity = `1`;
}

function hidePending() {
    pendingContainer.style.opacity = `0`;
}

function showFinished() {
    finishedContainer.style.opacity = `1`;
}

function hideFinished() {
    finishedContainer.style.opacity = `0`;
}

function onSubmit(event) {
    event.preventDefault();
    const currentTodo = todoInput.value;
    showPendingTodo(currentTodo);
    todoInput.value = '';
}

function showPendingTodo(text) {
    const id = PENDING_TODOS.length+1;
    const todo = makePendingTodo(text,id);
    todo.setAttribute("class", "todo-item pending-item");
    todo.id = id;
    pendingList.appendChild(todo);
    const todoObj = {
        id,
        text,
    }
    PENDING_TODOS.push(todoObj);
    savePendingTodo(todoObj);
}

function showFinishedTodo(text) {
    const id = FINISHED_TODOS.length+1;
    const todo = makeFinishedTodo(text,id);
    todo.setAttribute("class", "todo-item finished-item");
    todo.id = id;
    finishedList.appendChild(todo);
    const todoObj = {
        id,
        text,
    }
    FINISHED_TODOS.push(todoObj);
    saveFinishedTodo(todoObj);
}

function makePendingTodo(text,id) {
    const li = document.createElement("li");
    li.innerHTML =
        `<span class="todo-text">${text}</span>
        <div class="todo-btns">
            <button class="todo-list-btn todo-del-btn" data-item="delete" data-id="${id}">x</button>
            <button class="todo-list-btn todo-finished-btn"><i class="far fa-thumbs-up todo-finished-btn" data-item="finished" data-id="${id}"></i></button>
        </div>`
    return li;
}

function makeFinishedTodo(text,id) {
    const li = document.createElement("li");
    li.innerHTML =
        `<span class="todo-text">${text}</span>
        <div class="todo-btns">
            <button class="todo-list-btn todo-back-btn"><i class="fas fa-arrow-left" data-item="back" data-id="${id}"></i></button>
            <button class="todo-list-btn todo-del-btn" data-item="delete" data-id="${id}">x</button>
        </div>`
    return li;
}

function savePendingTodo() {
    localStorage.setItem(PENDING_LS, JSON.stringify(PENDING_TODOS));
}

function saveFinishedTodo() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED_TODOS));
}

function onClickPending(event) {
    const target = event.target;
    const dataset = target.dataset;
    const item = dataset.item;
    const id = dataset.id;
    if (item === undefined) {
        return;
    } else if (item==="delete") {
        const li = document.querySelector(`.pending-item[id="${id}"]`);
        const filterd = PENDING_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        console.log(filterd);
        PENDING_TODOS = filterd;
        savePendingTodo();
        li.remove();
    } else {
        const li = document.querySelector(`.pending-item[id="${id}"]`);
        const text = document.querySelector(`.pending-item[id="${id}"] span`).innerText;
        showFinishedTodo(text)
        const filterd = PENDING_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        PENDING_TODOS = filterd;
        savePendingTodo();
        li.remove();
    }
}

function onClickFinished(event) {
    const target = event.target;
    const dataset = target.dataset;
    const item = dataset.item;
    const id = dataset.id;
    console.log(item);
    if (item === undefined) {
        return;
    } else if (item==="delete") {
        const li = document.querySelector(`.finished-item[id="${id}"]`);
        const filterd = FINISHED_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        console.log(filterd);
        FINISHED_TODOS = filterd;
        saveFinishedTodo();
        li.remove();
    } else {
        const li = document.querySelector(`.finished-item[id="${id}"]`);
        const text = document.querySelector(`.finished-item[id="${id}"] span`).innerText;
        console.log(text);
        showPendingTodo(text)
        const filterd = FINISHED_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        FINISHED_TODOS = filterd;
        saveFinishedTodo();
        li.remove();
    }
}

pendingBtn.addEventListener("click", onClickPendingBtn);
finishedBtn.addEventListener("click", onClickFinishedBtn);
const loadedPending = localStorage.getItem(PENDING_LS);
const loadedFinished=localStorage.getItem(FINISHED_LS);
if (loadedPending !== null||loadedFinished!==null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinished = JSON.parse(loadedFinished);
    parsedPending&&parsedPending.forEach(todo => showPendingTodo(todo.text))
    parsedFinished&&parsedFinished.forEach(todo => showFinishedTodo(todo.text))
};
todoForm.addEventListener("submit", onSubmit);
pendingList.addEventListener("click", onClickPending);
finishedList.addEventListener("click",onClickFinished)

