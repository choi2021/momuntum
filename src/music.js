const theme = new Audio(`music/Mia  Sebastians Theme  La La Land OST.mp3`);
const musicBtn = document.querySelector(".header__music__btn");

let started = false;

musicBtn.addEventListener("click", onClickMusicBtn);

function playMusic(song) {
    song.play()
}

function pauseMusic(song) {
    song.pause();
}

function onClickMusicBtn() {
    if (!started) {
        musicBtn.innerHTML = `<i class="fas fa-stop"></i>`;
        playMusic(theme);
        started = true;
    } else {
        musicBtn.innerHTML=`<i class="fas fa-play">`;
        pauseMusic(theme);
        started = false;
    }
}
    