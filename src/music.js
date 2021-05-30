const musicImgContainer = document.querySelector(".music-img-container");
const btns=document.querySelector(".music-btns")


let played = false;
let setlist = [];
let songNumber = 0;
let song = undefined;

function getMusic(){
    return fetch("./music.json")
        .then(response => response.json())
        .then(json =>json.music);
}

function updateSetlist(num, music) {
    getRandomArray(num);
    setlist = setlist.map(num => music[num])
        .map(item => {
        const sound = getSong(item.song);
        const img = getImg(item.img);
        const setlistObj = {
            sound: sound,
            img: img
        }
        return setlistObj;
    });
}

function getRandomNum(num) {
    return Math.floor(num * Math.random());
}

function getRandomArray(num) {
    for (let i = 0; i < num; i++){
        const rand = getRandomNum(num);
        if (setlist.includes(rand)) {
            i--;
            continue;
        }
        setlist.push(rand);
    }
}

function getSong(url) {
    const song = new Audio();
    song.src = url;
    song.volume = 0.4;
    return song;
}

function getImg(url) {
    const img = new Image();
    img.setAttribute("class", "music-img");
    img.src = url;
    return img;
}

function setImg() {
    musicImgContainer.innerHTML = ``;
    const image = setlist[songNumber].img;
    musicImgContainer.appendChild(image);
}

function setSong() {
    song = setlist[songNumber].sound;
}

function onClickBtns(event) {
    const target = event.target;
    const dataId = target.dataset.id;
    if (dataId === undefined) {
        return;
    }
    switch (dataId) {
        case "play-btn":
            target.addEventListener("click", onClickPlay);
            break;
        case "forward-btn":
            target.addEventListener("click", onClickForward);
            break;
        case "backward-btn":
            target.addEventListener("click", onClickBackward);
            break;
        default:
            throw new Error(`Wrong key`);
    }
}

function onClickPlay() {
    setSong();
    const icon = document.querySelector(`i[data-id=play-btn]`);
    if (!played) {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-stop");
        playSong(song);
        played = true;
    } else {
        icon.classList.remove("fa-stop");
        icon.classList.add("fa-play");
        stopSong(song);
        played = false;
    }
}

function playSong(song) {
    song.play();
}

function stopSong(song) {
    song.pause();
}

function onClickForward() {
    songNumber++;
    if (songNumber > setlist.length - 1) {
        songNumber = 0;
    }
    if (played) {
        stopSong(song);
        setSong();
        setImg();
        playSong(song);
    } else if(!played) {
        setSong();
        setImg();   
    }
}

function onClickBackward() {
    songNumber--;
    if (songNumber < 0) {
        songNumber = setlist.length - 1;
    }
    if (played) {
        stopSong(song);
        setSong();
        setImg();
        playSong(song);
    } else if(!played) {
        setSong();
        setImg();   
    }
}

getMusic()
    .then(music => {
        const totalNumber = music.length;
        updateSetlist(totalNumber, music);
        setImg();
        btns.addEventListener("click", onClickBtns)
    });        


    