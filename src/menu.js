const menuHeader = document.querySelector(".menu__header");
const menuContent = document.querySelector(".menu__content");
const headerBtn = document.querySelector(".menu__btn");
const headerText = document.querySelector(".menu__text");
const menuHome = document.querySelector(".menu-home");
const menuMovie = document.querySelector(".menu-movie");
const menuScene = document.querySelector(".menu-scene");
const menuIllust = document.querySelector(".menu-illust");
const menuVertical = document.querySelector(".menu__vertical");
menuHeader.addEventListener("click", onClickMenuHeader);
menuContent.addEventListener("click",onClickMenuContent)

let clicked = false;
let duration = 0;

function onClickMenuHeader(event) {
    const target = event.target;
    const dataset = target.dataset;
    const key = dataset.key;
    if (key === undefined) {
        return;
    } else {
        if (!clicked) {
            changeHeader("down");
            menuDown(menuVertical);
            menuDown(menuHome);
            menuDown(menuMovie);
            menuDown(menuScene);
            menuDown(menuIllust);
            clicked = true;
        } else {
            changeHeader("up");
            menuUp(menuVertical);
            menuUp(menuHome);
            menuUp(menuMovie);
            menuUp(menuScene);
            menuUp(menuIllust);
            clicked = false;
        }
    }
}

function menuUp(item) {
    item.style.opacity = '0';
    item.style.transitionDelay = `${duration}ms`;
    duration -= 80;
}

function menuDown(item) {
    item.style.opacity = `1`;
    item.style.transitionDelay = `${duration}ms`;
    duration += 80;
}

function onClickMenuContent(event) {
    const target = event.target;
    const dataset = target.dataset;
    const value = dataset.value;
    if (value === undefined) {
        return;
    }
    switch (value) {
        case "Home":
            const header = document.querySelector(".header");
            header.scrollIntoView({ behavior: "smooth" });
            break;
        case "Movie":
            const movie = document.querySelector(".movie");
            const movieRect = movie.getBoundingClientRect();
            const movieTop = movieRect.top;
            window.scrollBy({
                top: movieTop,
                behavior: "smooth",
                left: 0
            });
            break;
        case "Scene":
            const scene = document.querySelector(".movie__scene");
            const sceneRect = scene.getBoundingClientRect();
            const sceneTop = sceneRect.top;
            window.scrollBy({
                top: sceneTop,
                behavior: "smooth",
                left: 0
            });
            break;
        case "Illust":
            const illust = document.querySelector(".movie__illust");
            const illustRect = illust.getBoundingClientRect();
            const illustTop = illustRect.top;
            window.scrollBy({
                top: illustTop,
                behavior: "smooth",
                left: 0
            });
            break;
        case "Sound-Track":
            const soundTrack = document.querySelector(".movie__sound-track");
            const soundTrackRect = soundTrack.getBoundingClientRect();
            const soundTrackTop = soundTrackRect.top;
            window.scrollBy({
                top: soundTrackTop,
                behavior: "smooth",
                left: 0
            });
                break;
        default:
            throw Error(`Click Wrong Button`);
    }
}

function changeHeader(text) {
    if (text === "down") {
        headerBtn.innerHTML = `<i class="fas fa-times" data-key="header-icon" data-value="scroll" ></i>`
        headerText.innerText = `Close`;
    } else {
        headerBtn.innerHTML = `<i class="fas fa-bars" data-key="header-icon" data-value="scroll" ></i>`
        headerText.innerText = `Menu`;
    }
}
