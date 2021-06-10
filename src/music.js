const musicTitle = document.querySelector(".music__title");
const musicBtns = document.querySelector(".music__btns");

let setList = [];
let played = false;
let position = 0;

function loadMusic() {
    return fetch(`data/music.json`)
        .then(response=>response.json())
}

function prepareSetlist(music) {
    for (let i = 0; i < music.length; i++){
        const randomNum = getRandom(music.length);
        const text = music[randomNum].title;
        const musicUrl = music[randomNum].song;
        const song = setSong(musicUrl);
        const map = setList.map(item => item.text);
        if (map.includes(text)) {
            i--
            continue;
        }
        const obj = {
            text,
            song
        }
        setList.push(obj);
    }
}

function resetSetlist(prev) {
    console.log(prev);
    for (let i = 0; i < prev.length; i++){
        const randomNum = getRandom(prev.length);
        const text = prev[randomNum].text;
        const song = prev[randomNum].song;
        const map = setList.map(item => item.text);
        if (map.includes(text)) {
            i--
            continue;
        }
        const obj = {
            text,
            song
        }
        setList.push(obj);
    }
}

function getRandom(num) {
    return Math.floor(Math.random() * num);
}

function setSong(url) {
    const song = new Audio(`${url}`);
    song.addEventListener("ended", onEndSong);
    return song;
}

function onEndSong() {
    position++;
    showTitle();
    playSong();
}

function showTitle() {
    const text = setList[position].text;
    musicTitle.innerText = `${text}`;
}

function onClickBtns(event) {
    const target = event.target;
    const dataSet = target.dataset;
    const value = dataSet.value;
    if (value === undefined) {
        return;
    }
    switch (value) {
        case "redo":
            toggleLoop();
            break;
        case "backward":
            stopSong();
            position--
            if (position < 0) {
                position = setList.length - 1;
            }
            showTitle();
            if (played) {
                playSong();
            }
            break;
        case "play":
            const icon = document.querySelector(".play");
            if (!played) {
                playSong();
                icon.classList.remove("fa-play");
                icon.classList.add("fa-stop");
                played = true;
            } else {
                stopSong();
                icon.classList.remove("fa-stop");
                icon.classList.add("fa-play");
                played = false;
            }
            break;
        case "forward":
            stopSong();
            position++
            if (position > setList.length-1) {
                position=0
            }
            showTitle();
            if (played) {
                playSong();
            }
            break;
        case "refresh":
            stopSong();
            const prevSetlist = setList;
            setList = [];
            resetSetlist(prevSetlist);
            showTitle();
            if (played) {
                playSong();
            }
            break;
        default:
            throw Error('you clicked wrong btn');
    }
}

function playSong() {
    const song = setList[position].song;
    song.play();
}

function stopSong() {
    const song = setList[position].song;
    song.pause();
}

function toggleLoop() {
    const song = setList[position].song;
    const redoBtn = document.querySelector(".redo-btn");
    if (!song.hasAttribute("loop")) {
        song.setAttribute("loop", "loop");
        redoBtn.style.opacity = `1`;
        console.log("looped")
    } else {
        song.removeAttribute("loop");
        redoBtn.style.opacity = `0.7`;
        console.log("unlooped");
    }
}

loadMusic()
    .then(json => {
        const music=json.music;
        prepareSetlist(music);
        showTitle();
        musicBtns.addEventListener("click", onClickBtns);

    });
