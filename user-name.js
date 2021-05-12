const greetingForm = document.querySelector(".greeting-form");
const greetingInput = greetingForm.querySelector("input");
const greetingText = document.querySelector(".greeting-text");

const USER_LS = "user";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function showName(text) {
    const date = new Date();
    const hours = date.getHours();
    greetingForm.classList.remove("greeting-showing");
    greetingText.classList.add("greeting-showing");
    
    if (18 <= hours || hours< 5){
        greetingText.innerText = `Welcome! ${text}`;
    } else if(6 < hours && hours < 12) {
        greetingText.innerText = `Good morning! ${text}`;
    } else {
        greetingText.innerText = `Good afternoon! ${text}`;
    }
}


function askForName(event) {
    event.preventDefault();
    const currentValue = greetingInput.value;
    saveName(currentValue);
    showName(currentValue);
    greetingInput.value = '';
}

const loadName = localStorage.getItem(USER_LS);
if (loadName === null) {
    greetingForm.classList.add("greeting-showing");
    greetingForm.addEventListener("submit", askForName);
} else {
    showName(loadName);
}
    

