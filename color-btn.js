const colorBtn = document.querySelector(".color-btns");
const body = document.querySelector("body");
function onClickBtn(event) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if (key == null || value == null) {
        return;
    }
    body.style.backgroundColor=`var(--${value}-color)`;
}

colorBtn.addEventListener("click",onClickBtn)