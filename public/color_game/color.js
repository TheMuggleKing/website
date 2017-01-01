function changeColors(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.background=color;
	}
}

function pickColor(){
	return colors[Math.floor(Math.random()*colors.length)];
}

function generateRandomColors(num){
	var array=[];
	for(var i=0; i<num; i++){
		array.push(randomColor());
	}
	return array;
}

function randomColor(){
	var r = Math.floor(Math.random()*256); // Random number from 0 to 255
	var g = Math.floor(Math.random()*256); // Random number from 0 to 255
	var b = Math.floor(Math.random()*256); // Random number from 0 to 255
	var color ="rgb(" + r + ", " + g + ", " + b + ")";
	return color;
}

function reset(){
	colors=generateRandomColors(numSquares);
	pickedColor=pickColor();
	colorDisplay.textContent= pickedColor;
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.display="block";
			squares[i].style.background=colors[i];
		} else{
			squares[i].style.display="none";
		}
	}
	h1.style.background="steelblue";
	resetButton.textContent="New Colors";
	messageDisplay.textContent="";
}

function eventListeners(){
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(i){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent==="Easy" ? numSquares=3: numSquares=6;  //If content is Easy, then value is 3,  else it is 6
			reset();
		});
	}

	resetButton.addEventListener("click", function(){
		reset();
	});
}

function setUpSquares(){
	for(var i=0; i< squares.length; i++){
		squares[i].style.background=colors[i]; //initial colors
		squares[i].addEventListener("click", function(){ //Add click listeners
			var clickedColor=this.style.background; //Color of clicked square
			if(clickedColor===pickedColor){
				messageDisplay.textContent="Correct!";
				changeColors(clickedColor);
				h1.style.background=clickedColor;
				resetButton.textContent="Play Again?";
			} else{
				this.style.background="#232323";
				messageDisplay.textContent="Try again";
			}
		});
	}
}

function init(){
	eventListeners();
	setUpSquares();
	reset();
}

var numSquares = 6; //Number of squares
var colors= generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();