var startBtn = document.querySelector("#start")
var startScreen = document.getElementById("startScreen")
var gameScreen = document.getElementById('gameScreen')

startBtn.addEventListener("click",function() {
    console.log("brandi")
    document.getElementById("startScreen");
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");


})

