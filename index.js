

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let play_btn = document.getElementById("play_btn")
let audio = new Audio()
let bar_width = 5;
let max_height = 150;
let bar_height;

var offSetX
var offSetY
//---------------



//------------------
context.beginPath();
context.lineWidth = "0";
context.strokeStyle = "red";
context.fillStyle = "lightgrey"

var gap = 0
let bar_height_arr = []

function createBar(){
    for (let i = 0; i < canvas.clientWidth / 2 * bar_width; i++) {
        //creating visualizer
        bar_height = Math.floor(Math.random() * 150) + 50
        bar_height > max_height ? bar_height = max_height : bar_height = bar_height
        bar_height_arr.push(bar_height)
    
        context.fillRect(gap, canvas.clientHeight / 2 - bar_height / 2, bar_width, bar_height);
        gap += 10
    }
}
createBar()

let flag = true
var interval
var index = 0
var x = 0
var checkinitial = true;
// initial fn for setting the values to initial state to stop the player when it reaches end

function initial() {

    audio.pause()
    audio.currentTime = 0
    clearInterval(interval)
    gap = 0
    index = 0
    x = 0
    context.fillStyle = "lightgrey"
    // after ending the song i am again creating the bar which was in earlier
    createBar()

    flag = false
    checkinitial = false
    start(0, 0)


}
// start function start the music player
function start(i, gap, clickedincanvas) {

    // toggling the flag for play or pause the music player
    // if flag true its starts playing
    if (flag || clickedincanvas) {
        play_btn.innerHTML = `<i class="fas fa-pause-circle"></i>`
        playTrack(i)
        checkinitial = true
        clearInterval(interval)
        interval = setInterval(() => {
            if (i >= 80) {
                // if it reaches end invoked intial
                initial()

            }

            context.fillStyle = "rgb(221, 127, 149)"
            context.fillRect(gap, canvas.clientHeight / 2 - bar_height_arr[i] / 2, bar_width, bar_height_arr[i]);

            gap += 10
            i++
            index = i
            x = gap
        }, 1000)
        flag = false
    }

    //  if flag false its stops the  player
    else {
        pauseTrack()
        clearInterval(interval)
        flag = true
        //    index=0
        //     x=0
        play_btn.innerHTML = `<i class="fa fa-play"></i>`
    }
}


play_btn.addEventListener("click", () => {
    console.log(index, x, checkinitial)
    if (checkinitial) {
        start(index, x)
    } else {
        start(0, 0)
    }

})

// canvas fn is changing the duration of music player and start from where user clicked
function canvasFunction(e) {
    offSetX = e.offsetX
    offSetY = e.offsetY
    clickedincanvas = true
    gap = 0

    for (var i = 0; i < canvas.clientWidth/10; i++) {
        context.fillStyle = "lightgrey"
        context.fillRect(gap, canvas.clientHeight / 2 - bar_height_arr[i] / 2, bar_width, bar_height_arr[i]);

        gap += 10
    }
    gap = 0
    for (var i = 0; i < offSetX / 10; i++) {
        context.fillStyle = "rgb(221, 127, 149)"
        context.fillRect(gap, canvas.clientHeight / 2 - bar_height_arr[i] / 2, bar_width, bar_height_arr[i]);

        gap += 10
    }

    index = i
    x = gap
    if (flag == false) {
        start(i, gap, true)
    }
    else {
        checkinitial = true
    }

    // console.log(offSetX,offSetY) 
}

canvas.addEventListener("mousedown", (e) => {
    canvasFunction(e)

})

context.stroke();
// loading track
function loadTrack() {
    audio.src = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    audio.load()

}
loadTrack()

// for playing track
function playTrack(i) {



    audio.play();
    audio.currentTime = i + 50
}
// for stoping track
function pauseTrack() {

    audio.pause();

}


