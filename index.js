var started=false;
var game_over=false;
var level=0;
var colors=["green","red","yellow","blue"];
var userPrinted=[];
var gamePattern=[];
$(document).keypress(function(event){
    if(started==false && game_over===false){
        $("#level-title").text("level-"+level);
        nextSequence();
        started=true;
    }
    else if(game_over===true){
        game_over=false;
        location.reload();
    }
});
$(".btn").click(function(){
    var ele=this.id;
    userPrinted.push(ele);
    animate(ele);
    mk_sound(ele);
    checkAnswer(userPrinted.length-1);
});
function checkAnswer(last_ele){
    if(userPrinted[last_ele]===gamePattern[last_ele]){
        if(userPrinted.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play;
        $("body").addClass("game-over");
        $("#level-title").text("Game Over press any key to restart");
        startOver();
    }
}
function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}
function nextSequence(){
    userPrinted=[];
    level++;
    $("#level-title").text("level-"+level);
    var random_number=Math.floor(Math.random()*4);
    var random_color=colors[random_number];
    gamePattern.push(random_color);
    $("#"+random_color).fadeOut(100).fadeIn(100);
    mk_sound(random_color);
}
function animate(ele){
    $("#"+ele).addClass("pressed");
    setTimeout(function(){
        $("#"+ele).removeClass("pressed");
    },100);
}
function mk_sound(ele){
    var audio=new Audio("sounds/"+ele+".mp3");
    audio.play();
    $("body").removeClass("game-over");
    $("#level-title").css("color","white");
    game_over=true;
}