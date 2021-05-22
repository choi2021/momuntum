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

function getTodo(item) {
    if (item === 'pending') {
        pendingContainer.classList.add("todo-getanimation");
        setTimeout(() => {
            pendingContainer.classList.remove("todo-getanimation"); 
        }, 2000);
    } else if (item === 'finished') {
        finishedContainer.classList.add("todo-getanimation");
        setTimeout(() => {
            finishedContainer.classList.remove("todo-getanimation");
        }, 2000);
    }
}

function makeTodo(text, item) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    span.innerText = `${text}`;
    span.setAttribute("class", "todo__text");
    delBtn.setAttribute("class", "todo__delete-btn");
    delBtn.innerText = `❌`;
    if (item == 'pending') {
        const btns = document.createElement("div");
        const pendingId = PENDING.length + 1;
        delBtn.id = pendingId;
        const finishBtn = document.createElement("button");
        finishBtn.innerText = `👍`;
        finishBtn.setAttribute("class", "todo__finish-btn");
        finishBtn.id = pendingId;
        li.id = pendingId;
        li.setAttribute("class", "pending__list");
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
        console.log(loaded);
        if (loaded) {
            getTodo('pending');
        }
    }
    else if(item==='finished'){
        const finishedId = FINISHED.length + 1;
        delBtn.id = finishedId;
        li.id = finishedId;
        li.setAttribute("class","finished__list")
        li.appendChild(span);
        li.appendChild(delBtn);
        finishedList.appendChild(li);
        const finishedObj = {
            text,
            id: finishedId
        }
        FINISHED.push(finishedObj);
        saveTodo(FINISHED);
        if (loaded) {
            getTodo('finished');
        }
    }
}

function onSubmit(event) {
    event.preventDefault();
    loaded = true;
    const todo = todoInput.value;
    if (todo ==='') {
        return;
    }
    makeTodo(todo, "pending");
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
            const filtered = PENDING.filter(todo => {
                return todo.id != parseInt(list.id);
            });
            PENDING = filtered;
            saveTodo(PENDING);
        } else{
            const text = list.childNodes[0].innerText;
            makeTodo(text, 'finished');
            list.remove();
            const filtered = PENDING.filter(todo => {
                return todo.id != parseInt(list.id);
            });
            PENDING = filtered;
            saveTodo(PENDING);
            getTodo('finished');
        }
    }
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


const loadedPending = localStorage.getItem(PENDING_LS);
const loadedFinished = localStorage.getItem(FINSISHED_LS);
if (loadedPending !== null || loadedFinished !== null) {
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinished = JSON.parse(loadedFinished);
    parsedPending && parsedPending.forEach(todo => makeTodo(todo.text, 'pending', loaded));
    parsedFinished && parsedFinished.forEach(todo => makeTodo(todo.text, 'finished'));
}
todoForm.addEventListener("submit", onSubmit);
pendingList.addEventListener("click", onClickPendingBtn);
finishedList.addEventListener("click", onClickFinishedBtn);