const menuHeader = document.querySelector(".menu__header");
const menuContent = document.querySelector(".menu__content");
const headerBtn = document.querySelector(".menu__btn");
const headerText = document.querySelector(".menu__text");
const menuHome = document.querySelector(".menu-home");
const menuMovie = document.querySelector(".menu-movie");
const menuScene = document.querySelector(".menu-scene");
const menuIllustration = document.querySelector(".menu-illustration");
const menuSoundTrack = document.querySelector(".menu-sound-track");
const menuVertical = document.querySelector(".menu__vertical");
menuHeader.addEventListener("click", onClickMenuHeader);
menuContent.addEventListener("click",onClickMenuContent)

function onClickMenuHeader(event) {
    const target = event.target;
    const dataset = target.dataset;
    const key = dataset.key;
    if (key === undefined) {
        return;
    } else {
        if (menuContent.classList.contains("menu-hide")) {
            changeHeader("down");
            menuContent.classList.remove("menu-hide");
            menuVertical.classList.remove("scrollUp_vertical");
            menuVertical.classList.add("scrollDown_vertical");
            menuHome.classList.remove("scrollUp_home");
            menuHome.classList.add("scrollDown_home");
            menuMovie.classList.remove("scrollUp_movie");
            menuMovie.classList.add("scrollDown_movie");
            menuScene.classList.remove("scrollUp_scene");
            menuScene.classList.add("scrollDown_scene");
            menuIllustration.classList.remove("scrollUp_illustration");
            menuIllustration.classList.add("scrollDown_illustration");
            menuSoundTrack.classList.remove("scrollUp_sound-track");
            menuSoundTrack.classList.add("scrollDown_sound-track");
        } else {
            changeHeader("up")
            menuVertical.classList.add("scrollUp_vertical");
            menuVertical.classList.remove("scrollDown_vertical");
            menuHome.classList.add("scrollUp_home");
            menuHome.classList.remove("scrollDown_home");
            menuMovie.classList.add("scrollUp_movie");
            menuMovie.classList.remove("scrollDown_movie");
            menuScene.classList.add("scrollUp_scene");
            menuScene.classList.remove("scrollDown_scene");
            menuIllustration.classList.add("scrollUp_illustration");
            menuIllustration.classList.remove("scrollDown_illustration");
            menuSoundTrack.classList.add("scrollUp_sound-track");
            menuSoundTrack.classList.remove("scrollDown_sound-track");
            setTimeout(() => menuContent.classList.add("menu-hide"), 600);
        }
    }
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
