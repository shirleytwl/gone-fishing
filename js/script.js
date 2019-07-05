window.onload = function() {
    var gameContainer = document.querySelector("#game-container");
    var clickContainer = document.querySelector("#click-container");
    var startScreen = document.querySelector("#start-screen");
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
        createTimer();
        createFishes = setInterval(createFish, 1000);
        createRareFishes = setInterval(createRareFish, 2000);
    }
    //create timer function
    function createTimer () {
        gameTimer = document.createElement("p");
        gameTimer.setAttribute("id","game-timer");
        gameScore = document.createElement("p");
        gameScore.setAttribute("id","game-score");
        gameTimer.innerText = "Time: ";
        gameScore.innerText = "Score: 0";
        gameContainer.appendChild(gameTimer);
        gameContainer.appendChild(gameScore);
        let sec = 0;
        var gameTimerInterval = setInterval(startGameTimer, 1000);
        function startGameTimer () {
            gameTimer.innerText = `${10-sec}s`
            if (sec === 10) {
                clearInterval(gameTimerInterval);
                clearInterval(createFishes);
                clearInterval(createRareFishes);
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
        fish.addEventListener("click", addScore);
        setTimeout(function() {
          clickContainer.removeChild(fish);
        }, 2000);
    }
    //create fish function
    function createRareFish () {
        let fish = document.createElement("div");
        fish.classList.add("fish");
        fish.classList.add("rare-fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("click", addScore);
        setTimeout(function() {
            clickContainer.removeChild(fish);
        }, 1000);
    }

    function setPosition(fish) {
        let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth-100));
        let topPos = Math.floor(Math.random() * (clickContainer.offsetHeight-100));
        // if (prevFishPosition[0] === null ) {
            fish.style.left = leftPos+"px";
            fish.style.top = topPos+"px";
        // }
    }
    function addScore(event) {
        let type = event.target.className;
        console.log(type);
        if (type === "fish") {
            score++;
            fishTracker[0]++;
        }
        else if (type === "fish rare-fish") {
            score+=5;
            fishTracker[1]++;
        }
        event.target.classList.add("caught");
        gameScore.innerText = `Score: ${score}`;
    }
    function endGame() {
        gameContainer.removeChild(gameTimer);
        gameContainer.removeChild(gameScore);
        startBtn.style.display = "block";
        startBtn.innerText = "Play again?"

        gameOver = document.createElement("p");
        gameOver.setAttribute("id","game-over");
        gameOver.innerText = `You have caught ${fishTracker[0]} fishes, ${fishTracker[1]} rare fishes and ${fishTracker[2]} trash.\nTotal score: ${score}`;
        gameContainer.insertBefore(gameOver,startBtn);
    }
};