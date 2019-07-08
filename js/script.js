window.onload = function() {
    var gameContainer = document.querySelector("#game-container");
    var clickContainer = document.querySelector("#click-container");
    var fishingLine = document.querySelector("#line");
    var startScreen = document.querySelector("#start-screen");
    var infoWrapper = document.querySelector("#info-wrapper");
    var instructions = document.querySelector("#instructions");
    var startBtn = document.querySelector("#start-btn");
    var gameStats = document.querySelector("#game-stats");
    var gameDay = document.querySelector("#game-day");
    var gameTimer = document.querySelector("#game-timer");
    var gameScore = document.querySelector("#game-score");
    var gameTimerInterval = null;
    var day = 0;
    var score = 0;
    var fishTracker = [0,0,0,0] //first item is fish, second is rare fish, third is trash, fourth is jellyfish. no sharks as it will lead to autolose
    var days = [{
        "day": 0,
        "instruction": "You have went on a fishing trip for a week.<br>To catch a fish, quickly click on it before it swim off!"
    },{
        "day": 1,
        "instruction": "You can catch rare fishes now. Let's continue!"
    },{
        "day": 2,
        "instruction": "There has been news of people throwing their trash into the ocean.<br> Let's continue and avoid the trash!"
    },{
        "day": 3,
        "instruction": "Jellyfishes have invaded this ocean region. Let's continue and avoid getting stunned by them!"
    },{
        "day": 4,
        "instruction": "Sharks have been sighted lately.<br>Let's continue and not provoke the sharks!"
    }];

    startBtn.addEventListener("click", startGame);
    clickContainer.addEventListener("mousemove", moveLine);
    var createFishes = null;
    var createRareFishes = null;
    var createTrashes = null;
    var createJellyfishes = null;
    var createSharks = null;
    function moveLine (event){
        fishingLine.style.left= event.clientX+"px";
        fishingLine.style.top = event.clientY+"px";
    }
    //start game function
    function startGame () {
        if (day === 0){
            fishTracker = [0,0,0,0,0];
            score = 0;
        }
        infoWrapper.style.display = "none";
        clickContainer.style.display = "block";
        gameStats.style.display = "block";
        createItems();
    }
    //create items function
    function createItems() {
        createTimer();
        day++;
        gameDay.innerText = "Day 0"+day;
        //start creating items depending on the day
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
                createFishes = setInterval(createFish, 1500);
                createRareFishes = setInterval(createRareFish, 3000);
                createTrashes = setInterval(createTrash, 2000);
                createJellyfishes = setInterval(createJellyfish,3000);
                createSharks = setInterval(createShark,3000);
                break;

            case 5:
                break;
        }
    }
    //create timer function
    function createTimer () {
        gameTimer.innerText = "Time: 10s";
        gameScore.innerText = "Score: 0";
        let sec = 0;
        gameTimerInterval = setInterval(startGameTimer, 1000);
        function startGameTimer () {
            gameTimer.innerText = `Time: ${10-sec}s`
            if (sec === 10) {
                sec = 0;
                endDay(false);
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
                if (clickContainer.contains(fish)){
                    clickContainer.removeChild(fish);
                }
            }, 350);
        }, 4500);
    }
    //create rare fish function
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
                if (clickContainer.contains(fish)){
                    clickContainer.removeChild(fish);
                }
            }, 350);

        }, 3000);
    }
    //create trash function
    function createTrash () {
        let trash = document.createElement("div");
        trash.classList.add("item");
        trash.classList.add("trash");
        clickContainer.appendChild(trash);
        setPosition(trash);
        trash.addEventListener("click", hit);
        setTimeout(function() {
            if (!trash.classList.contains("caught")){
                trash.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(trash)){
                    clickContainer.removeChild(trash);
                }
            }, 350);
        }, 3000);
    }
    //create jellyfish function
    function createJellyfish () {
        let jellyfish = document.createElement("div");
        jellyfish.classList.add("item");
        jellyfish.classList.add("jellyfish");
        clickContainer.appendChild(jellyfish);
        setPosition(jellyfish);
        jellyfish.addEventListener("click", hit);
        setTimeout(function() {
            if (!jellyfish.classList.contains("caught")){
                jellyfish.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(jellyfish)){
                    clickContainer.removeChild(jellyfish);
                }
            }, 350);
        }, 3000);
    }
    //create shark function
    function createShark () {
        let shark = document.createElement("div");
        shark.classList.add("item");
        shark.classList.add("shark");
        clickContainer.appendChild(shark);
        setPosition(shark);
        shark.addEventListener("click", hit);
        setTimeout(function() {
            if (!shark.classList.contains("caught")){
                shark.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(shark)){
                    clickContainer.removeChild(shark);
                }
            }, 350);
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
        if (!fishingLine.classList.contains("zapped")) {
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
                else if (type.contains("jellyfish")){
                    fishingLine.classList.add("zapped");
                    hitText.innerText = "zap!";
                    hitText.style.color = "yellow";
                    setTimeout(function() {
                        fishingLine.classList.remove("zapped");
                    }, 1000);
                }
                else if (type.contains("shark")){
                    endDay(true);
                    sec = 0;
                }
                setTimeout(function() {
                    clickContainer.removeChild(hitText);
                }, 1000);
                gameScore.innerText = `Score: ${score}`;
            }
        }
    }
    function endDay(died) {
        clearInterval(gameTimerInterval);
        clearInterval(createFishes);
        clearInterval(createRareFishes);
        clearInterval(createTrashes);
        clearInterval(createJellyfishes);
        clearInterval(createSharks);
        let remainingItems = document.querySelectorAll(".item");
        for (var i=0;i<remainingItems.length;i++){
            clickContainer.removeChild(remainingItems[i]);
        }
        gameStats.style.display = "none";
        clickContainer.style.display = "none";
        startBtn.style.top = "66%";
        if (!died) {
            if (day != 5) {
            instructions.innerHTML = `<h2>You have finished Day 0${day}!</h2>Your score so far: ${score}</p><p>${days[day].instruction}</p>`;
            }
            else {
            instructions.innerHTML = `<h2>You have finished the entire week!</h2><p>You have caught ${fishTracker[0]} fishes, ${fishTracker[1]} rare fishes and ${fishTracker[2]} trash.<br>Your score so far: ${score}</p><p>${days[day].instruction}</p>`;
            }

        }
        else {
            day = 0;
            instructions.innerHTML = `<h2>Too bad!</h2><p>You provoked the shark and it destroyed your boat.<br>Your entire week of fishing went to waste!</p>`;
        }
        infoWrapper.style.display = "block";
    }
    instructions.innerHTML = `<p>${days[day].instruction}</p>`;

    //Make bubbles
    var bubbles = document.getElementById('bubbles');
    var randomN = function(start, end){
        return Math.random()*end+start;
    };
    var bubbleNumber = 0,
    generateBubble = function(){
        if(bubbleNumber < 20){
            var bubble = document.createElement('div');
            var size = randomN(5, 10);
            bubble.setAttribute('style','width: '+size+'px; height: '+size+'px; left:'+randomN(1, bubbles.offsetWidth-(size+4) )+'px;');
            bubbles.appendChild(bubble);
            bubbleNumber++;
        }
        else {
          clearInterval(bubbleInterval);
        }
      };
      generateBubble();

      var bubbleInterval = setInterval(generateBubble, 500);
};