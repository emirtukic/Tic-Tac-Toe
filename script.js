var gameDisplay=document.getElementById('game-display');
var gameFields=document.getElementsByClassName('field');
var gameScoreDisplay=document.getElementById('game-score');
var oScoreDisplay=document.getElementById('o-player')
var currentPlayer='X';
var gameActive=true;
var gameState=['','','','','','','','',''];
var gameScore={
    X:0,
    0:0
}


var gameRules=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


gameDisplay.innerHTML=playerTurn();

for(var i=0;i<gameFields.length;i++){
    var element=gameFields[i];
    element.setAttribute('data-index',i)
    element.addEventListener('click',gameFieldClicked)
}

function gameFieldClicked(event){
    var selectedField=event.target
    var selectedIndex=parseInt(selectedField.getAttribute('data-index'));

    if(gameState[selectedIndex]!==''||!gameActive){
        return;
    }
    

updateGameState(selectedField,selectedIndex);
checkGameRules();


console.log(gameState);
}

function updateGameState(selectedField,index){
    gameState[index]=currentPlayer;
    selectedField.innerHTML=currentPlayer;

}

function checkGameRules(){
//logika za provjeru
for(var i=0;i<gameRules.length;i++){
    var rule=gameRules[i];
     var a=gameState[rule[0]];
     var b=gameState[rule[1]];
     var c=gameState[rule[2]];

     if(a==='' || b==='' || c===''){
         continue;
     }

     if(a===b && b===c){
         gameDisplay.innerHTML=winMessage();
         gameActive=false;
         if(currentPlayer==='X'){
         gameScore[currentPlayer]= gameScore[currentPlayer]+1;
         gameScoreDisplay.innerHTML=`${currentPlayer}:${gameScore[currentPlayer]}`
         }
         
         if(currentPlayer==='0'){
            gameScore[currentPlayer]= gameScore[currentPlayer]+1;
            oScoreDisplay.innerHTML=`${currentPlayer}:${gameScore[currentPlayer]}`

         }

         return;
     }

     
}
var isDraw=!gameState.includes('');
     if(isDraw){
        gameDisplay.innerHTML=drawMessage();
        gameActive=false;
        return;

     }


    changePlayer();
}

function changePlayer(){

currentPlayer=currentPlayer==='X'?'0':'X';
gameDisplay.innerHTML=playerTurn();
}

function playerTurn(){
    return `player ${currentPlayer} je na potezu`;
}

function winMessage(){
    return `player ${currentPlayer} je pobjedio`;
}

function drawMessage(){
    return `Nerijeseno je, igra je gotova`;
}

function restartGame(){
    gameState=['','','','','','','','',''];
     gameActive=true;
    currentPlayer='X';
    gameDisplay.innerHTML=playerTurn();
    for(var i=0;i<gameFields.length;i++){
        var element=gameFields[i];
        element.innerHTML='';
    }
  
}

