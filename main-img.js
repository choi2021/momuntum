const mainContainer = document.querySelector(".main-img-container");
const TOTALIMAGE = 3;


function getImage(num) {
    if (num === 0) {
        mainContainer.innerHTML = `<img class="main-img" src="img/${num}.gif" alt="">`
        return;
    }
    mainContainer.innerHTML=`<img class="main-img" src="img/${num}.jpg" alt="">`
}

const random = getRanNum(TOTALIMAGE);
getImage(random);

