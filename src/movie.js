const sceneContent = document.querySelector(".movie__scene-content");
const sceneSlider = document.querySelector(".movie__scene-slider");
const illustrationContent = document.querySelector(".movie__illustration-content");
const illustrationSlider = document.querySelector(".movie__illustration-slider");
let AMOUNT_SCENE = 0;
let AMOUNT_ILLUST = 0;

sceneContent.addEventListener("click", onClickScene);
illustrationContent.addEventListener("click", onClickIllustration);

function onClickScene(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    console.log(id);
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_SCENE -= 70;
        sceneSlider.setAttribute("style",`transform: translateX(${AMOUNT_SCENE}%)`)
    } else {
        AMOUNT_SCENE += 70;
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
        AMOUNT_ILLUST -= 70;
        illustrationSlider.setAttribute("style",`transform: translateX(${AMOUNT_ILLUST}%)`)
    } else {
        AMOUNT_ILLUST += 70;
        illustrationSlider.setAttribute("style",`transform: translateX(${AMOUNT_ILLUST}%)`)
    }
}
