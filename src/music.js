const musicImgContainer = document.querySelector(".music-img-container");
const backwardBtn=document.querySelector(".music-backward-btn");
const playBtn = document.querySelector(".music-play-btn");
const forwardBtn= document.querySelector(".music-forward-btn");


function getMusic(){
    return fetch("./music.json")
        .then(response => response.json())
        .then(json =>json.music);
}

function getRanNum(num) {
    return Math.floor(num * Math.random());
}

function setSong(music, random) {
    const song = new Audio;
    song.src = music[random].song;
    song.volume = 0.3;
    playBtn.addEventListener("click",()=> onClickStart(song));
}

function onClickStart(song) {
    song.play();
}

function onClickStop(song) {
    song.pause();
}

function setImg(music, random) {
    musicImgContainer.innerHTML = ``;
    const img = new Image();
    img.setAttribute("class", "music-img");
    img.src = music[random].img;
    musicImgContainer.appendChild(img);
}

getMusic()
    .then(music => {
        console.log(music);
        const totalNumber = music.length;
        const random = getRanNum(totalNumber);
        setSong(music, random);
        setImg(music, random);
    })
    .catch(() => {
        const error = new Error(`not found`);
        console.log(error);
    })