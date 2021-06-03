'use strict';

const nameForm = document.querySelector(".header__name-form");
const nameInput = document.querySelector(".header__name-input");
const nameContainer = document.querySelector(".header__name");
console.log(name);
const USER_LS = "user";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function onSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    showName(currentValue);
    saveName(currentValue);
    nameForm.classList.add("name-hide");
    nameInput.value = '';
}

function showName(text) {
    nameContainer.classList.remove("name-hide");
    nameContainer.innerText = `Welcome ${text}`;
}

const userName = localStorage.getItem(USER_LS);
if (userName===null) {
    nameForm.classList.remove("name-hide");
    nameForm.addEventListener("submit",onSubmit)
} else {
    showName(userName);
}



