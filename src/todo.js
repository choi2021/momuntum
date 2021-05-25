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
    }, 2000);
}

function getDelbtn() {
    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "todo__delete-btn");
    delBtn.innerText = `❌`;
    return delBtn;
}

function getFinishedBtn() {
    const finishBtn = document.createElement("button");
    finishBtn.innerText = `👍`;
    finishBtn.setAttribute("class", "todo__finish-btn");
    return finishBtn;
}

function getText(text) {
    const span = document.createElement("span");
    span.innerText = `${text}`;
    span.setAttribute("class", "todo__text");
    return span;
}

function getList(classname,span,btn){
    const li = document.createElement("li");
    li.setAttribute("class", classname);
    li.appendChild(span);
    li.appendChild(btn);
    return li;
}

function updateTodo(array,text,id) {
    const obj = {
        text,
        id: id
    }
    array.push(obj);
}

function makeTodo(text, item) {
    const span = getText(text);
    const delBtn = getDelbtn();
    if (item == 'pending') {
        const pendingId = PENDING.length + 1;
        delBtn.id = pendingId;
        const finishBtn = getFinishedBtn();
        finishBtn.id = pendingId;
        const btns = document.createElement("div");
        btns.appendChild(delBtn);
        btns.appendChild(finishBtn);
        const li = getList("pending__list",span,btns);
        li.id = pendingId;
        pendingList.appendChild(li);
        updateTodo(PENDING,text,pendingId)
        saveTodo(PENDING);
        console.log(loaded);
        if (loaded) {
            animationTodo('pending');
        }
    }
    else if (item === 'finished') {
        const finishedId = FINISHED.length + 1;
        delBtn.id = finishedId;
        const li=getList("finished__list",span,delBtn);
        li.id = finishedId;
        finishedList.appendChild(li);
        updateTodo(FINISHED, text, finishedId);
        saveTodo(FINISHED);
        if (loaded) {
            animationTodo('finished');
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
            animationTodo('finished');
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