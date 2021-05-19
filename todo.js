'use strict';

const pendingList = document.querySelector(".todo-lists__pending");
const finishedList = document.querySelector(".todo-lists__finished");

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const PENDING_LS = "pending";
const FINSISHED_LS = "finished";

let PENDING = [];
let FINISHED = [];

function saveTodo(kind) {
    if (kind === PENDING) {
        localStorage.setItem(PENDING_LS,JSON.stringify(kind))
    } else {
        localStorage.setItem(FINSISHED_LS,JSON.stringify(kind))
    }
}

function getPending(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const btns = document.createElement("div");
    const pendingId = PENDING.length + 1;
    span.innerText = `${text}`;
    span.setAttribute("class", "todo__text");
    delBtn.setAttribute("class", "todo__text");
    delBtn.innerText = `❌`;
    delBtn.setAttribute("class", "todo__delete-btn");
    finishBtn.innerText = `👍`;
    finishBtn.setAttribute("class", "todo__finish-btn");
    li.id = pendingId;
    li.setAttribute("class", "todo__list");
    btns.appendChild(delBtn);
    btns.appendChild(finishBtn);
    li.appendChild(span);
    li.appendChild(btns);
    pendingList.appendChild(li);
    const pendingObj = {
        text,
        id: pendingId
    }
    PENDING.push(pendingObj);
    saveTodo(PENDING);
}

function getFinished(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const finishedId = FINISHED.length + 1;
    span.innerText = `${text}`;
    span.setAttribute("class", "todo__text");
    delBtn.innerText = `❌`;
    delBtn.setAttribute("class", "todo__delete-btn");
    li.id = finishedId;
    li.setAttribute("class","todo__list")
    li.appendChild(span);
    li.appendChild(delBtn);
    finishedList.appendChild(li);
    const finishedObj = {
        text,
        id: finishedId
    }
    FINISHED.push(finishedObj);
    saveTodo(FINISHED);
}

function onSubmit(event) {
    event.preventDefault();
    const todo = todoInput.value;
    getPending(todo);
    todoInput.value = '';
}

function onClickPendingBtn(event) {
    const target = event.target;
    if (!target.matches(".todo__delete-btn") && !target.matches(".todo__finish-btn")) {
        return;
    }
    const list = event.target.parentNode;
    if (target.matches(".todo__delete-btn")) {
        list.remove();
        const filtered = PENDING.filter(todo => {
            return todo.id != parseInt(list.id);
        });
        PENDING = filtered;
        saveTodo(PENDING);
    } else {
        const text = list.childNodes[0].innerText;
        getFinished(text);
        list.remove();
        const filtered = PENDING.filter(todo => {
            return todo.id != parseInt(list.id);
        });
        PENDING = filtered;
        saveTodo(PENDING);
    }
}

function onClickFinishedBtn(event) {
    const target = event.target;
    if (!target.matches(".todo__delete-btn")) {
        return;
    }
    const list = event.target.parentNode;
    if (target.matches(".todo__delete-btn")) {
        list.remove();
        const filtered = FINISHED.filter(todo => {
            return todo.id != parseInt(list.id);
        });
        FINISHED = filtered;
        saveTodo(FINISHED);
    };
}

const loadedPending = localStorage.getItem(PENDING_LS);
const loadedFinished = localStorage.getItem(FINSISHED_LS);
if (loadedPending !== null || loadedFinished !== null ) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinished = JSON.parse(loadedFinished);
    parsedPending&&parsedPending.forEach(todo => getPending(todo.text));
    parsedFinished&&parsedFinished.forEach(todo => getFinished(todo.text));
}
todoForm.addEventListener("submit", onSubmit);
pendingList.addEventListener("click", onClickPendingBtn);
finishedList.addEventListener("click", onClickFinishedBtn);