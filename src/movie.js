const sceneContent = document.querySelector(".scene__content");
const sceneSlider = document.querySelector(".scene__slider");
const illustContent = document.querySelector(".illust__content");
const illustSlider = document.querySelector(".illust__slider");

const sceneBtns = document.querySelector(".scene__btns");
const sceneBtn = document.querySelectorAll(".scene__btn");
const illustBtns = document.querySelector(".illust__btns");
const illustBtn = document.querySelectorAll(".illust__btn");

let AMOUNT_SCENE = 0;
let AMOUNT_ILLUST = 0;

sceneContent.addEventListener("click", onClickScene);
sceneBtns.addEventListener("change", onChangeSceneBtns);
illustContent.addEventListener("click", onClickIllust);
illustBtns.addEventListener("change", onChangeIllustBtns);

function onClickScene(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_SCENE -= 100;
        if (AMOUNT_SCENE < -400) {
            AMOUNT_SCENE = -400;
        }
        sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
        switch (AMOUNT_SCENE) {
            case 0:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[0].checked=true;;
                break;
            case -100:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[1].checked=true;;
                break;
            case -200:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[2].checked=true;;
                break;
            case -300:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[3].checked=true;;
                break;
            case -400:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[4].checked=true;;
                break;
        }
    } else {
        AMOUNT_SCENE += 100;
        if (AMOUNT_SCENE > 0) {
            AMOUNT_SCENE = 0;
        }
        sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`)
        switch (AMOUNT_SCENE) {
            case 0:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[0].checked=true;
                break;
            case -100:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[1].checked=true;
                break;
            case -200:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[2].checked=true;
                break;
            case -300:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[3].checked=true;
                break;
            case -400:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[4].checked=true;
                break;
        }
    }
}

function onClickIllust(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_ILLUST -= 100;
        if (AMOUNT_ILLUST < -400) {
            AMOUNT_ILLUST = -400;
        }
        console.log(AMOUNT_ILLUST);
        illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
        switch (AMOUNT_ILLUST) {
            case 0:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[0].checked = true;
                break;
            case -100:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[1].checked=true;
                break;
            case -200:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[2].checked=true;
                break;
            case -300:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[3].checked=true;
                break;
            case -400:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[4].checked=true;
                break;
        }
    } else {
        AMOUNT_ILLUST += 100;
        if (AMOUNT_ILLUST > 0) {
            AMOUNT_ILLUST = 0;
        }
        console.log(AMOUNT_ILLUST);
        illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`)
        switch (AMOUNT_ILLUST) {
            case 0:

                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[0].checked=true;
                break;
            case -100:

                illustBtn.forEach(btn => btn.checked=false);

                illustBtn[1].checked=true;
                break;
            case -200:

                illustBtn.forEach(btn => btn.checked=false);
                console.log(illustBtn[2]);
                illustBtn[2].checked=true;
                break;
            case -300:

                illustBtn.forEach(btn => btn.checked=false);
                console.log(illustBtn[3]);
                illustBtn[3].checked=true;
                break;
            case -400:

                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[4].checked=true;
                break;
        }
    }
}


function onChangeSceneBtns(event) {
    const dataset = event.target.dataset;
    const value = dataset.value;
    if (value === undefined) {
        return;
    }
    switch (value) {
        case "first":
            AMOUNT_SCENE = 0;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "second":
            AMOUNT_SCENE = -100;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "third":
            AMOUNT_SCENE = -200;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "fourth":
            AMOUNT_SCENE = -300;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "fifth":
            AMOUNT_SCENE = -400;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        default:
            throw error(`You clicked wrong button`);
    }
}

function onChangeIllustBtns(event) {
    const dataset = event.target.dataset;
    const value = dataset.value;
    if (value === undefined) {
        return;
    }
    switch (value) {
        case "first":
            AMOUNT_ILLUST = 0;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        case "second":
            AMOUNT_ILLUST = -100;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        case "third":
            AMOUNT_ILLUST = -200;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        case "fourth":
            AMOUNT_ILLUST = -300;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        case "fifth":
            AMOUNT_ILLUST = -400;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        default:
            throw error(`You clicked wrong button`);
    }
}