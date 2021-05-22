'use strict';

const greetingContainer = document.querySelector(".greeting-Container");
const greetingForm = document.querySelector(".greeting-form");
const greetingInput = greetingForm.querySelector("input");
const greetingText = document.querySelector(".greeting-text");
const nameText = document.querySelector(".name-text");
const nameContainer = document.querySelector(".name-container");

const USER_LS = "user";

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function sendName() {
    greetingText.style.animation = `sendName 5s ease forwards`;
}

function getName() {
    nameContainer.style.animation = `getName 2s ease forwards`;
}

function setName(name) {
    setTimeout(() => {
        greetingContainer.remove();
        nameText.innerText = `Welcome ${name}`;
        getName();
    }, 5000);
}

function showName(name) {
    greetingForm.classList.add("greeting-cover");
    greetingText.classList.remove("greeting-cover");
    greetingText.innerText = `Welcome ${name}`;
    setName(name);
}

function onSubmit(event) {
    event.preventDefault();
    const name = greetingInput.value;
    showName(name);
    sendName();
    saveName(name);
    greetingInput.value = '';
}
const loadedName = localStorage.getItem(USER_LS);

if (loadedName === null) {
    greetingText.classList.add("greeting-cover");
    greetingForm.addEventListener("submit", onSubmit)
} else {
    nameText.innerText = `Welcome ${loadedName}`;
    greetingContainer.remove();
}





