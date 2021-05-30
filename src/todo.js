'use strict';

const pendingContainer = document.querySelector(".pending-lists");
const finishedContainer = document.querySelector(".finished-lists");
const pendingList = document.querySelector(".todo-lists__pending");
const finishedList = document.querySelector(".todo-lists__finished");

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const PENDING_LS = "pending";
const FINSISHED_LS = "finished";

let PENDING = [];
let FINISHED = [];
let loaded = false;

function saveTodo(kind) {
    if (kind === PENDING) {
        localStorage.setItem(PENDING_LS,JSON.stringify(kind))
    } else {
        localStorage.setItem(FINSISHED_LS,JSON.stringify(kind))
    }
}

function animationTodo(item) {
    if (item === 'pending') {
        putAnimation(pendingContainer);
    } else if (item === 'finished') {
        putAnimation(finishedContainer);
    }
}

function putAnimation(container) {
    container.classList.add("todo-getanimation");
    setTimeout(() => {
        container.classList.remove("todo-getanimation"); 
    }, 1000);
}

function updateTodo(array,text,id) {
    const obj = {
        text:text,
        id: id
    }
    array.push(obj);
}

function updatePending(text) {
    const pendingId = PENDING.length + 1;
    const li = document.createElement("li");
    li.setAttribute("class", "pending__list");
    li.id = pendingId;
    li.innerHTML =`
    <span class="todo__text">${text}</span>
    <div>
        <button class="todo__delete-btn" id="${pendingId}">❌</button>
        <button class="todo__finish-btn" id="${pendingId}">👍</button>
    </div>`
    pendingList.appendChild(li);
    updateTodo(PENDING,text,pendingId)
    saveTodo(PENDING);
    if (loaded) {
        animationTodo('pending');
    }
    addScrollView(pendingList);
}

function updateFinished(text) {
    const finishedId = FINISHED.length + 1;
    const li = document.createElement("li");
    li.setAttribute("class", "finished__list");
    li.id = finishedId;
    li.innerHTML =`
    <span class="todo__text">${text}</span>
    <div>
        <button class="todo__delete-btn" id="${finishedId}">❌</button>
    </div>`
    finishedList.appendChild(li);
    updateTodo(FINISHED,text,finishedId)
    saveTodo(FINISHED);
    if (loaded) {
        animationTodo('finished');
    }
    addScrollView(pendingList);
}

function onSubmit(event) {
    event.preventDefault();
    loaded = true;
    const todo = todoInput.value;
    if (todo ==='') {
        return;
    }
    updatePending(todo);
    todoInput.value = '';
}

function onClickPendingBtn(event) {
    const id = event.target.id;
    const list = pendingList.querySelector(`.pending__list[id="${id}"]`);
    if (!id) {
        return;
    } else {
        if (event.target.matches(".todo__delete-btn")) {
            list.remove();
            pendingUpdate(parseInt(list.id));
        } else{
            const text = list.querySelector(".todo__text").innerText;
            updateFinished(text);
            list.remove();
            pendingUpdate(parseInt(list.id));
            animationTodo('finished');
            addScrollView(finishedList);
        }
    }
}

function pendingUpdate(num) {
    const filtered = PENDING.filter(todo => {
        return todo.id != num;
    });
    PENDING = filtered;
    saveTodo(PENDING);
}

function onClickFinishedBtn(event) {
    const id = event.target.id;
    if (!id) {
        return;
    } else {
        const list = finishedList.querySelector(`.finished__list[id="${id}"]`);
        list.remove();
        const filtered = FINISHED.filter(todo => {
            return todo.id != parseInt(list.id);
        });
        FINISHED = filtered;
        saveTodo(FINISHED);
    }
}

function addScrollView(list) {
    list.scrollIntoView();
}


const loadedPending = localStorage.getItem(PENDING_LS);
const loadedFinished = localStorage.getItem(FINSISHED_LS);
if (loadedPending !== null || loadedFinished !== null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinished = JSON.parse(loadedFinished);
    parsedPending && parsedPending.forEach(todo => updatePending(todo.text));
    parsedFinished && parsedFinished.forEach(todo => updateFinished(todo.text));
}
todoForm.addEventListener("submit", onSubmit);
pendingList.addEventListener("click", onClickPendingBtn);
finishedList.addEventListener("click", onClickFinishedBtn);