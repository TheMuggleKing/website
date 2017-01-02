//Change colors of boxes
//Fix losing - works after game is lost and then arrow key is pressed with no possible moves
//Fix winning  - alerts before printing board
// Makes the boxes slowly move across the page
// Fix delay in line 221

function zeroestoback(a,b,c,d){ // Given 4 numbers, moves all the zeroes to end (0,2,4,0==>0,0,2,4)
  array=[0,a,b,c,d];
  for(var i=1; i<=4; i++){
    if(array[i]===0){
      for(var j=0; j<i; j++){
        array[i-j]=array[i-j-1];
      }
    }
  }
  return array;
}

function compress(origa,origb,origc,origd,score){ //Completes the 2048 function
  array=zeroestoback(origa,origb,origc,origd) //First moves all  the zeroes to the back
  flag=true
  if(array[3]===array[4]){ //Then combines equal numbers (0,2,2,0==> 0,0,4,0)
    array[4]=array[4]+array[3]
    array[3]=0
    score += (array[3]+array[4])
    if(array[1]===array[2]){
      array[2]=array[2]+array[1]
      array[1]=0
      score+= (array[1]+array[2])
    }
  } else if(array[2]===array[3]){
    array[3]=array[2]+array[3]
    array[2]=0
    score+= (array[2]+array[3])
  } else if(array[1]===array[2]){
    array[2]=array[2]+array[1]
    array[1]=0
    score +=(array[1]+array[2])
  }
  if(origa===array[1] && origb===array[2] && origc===array[3] && origd===array[4]){
    flag=false
  }
  array=zeroestoback(array[1],array[2],array[3],array[4]) //Finishes by moving all remaining zeroes to back (0,0,4,0==> 0,0,0,4)
  array.push(score)
  array.push(flag)
  return array
}

function color(value){
  switch (value){
    case 0:
      return "gray";
      break;
    case 2:
      return "white";
      break;
    case 4:
      return "#ffffcc";
      break;
    case 8:
      return "#ffcc99";
      break;
    case 16:
      return "#ff9966";
      break;
    case 32:
      return "#ff6600";
      break;
    case 64:
      return "#cc0066";
      break;
    case 128:
      return "#ff00ff";
      break;
    case 256:
      return "#6600ff";
      break;
    case 512:
      return "#0066ff";
      break;
    case 1024:
      return "#0099cc";
      break;
    case 2048:
      return "#33cc33";
      break;
  }
}

function printboard(board){
  var boxes=document.body.querySelectorAll(".col-xs-3");
  for(var i=0; i<=3; i++){
    for(var j=0; j<=3; j++){
      boxes[4*i+j].textContent="-";
      boxes[4*i+j].classList.add("grey");
      if(board[i][j]!=0){
        boxes[4*i+j].textContent=board[i][j];
        boxes[4*i+j].classList.remove("grey");
      }
      boxes[4*i+j].style.background=color(board[i][j]);
    }
  }
}

function allcheck(board,score){
  numberofzeroes=0;
  zeroarray=[0];
  for(var row=0; row<=3; row++){
    for(var col=0; col<=3; col++){
      if(board[row][col]===2048){
        printboard(board);
        if(firstWin===true){
          alert('Yay!!! You have won the game! Your score was ' + score +'! Congratulations!');
        }
        document.querySelector("button").style.visibility="visible";
        firstWin=false;
      }else if(board[row][col]===0){
        numberofzeroes+=1;
        zeroarray[numberofzeroes]=(4*row+col);
      }
    }
  }
  newposition=zeroarray[Math.floor(Math.random()*numberofzeroes)+1]
  row=Math.floor(newposition/4);
  col=newposition%4;
  twoOrFour=[0,2,2,2,2,2,2,2,2,2,4];
  newPositionNumber=twoOrFour[Math.floor(Math.random()*10)+1];
  return [row,col,newPositionNumber];
}

function gameOver(board){
	for(var i=0; i<=3; i++){
		flag=compress(board[i][3],board[i][2],board[i][1],board[i][0],0)[6];
		if(flag===true){
			return false;
		}
		flag=compress(board[3][i],board[2][i],board[1][i],board[0][i],0)[6];
		if(flag===true){
			return false;
		}
		flag=compress(board[i][0],board[i][1],board[i][2],board[i][3],0)[6];
		if(flag===true){
			return false;
		}
		flag=compress(board[0][i],board[1][i],board[2][i],board[3][i],0)[6];
		if(flag===true){
			return false;
		}
	}
  return true
}

board=[[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

initialpositions = [Math.floor(Math.random()*16), Math.floor(Math.random()*16)]; //Randomizes the original 2's to begin gameplay
while(initialpositions[0]==initialpositions[1]){
	initialpositions[1]=Math.floor(Math.random()*16);
}
// Places the original 2's to begin gameplay
row=Math.floor((initialpositions[0])/4); 
col=(initialpositions[0])%4;
board[row][col]=2;
row=Math.floor((initialpositions[1])/4);
col=(initialpositions[1])%4;
board[row][col]=2;

printboard(board);

score=0;
firstWin=true;
firstLose=true;
j=0;

function onmove(a,e){
	arrow=false
	switch (e) {
	case 'l':
	case 37: //left
	  	arrow=true // arrow key and not any event is pressed
	  	j=0; // how many times we get a move where borrd doesn't change, j=4 implies invalid move
	  	for(var i=0; i<=3; i++){
	   		[a,board[i][3],board[i][2],board[i][1],board[i][0],score,flag]=compress(board[i][3],board[i][2],board[i][1],board[i][0],score);
	    	if(flag===false){
	      		j++;
	    	}
	  	}
	  	break;
	case 'u':
	case 38: //up
		arrow=true
		j=0;
		  for(var i=0; i<=3; i++){
	    	[a,board[3][i],board[2][i],board[1][i],board[0][i],score, flag]=compress(board[3][i],board[2][i],board[1][i],board[0][i],score);
	    	if(flag===false){
				j++;
			}
		}
	  	break;
	case 'r':
	case 39: //right
		arrow=true
		j=0;
		for(var i=0; i<=3; i++){
			[a,board[i][0],board[i][1],board[i][2],board[i][3],score, flag]=compress(board[i][0],board[i][1],board[i][2],board[i][3],score);
	    	if(flag===false){
	    		j++;
			}
	  	}
	  	break;
	case 'd':
	case 40: //down
		arrow=true
		j=0;
		for(var i=0; i<=3; i++){
	    	[a,board[0][i],board[1][i],board[2][i],board[3][i],score,flag]=compress(board[0][i],board[1][i],board[2][i],board[3][i],score);
	    	if(flag===false){
	    		j++;
	    	}
	  	}
		break;
	}
	if(arrow===true && (j!=4)){
	[row, col, newPositionNumber]=allcheck(board, score);
	board[row][col]=newPositionNumber;
	setTimeout(printboard(board),1000); //Fix delay
	document.querySelector("span").textContent=score;
	// Try placing gameover here
	} else if(firstLose===true && gameOver(board)){
		alert('No!  You have lost the game. Your score was ' + score +'. Please play again.');
		document.querySelector("button").style.visibility="visible";
		firstLose=false;
	}	
}
document.onkeydown = function(e) { //when arrow key is pressed
	onmove(0, e.keyCode);
}

detectswipe('container', onmove); //Swipes (for mobile)

document.querySelector("button").addEventListener("click", function(){
	board=[[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]; // Repetitive code from below

	initialpositions = [Math.floor(Math.random()*16), Math.floor(Math.random()*16)]; //Randomizes the original 2's to begin gameplay
 	while(initialpositions[0]==initialpositions[1]){
    	initialpositions[1]=Math.floor(Math.random()*16);
  	} 
	// Places the original 2's to begin gameplay
	row=Math.floor((initialpositions[0])/4);
	col=(initialpositions[0])%4;
	board[row][col]=2;
	row=Math.floor((initialpositions[1])/4);
	col=(initialpositions[1])%4;
	board[row][col]=2;

	printboard(board);
	score=0;
	document.querySelector("button").style.visibility="hidden";
	firstWin=true;
	firstLose=true;
})