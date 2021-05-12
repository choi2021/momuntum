function getDate() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeContainer = document.querySelector(".time-Container");
    timeContainer.innerHTML = `<span>${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}</span>`;
}






setInterval(getDate,1000)

