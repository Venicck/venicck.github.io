const models = ["./model/lp.glb", "./model/lpe.glb", "./model/lpb.glb"];
const emotions = ["stand", "greet", "fall"];
const cameraDefaultPosition = { x: 0, y: 0, z: 20 };
const cameraDefaultTarget = { x: 0, y: 2, z: 0 };
const orbitControlsConfig = "target: 0 2 0; maxPolarAngle:179.9; minDistance: 0.5; maxDistance: 200; initialPosition: 0 0 20";

let currentmodel = 0;
let currentemo = 0;
let videoVisible = false;

function toggleVideo() {
    videoVisible = !videoVisible;
    let ytVideo = document.querySelector(".yt-video");
    if (videoVisible) {
        ytVideo.style.display = "block";
    } else {
        ytVideo.style.display = "none";
    }
}

function changeModel(index) {
    currentmodel = index;
    let model = document.querySelector("#model");
    model.setAttribute("src", models[index]);
    model.setAttribute("animation-mixer", `clip: ${emotions[currentemo]}; loop: repeat;`);
}

function changeEmotion(index) {
    currentemo = index;
    let model = document.querySelector("#model");
    model.setAttribute("animation-mixer", `clip: ${emotions[currentemo]}; loop: repeat;`);
}

function onSizeChange() {
    let ytVideo = document.querySelector(".yt-video");
    let x = ytVideo.getBoundingClientRect().width;
    let y = ytVideo.getBoundingClientRect().height;
    ytVideo.setAttribute("width", x);
    ytVideo.setAttribute("height", y);
}

window.addEventListener("DOMContentLoaded", () => {
    changeModel(0);
    changeEmotion(0);
    onSizeChange();
});
window.addEventListener("resize", onSizeChange);