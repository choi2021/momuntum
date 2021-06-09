const sceneContent = document.querySelector(".scene__content");
const sceneSlider = document.querySelector(".scene__slider");
const illustContent = document.querySelector(".illust__content");
const illustSlider = document.querySelector(".illust__slider");
let AMOUNT_SCENE = 0;
let AMOUNT_ILLUST = 0;

sceneContent.addEventListener("click", onClickScene);
illustContent.addEventListener("click", onClickIllustration);

function onClickScene(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    console.log(id);
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_SCENE -= 20;
        sceneSlider.setAttribute("style",`transform: translateX(${AMOUNT_SCENE}%)`)
    } else {
        AMOUNT_SCENE += 20;
        console.log(AMOUNT_SCENE);
        sceneSlider.setAttribute("style",`transform: translateX(${AMOUNT_SCENE}%)`)
    }
}

function onClickIllustration(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    console.log(id);
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_ILLUST -= 20;
        illustSlider.setAttribute("style",`transform: translateX(${AMOUNT_ILLUST}%)`)
    } else {
        AMOUNT_ILLUST += 20;
        illustSlider.setAttribute("style",`transform: translateX(${AMOUNT_ILLUST}%)`)
    }
}
