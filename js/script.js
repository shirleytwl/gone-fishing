window.onload = function() {
    var gameContainer = document.querySelector("#game-container");
    var clickContainer = document.querySelector("#click-container");
    var fishingLine = document.querySelector("#line");
    var startScreen = document.querySelector("#start-screen");
    var startTitle = document.querySelector("#start-title");
    var instructions = document.querySelector("#instructions");
    var startBtn = document.querySelector("#start-btn");
    var gameStats = document.querySelector("#game-stats");
    var gameDay = document.querySelector("#game-day");
    var gameTimer = document.querySelector("#game-timer");
    var gameScore = document.querySelector("#game-score");
    var day = 0;
    var score = 0;
    var fishTracker = [0,0,0] //first item is fish, second is rare fish, third is trash
    var days = [{
        "day": 0,
        "instruction": "You have went on a fishing trip for a week.<br>To catch a fish, quickly click on it before it swim off!"
    },{
        "day": 1,
        "instruction": "You can catch rare fishes now. Let's fish some more!"
    },{
        "day": 2,
        "instruction": "There has been news of people throwing their trash into the ocean.<br> Let's continue and avoid the trash!"
    },{
        "day": 3,
        "instruction": ""
    },{
        "day": 4,
        "instruction": "Sharks have been sighted lately.<br>Let's continue and not provoke the sharks!"
    }];

    startBtn.addEventListener("click", startGame);
    clickContainer.addEventListener("mousemove", moveLine);
    var createFishes = null;
    var createRareFishes = null;
    var createTrashes = null;

    function moveLine (event){
        fishingLine.style.left= event.clientX+"px";
        fishingLine.style.top = event.clientY+"px";
    }
    //start game function
    function startGame () {
        fishTracker = [0,0,0];
        score = 0;
        startBtn.style.display = "none";
        instructions.style.display = "none";
        startTitle.style.display = "none";
        if (document.querySelector("#game-over")) {
            gameContainer.removeChild(document.querySelector("#game-over"));
        }
        clickContainer.style.display = "block";
        gameStats.style.display = "block";
        createItems();
    }
    function createItems() {
        createTimer();
        day++;
        gameDay.innerText = "Day 0"+day;

        switch (day) {
            case 1:
                createFishes = setInterval(createFish, 1000);
                break;

            case 2:
                createFishes = setInterval(createFish, 1200);
                createRareFishes = setInterval(createRareFish, 3000);
                break;

            case 3:
                createFishes = setInterval(createFish, 1500);
                createRareFishes = setInterval(createRareFish, 3000);
                createTrashes = setInterval(createTrash, 2000);
                break;

            case 4:

                break;

            case 5:
                break;
        }
        //createFishes = setInterval(createFish, 1500);
        //createRareFishes = setInterval(createRareFish, 3000);
        //createTrashes = setInterval(createTrash, 2000);
    }
    //create timer function
    function createTimer () {
        gameTimer.innerText = "Time: 10s";
        gameScore.innerText = "Score: 0";
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
                endDay();
            }
            else {
                sec++
            }
        }
    }
    //create fish function
    function createFish () {
        let fish = document.createElement("div");
        fish.classList.add("item");
        fish.classList.add("fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("click", hit);
        setTimeout(function() {
            if (!fish.classList.contains("caught")){
                fish.classList.add("disappear");
            }
            setTimeout(function() {
                clickContainer.removeChild(fish);
            }, 350);
        }, 5000);
    }
    //create fish function
    function createRareFish () {
        let fish = document.createElement("div");
        fish.classList.add("item");
        fish.classList.add("rare-fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("click", hit);
        setTimeout(function() {
            if (!fish.classList.contains("caught")){
                fish.classList.add("disappear");
            }
            setTimeout(function() {
                clickContainer.removeChild(fish);
            }, 350);
        }, 3000);
    }
    //create fish function
    function createTrash () {
        let trash = document.createElement("div");
        trash.classList.add("item");
        trash.classList.add("trash");
        clickContainer.appendChild(trash);
        setPosition(trash);
        trash.addEventListener("click", hit);
        setTimeout(function() {
            clickContainer.removeChild(trash);
        }, 3000);
    }

    function setPosition(item) {
        let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth-100));
        let topPos = Math.floor(Math.random() * (clickContainer.offsetHeight-100));
        // if it is fish or rare fish
        if (item.classList.contains("fish") || item.classList.contains("rare-fish")) {
            let randomNum = Math.floor(Math.random()*2);
            //left side
            if (randomNum%2 === 0){
                leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/4)-100));
                setInterval(function(){
                    if (item.classList.contains("fish")) {
                        leftPos+=20;
                    }
                    else {
                        leftPos+=30;
                    }
                    item.style.left = leftPos+"px";
                }, 100);
                item.classList.add("left");
            }
            //right side
            else {
                leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/4)-100)+(clickContainer.offsetWidth/4*3));
                setInterval(function(){
                    if (item.classList.contains("fish")) {
                       leftPos-=20;
                    }
                    else {
                       leftPos-=30;
                    }
                    item.style.left = leftPos+"px";
                }, 100);
                item.classList.add("right");
            }
            item.style.left = leftPos+"px"
            item.style.top = topPos+"px";
        }
        //if it is trash
        else {
            item.style.left = leftPos+"px";
            item.style.top = topPos+"px";
        }
    }
    function hit(event) {
        let type = event.target.classList;
        let hitText = document.createElement('span');
        hitText.setAttribute('class','hit-text');
        this.parentNode.insertBefore(hitText,this);
        hitText.style.left = this.style.left;
        hitText.style.top = this.style.top;
        if (!this.classList.contains("caught")){
            this.classList.add("caught");
            if (type.contains("fish")) {
                hitText.innerText = "+1";
                hitText.style.color = "white";
                score++;
                fishTracker[0]++;
            }
            else if (type.contains("rare-fish")) {
                hitText.innerText = "+5";
                hitText.style.color = "white";
                score+=5;
                fishTracker[1]++;
            }
            else if (type.contains("trash")){
                hitText.innerText = "-3";
                hitText.style.color = "red";
                score-=3;
                fishTracker[2]++;
            }
            setTimeout(function() {
                clickContainer.removeChild(hitText);
            }, 1000);
            gameScore.innerText = `Score: ${score}`;
        }
    }
    function endDay() {
        gameStats.style.display = "none";
        clickContainer.style.display = "none";
        startBtn.style.top = "66%";
        instructions.innerHTML = `<h2>You have finished Day 0${day}!</h2><p>You have caught ${fishTracker[0]} fishes, ${fishTracker[1]} rare fishes and ${fishTracker[2]} trash.<br>Your score so far: ${score}</p><p>${days[day].instruction}</p>`;
        startTitle.style.display = "block";
        startBtn.style.display = "block";
        instructions.style.display = "block";
    }
    instructions.innerHTML = `<p>${days[day].instruction}</p>`;
};