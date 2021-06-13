const timeContainer = document.querySelector(".header__time");

function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    timeContainer.innerText = `${hour<10? "0"+hour:hour}:${minutes<10? "0"+minutes:minutes}:${seconds<10? "0"+seconds:seconds}`;
}

setInterval(getTime, 1000);