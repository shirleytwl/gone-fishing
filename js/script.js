window.onload = function() {
    var gameContainer = document.querySelector("#game-container");
    var clickContainer = document.querySelector("#click-container");
    var startScreen = document.querySelector("#start-screen");
    var startTitle = document.querySelector("#start-title");
    var startBtn = document.querySelector("#start-btn");
    var gameTimer = null;
    var scoreText = null;
    var score = 0;
    var fishTracker = [0,0,0] //first item is fish, second is rare fish, third is trash
    startBtn.addEventListener("click", startGame);

    var createFishes = null;

    //start game function
    function startGame () {
        score = 0;
        startBtn.style.display = "none";
        startTitle.style.display = "none";
        if (document.querySelector("#game-over")) {
            gameContainer.removeChild(document.querySelector("#game-over"));
        }
        clickContainer.style.display = "block";
        createTimer();
        createFishes = setInterval(createFish, 1500);
        createRareFishes = setInterval(createRareFish, 3000);
        createTrashes = setInterval(createTrash, 2000);
    }
    //create timer function
    function createTimer () {
        gameTimer = document.createElement("p");
        gameTimer.setAttribute("id","game-timer");
        gameScore = document.createElement("p");
        gameScore.setAttribute("id","game-score");
        gameTimer.innerText = "Time: 10s";
        gameScore.innerText = "Score: 0";
        gameContainer.appendChild(gameTimer);
        gameContainer.appendChild(gameScore);
        let sec = 0;
        var gameTimerInterval = setInterval(startGameTimer, 1000);
        function startGameTimer () {
            gameTimer.innerText = `Time: ${10-sec}s`
            if (sec === 10) {
                clearInterval(gameTimerInterval);
                clearInterval(createFishes);
                clearInterval(createRareFishes);
                clearInterval(createTrashes);
                sec = 0;
                endGame();
            }
            else {
                sec++
            }
        }
    }
    //create fish function
    function createFish () {
        let fish = document.createElement("div");
        fish.classList.add("fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("click", hit);
        setTimeout(function() {
            //fish.addClass("disappear");
            clickContainer.removeChild(fish);
        }, 3500);
    }
    //create fish function
    function createRareFish () {
        let fish = document.createElement("div");
        fish.classList.add("rare-fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("click", hit);
        setTimeout(function() {
            //fish.addClass("disappear");
            clickContainer.removeChild(fish);
        }, 2000);
    }
    //create fish function
    function createTrash () {
        let trash = document.createElement("div");
        trash.classList.add("trash");
        clickContainer.appendChild(trash);
        setPosition(trash);
        trash.addEventListener("click", hit);
        setTimeout(function() {
            clickContainer.removeChild(trash);
        }, 3000);
    }

    function setPosition(fish) {
        let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth-100));
        let topPos = Math.floor(Math.random() * (clickContainer.offsetHeight-100));
        // if (prevFishPosition[0] === null ) {
            fish.style.left = leftPos+"px";
            fish.style.top = topPos+"px";
        // }
    }
    function hit(event) {
        let type = event.target.className;
        console.log(type);
        if (type === "fish") {
            score++;
            fishTracker[0]++;
        }
        else if (type === "rare-fish") {
            score+=5;
            fishTracker[1]++;
        }
        else if (type === "trash"){
            score-=3;
            fishTracker[2]++;
        }
        event.target.classList.add("caught");
        gameScore.innerText = `Score: ${score}`;
    }
    function endGame() {
        gameContainer.removeChild(gameTimer);
        gameContainer.removeChild(gameScore);
        startTitle.style.display = "block";
        startBtn.style.display = "block";
        clickContainer.style.display = "none";

        gameOver = document.createElement("p");
        gameOver.setAttribute("id","game-over");
        gameOver.innerText = `You have caught ${fishTracker[0]} fishes, ${fishTracker[1]} rare fishes and ${fishTracker[2]} trash.\nTotal score: ${score}`;
        gameContainer.insertBefore(gameOver,startBtn);
    }
};