const mainContainer = document.querySelector(".main-img-container");
const TOTALIMAGE = 3;

function getRanNum(num) {
    return Math.floor(num * Math.random());
}

function getImage(num) {
    if (num === 0|| num===1) {
        mainContainer.innerHTML = `<img class="main-img" src="img/${num}.gif" alt="">`
        return;
    }
    mainContainer.innerHTML=`<img class="main-img" src="img/${num}.jpg" alt="">`
}

const random = getRanNum(TOTALIMAGE);
getImage(random);

