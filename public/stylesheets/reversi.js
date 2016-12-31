//Make visually appealing
//Notification needs to be able to be deleted after a move is played.  Fixed by replacing with alert().  However, alert should be styled and needs to have a delay so that the alert is after the visualboard is printed (described in 257)
//Make gameover an alert or something

function printboard(board){
  for(var i=0; i<size; i++){
    for(var j=0; j<size; j++){
      if(board[i+1][j+1]===firstplayermark){
        boxes[size*i+j].style.border="3px solid black";
        boxes[size*i+j].style.background="black";
        // boxes[size*(i-1)+(j-1)].textContent=firstplayermark;
      }else if(board[i+1][j+1]===secondplayermark){
        boxes[size*i+j].style.border="3px solid black";
        boxes[size*i+j].style.background="white";
        // boxes[size*(i-1)+(j-1)].textContent=secondplayermark;
      } else{
        boxes[size*i+j].style.border="3px solid green";
        boxes[size*i+j].style.background="green";
        // boxes[size*(i-1)+(j-1)].textContent=4*(i-1)+(j-1)+1;
      }
    }
  }
}

function boardcount(mark, board){
  sum=0
  for(var i=1; i<=size; i++){
    for(var j=1; j<=size; j++){
      if(board[i][j]===mark){
       sum+=1
      }
    }
  }
  return sum;
}

function flip(mark, oppmark, row, col, incrow, inccol, visualboard, flipit){
//  puts ">>>>>>>Flip row, col " + row.to_s + " " + col.to_s + " element " + visualboard[row][col].to_s
  if(visualboard[row][col]!== blankmark){
    return [false, visualboard];
  }

  if(incrow>0){
    finalrow=size;
  } else if(incrow<0){
    finalrow=1;
  } else{
    finalrow=0;
  }

  if(inccol>0){
    finalcol=size;
  } else if(inccol<0){
    finalcol=1;
  } else{
    finalcol=0;
  }
  
  var flag=false;
  var x=row;
  var y=col;
  var numberflipped=0;

  while(x!==finalrow && y!==finalcol){
    x+=incrow;
    y+=inccol;
    if(visualboard[x][y]===oppmark){
      numberflipped+=1;
    } else if(visualboard[x][y]===mark && numberflipped>0){
      flag=true
      break;
    } else{
      break;
    }
  }
  if(flag===true && flipit===true){
    while(row!==x || col!==y){
      row+=incrow;
      col+=inccol;
      visualboard[row][col]=mark;
    }
  }
// #  puts ">>>>>>>>> Return Flip with number flipped = " + numberflipped.to_s + " and flag of " + flag.to_s
  return [flag, visualboard];
}

// #==============================================
// # This is called by playmoves.
// # This calls flips with flag of true to check and flip in each of 8 different directions
// #==============================================

function fliptiles(mark, oppmark, row, col, visualboard){
  var [flaga, visualboard] = flip(mark, oppmark, row, col,  1,  0, visualboard, true);
  var [flagb, visualboard] = flip(mark, oppmark, row, col,  1,  1, visualboard, true);
  var [flagc, visualboard] = flip(mark, oppmark, row, col,  1, -1, visualboard, true);
  var [flagd, visualboard] = flip(mark, oppmark, row, col,  0,  1, visualboard, true);
  var [flage, visualboard] = flip(mark, oppmark, row, col,  0, -1, visualboard, true);
  var [flagf, visualboard] = flip(mark, oppmark, row, col, -1,  0, visualboard, true);
  var [flagg, visualboard] = flip(mark, oppmark, row, col, -1,  1, visualboard, true);
  var [flagh, visualboard] = flip(mark, oppmark, row, col, -1, -1, visualboard, true);
  var flag = flaga||flagb||flagc||flagd||flage||flagf||flagg||flagh;
// #  puts ">>>>>> FLIPTiles finished with flag " + flag.to_s
  return [flag, visualboard];
}

// =========================================================
//  This is called by the MAIN program
//  It asks for a move, does error checking if it is a valid move.
//  It calls fliptiles to make the move
// =========================================================

function playmove(move, mark, oppmark, visualboard, firstplayermove){
  var correctmove = false;
  // var move = prompt("Player " + mark +" Enter your move [1-" + size**2+"]");
  move=Number(move);
  var row=Math.floor((move-1)/size) + 1;
  var col=(move-1)%size + 1;
  if(move < 1 || move > (size)**2 || move===undefined){
    // notification.textContent="Player " + mark + " Your move is not valid. [Error: Not a valid number in range 1-" + size**2+']';
  } else if(visualboard[row][col] !== blankmark){
    // notification.textContent="Player " + mark + ' Your move is not valid. [Error:This move has already been taken.]';
  } else{
    var [correctmove, visualboard] = fliptiles(mark, oppmark, row, col, visualboard);
    if(correctmove){
      visualboard[row][col] = mark;
      move = (row-1)*size+col;
      // notification.textContent="Player " + mark + " played a move at " + move;
      firstplayermove=!firstplayermove;
    } else{
      // notification.textContent="Player " + mark + ' Your move is not valid.  [Error:No tiles of the opposite color have been flipped]';
    }
  }
  return [visualboard, firstplayermove];
}

// #============================================================
// #This checks if a valid move exists by brute force of all possible moves
// #It uses the flip function with flipit=FALSE (do not flip in visualboard) to check for all 8 directions
// #===============================================================

function movesleft(mark, oppmark, visualboard){
  for(var row=1; row<=size; row++){
    for(var col=1; col<=size; col++){
      if(visualboard[row][col] === blankmark){
        [flag, x] = flip(mark, oppmark, row, col, 1, 0, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, 1, 1, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, 1, -1, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, 0, 1, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col,0, -1, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, -1, 0, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, -1, 1, visualboard, false);
        if(flag){
          return true;
        }
        [flag, x] = flip(mark, oppmark, row, col, -1, -1, visualboard, false);
        if(flag){
          return true;
        }
      }
    }
  }
  return false;
}

function playermove(firstplayermove){
  if(firstplayermove){
    var playera = firstplayermark;
    var playerb = secondplayermark;
  } else{
    var playera = secondplayermark;
    var playerb = firstplayermark;
  }
  return [playera, playerb];
}

// #======================================================================
// #Start of main program
// #======================================================================
var size=8;
var firstplayermark = "Black";
var secondplayermark = "White";
var blankmark = 0;

var mid = size / 2;
var visualboard=[];

var notification=document.querySelector("#notification");
var currentPlayer=document.querySelector("span");
var winner=document.body.querySelector("h3");
var boxes=document.body.querySelectorAll(".box div");
var blackScore=document.body.querySelector("#blackScore");
var whiteScore=document.body.querySelector("#whiteScore");
var reset=document.body.querySelector("a");

for(var i=0; i<=size; i++){
  visualboard[i]=[];
  for(var j=0; j<=size; j++){
    visualboard[i][j]=blankmark;
  }
}

visualboard[mid][mid+1] = firstplayermark;
visualboard[mid+1][mid] = firstplayermark;
visualboard[mid][mid] = secondplayermark;
visualboard[mid+1][mid+1] = secondplayermark;

printboard(visualboard);

var firstplayermove=true;
var playera=firstplayermark;
var playerb=secondplayermark;
var gameover=false;

console.log(window.playera, window.playerb); //Edit

for(var i=0; i< boxes.length; i++) {
  (function(i) {
    boxes[i].onclick=function() {
      var move = i+1;
      [visualboard, firstplayermove]=playmove(move, window.playera, window.playerb, visualboard, firstplayermove);
      printboard(visualboard);
      console.log(window.playera, window.playerb, movesleft(window.playerb, window.playera, visualboard)) //Edit
      if(!movesleft(window.playerb, window.playera, visualboard)){ 
        //No possible moves for Player b. Either player a has to play again or the game is over.
        console.log("No moves left"); //Edit
        firstplayermove = ! firstplayermove;
        if(movesleft(playera, playerb, visualboard)){
          console.log("No positions open..."); //Edit
          // window.notification.textContent = ' There are no positions for the player '+ window.playerb + ". Play continues to the player " + window.playera + '.';
          alert(' There are no positions for the player '+ window.playerb + ". Play continues to the player " + window.playera + '.'); //Put delay
        } else{
          gameover = true
        }
      }
      [playera, playerb]=playermove(firstplayermove);
      currentPlayer.textContent=playera;
      var firstcount = boardcount(firstplayermark, visualboard);
      var secondcount= boardcount(secondplayermark, visualboard);
      blackScore.textContent=firstcount;
      whiteScore.textContent=secondcount;
      // notification.textContent="";  Need to erase my notification of no positions after a move has been played
      if(gameover){
        boxes[i].onclick=null;
        if(firstcount>secondcount){
          winner.textContent="Gameover! Player " + firstplayermark + " won " + firstcount + " to " + secondcount+".";
        } else if(firstcount===secondcount){
          winner.textContent="Gameover! The players tied at "+firstcount+".";
        } else{
          winner.textContent="Gameover! Player " + secondplayermark + " won " + secondcount + " to " + firstcount+".";
        }
        reset.style.visibility="visible";
      }
    }
  })(i);
}

// inputMove.onkeypress=function(event){
//   if(event.which===13){ //enter key
//     var move = this.value;
//     this.value="";
//     [visualboard, firstplayermove]=playmove(move, window.playera, window.playerb, visualboard, firstplayermove);
//     printboard(visualboard);
//     if(!movesleft(window.playerb, window.playera, visualboard)){ 
//       //No possible moves for Player b. Either player a has to play again or the game is over.
//       firstplayermove = ! firstplayermove;
//       if(movesleft(playera, playerb, visualboard)){
//         notification.textContent=' There are no positions for the player '+ window.playerb + ". Play continues to the player " + window.playera + '.';
//       } else{
//         gameover = true
//       }
//     }
//     [playera, playerb]=playermove(firstplayermove);
//     currentPlayer.textContent=playera;
//     if(gameover){
//       inputMove.onkeypress=null;
//       var firstcount = boardcount(firstplayermark, visualboard);
//       var secondcount=boardcount(secondplayermark, visualboard);
//       if(firstcount>secondcount){
//         winner.textContent="Gameover! Player " + firstplayermark + " won " + firstcount + " to " + secondcount+".";
//       } else if(firstcount===secondcount){
//         winner.textContent="Gameover! The players tied at "+firstplayermark+".";
//       } else{
//         winner.textContent="Gameover! Player " + secondplayermark + " won " + secondcount + " to " + firstcount+".";
//       }
//     }
//   }
// };