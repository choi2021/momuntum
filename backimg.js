const backImgContainer = document.querySelector(".backImg-Container");
const TOTALIMAGE = 3;


function getRanInt(num) {
    return Math.floor(num *TOTALIMAGE  + 1);
}

function getImage(num) {
    const image = new Image();
    image.classList.add("image");
    image.src = `images/${num}.jpg`;
    backImgContainer.appendChild(image);
}

const ran = Math.random();
const intRan = getRanInt(ran);

const sunBtn = document.querySelector(".sun-btn");
const nightBtn = document.querySelector(".night-btn");
const date=new Date();
const hours = date.getHours();

if (hours >= 18 || hours < 6) {
    sunBtn.classList.add("btn-showing");
    getImage(`${intRan}-n`);
} else {
    nightBtn.classList.add("btn-showing");
    getImage(`${intRan}-s`);
}

sunBtn.addEventListener("click", () => {
    const image = document.querySelector(".image");
    sunBtn.classList.remove("btn-showing");
    nightBtn.classList.add("btn-showing");
    backImgContainer.removeChild(image);
    getImage(`${intRan}-s`);
})

nightBtn.addEventListener("click", () => {
    const image = document.querySelector(".image");
    nightBtn.classList.remove("btn-showing");
    sunBtn.classList.add("btn-showing");
    backImgContainer.removeChild(image);
    getImage(`${intRan}-n`);
} )


