//importend variables for the game

var gamePattern = [ ];

var userClickedPattern = [ ];

var buttonColours = ["green", "blue", "yellow", "red"];

var level = 0;

var gameStarted = false;



// Detecting user pressing a key, start the game


$(document).keypress(function(event){

    if (gameStarted === false){
        $("#level-title").text("Level " + level)
        nextSequence();
        gameStarted = true;
        
    }
})


// Which Colour is next ?

function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $( "div #" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
}

// Adding Sound to the selected coloured buttons

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Detecting a clicked button

$(".btn").click( function(){
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    var currentColour = userChosenColour
    animatePress(currentColour);

    checkAnswer(userClickedPattern.length -1);
})

// Animate user choosing a button

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout( function() {
        $("#" + currentColour).removeClass("pressed")},100);

}

// Checking the users answers

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()}, 1000);
            userClickedPattern = [ ];

        }
        
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")}, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
       

    }

}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = []
    userClickedPattern = []

}