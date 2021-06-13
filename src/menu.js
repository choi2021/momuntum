const menuHeader = document.querySelector(".menu__header");
const menuContent = document.querySelector(".menu__content");
const headerBtn = document.querySelector(".menu__header__btn ");
const headerText = document.querySelector(".menu__header__text");
const menuHome = document.querySelector(".menu-home");
const menuTodo = document.querySelector(".menu-todo");
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
            menuDown(menuTodo);
            menuDown(menuMovie);
            menuDown(menuScene);
            menuDown(menuIllust);
            clicked = true;
        } else {
            changeHeader("up");
            menuUp(menuVertical);
            menuUp(menuHome);
            menuUp(menuTodo);
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
        case "Todo":
            const todo = document.querySelector(".todo");
            const todoRect = todo.getBoundingClientRect();
            const todoTop = todoRect.top;
            const todoHeight = todoRect.height;
            window.scrollBy({
                top: todoTop-todoHeight/12,
                behavior: "smooth",
                left: 0
            });
            break;
        case "Movie":
        case "Scene":
            const movie = document.querySelector(".movie");
            const movieRect = movie.getBoundingClientRect();
            const movieTop = movieRect.top;
            const movieHeight = movieRect.height;
            window.scrollBy({
                top: movieTop-movieHeight/50,
                behavior: "smooth",
                left: 0
            });
            break;
        case "Illust":
            const illust = document.querySelector(".movie__illust");
            const illustRect = illust.getBoundingClientRect();
            const illustTop = illustRect.top;
            const illustHeight = illustRect.height;
            window.scrollBy({
                top: illustTop-illustHeight/3,
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
