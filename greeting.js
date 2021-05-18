'use strict';

const greetingContainer = document.querySelector(".greeting-Container");
const greetingForm = document.querySelector(".greeting-form");
const greetingInput = greetingForm.querySelector("input");
const greetingText = document.querySelector(".greeting-text");
const nameText = document.querySelector(".name-text");

const USER_LS = "user";

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function shrinkName() {
    greetingText.classList.add("greeting-shrinkText")
}

function moveName() {
    greetingContainer.classList.add("greeting-animationMove");
}

function setName(name) {
    setTimeout(() => {
        greetingContainer.remove();
        nameText.innerText = `Welcome ${name}`;
    }, 5000);
}

function showName(name) {
    greetingForm.classList.add("greeting-cover");
    greetingText.classList.remove("greeting-cover");
    greetingText.innerText = `Welcome ${name}`;
    shrinkName();
    moveName();
    setName(name);
}

function onSubmit(event) {
    event.preventDefault();
    const name = greetingInput.value;
    showName(name);
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





