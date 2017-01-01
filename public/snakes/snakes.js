var headarray = [[3,3],[2,3],[2,2],[2,1],[2,0]]; //Array of all locations the head has been
var length=1;
var size=50;
var grid = document.querySelectorAll(".box");
var direction = [0, -1]; //Up
var fruit = false;
var fruitLocation = undefined;
var first = true;
var Id = undefined;

function position(arr){
    return arr[0]+size*arr[1];
}

function addarray(arr1, arr2){
    return [arr1[0]+arr2[0], arr1[1]+arr2[1]];
}

function printboard(){
    for(var i=0; i<length; i++){
        // grid[position(headarray[i])].textContent = "X";
        grid[position(headarray[i])].style.backgroundColor = "orange";
    }
    // grid[position(headarray[0])].textContent = "O";
    grid[position(headarray[0])].style.backgroundColor = "red";
    if(headarray.length>length){
        // grid[position(headarray[length])].textContent="";
        grid[position(headarray[length])].style.backgroundColor="white";
    }
}

function move(){
    var newmove = addarray(direction, headarray[0]);
    headarray.unshift(newmove);
    if(headarray.length > length+2){
        headarray.splice(-1);
    }
    if(endGame()){
        document.onkeydown = null;
    } else{
        if(fruit == false){
            var array = [];
            for(var i=0; i<grid.length; i++){
                if(grid[i].style.backgroundColor=="white"){
                    array.push(grid[i]);
                }
            }
            fruitLocation = array[Math.floor(Math.random()*array.length)];
            fruitLocation.style.backgroundColor = "yellow";
            fruit=true;
        } else if(fruitLocation && fruitLocation.style.backgroundColor == "red"){
            fruit = false;
            length += 1;
        }
        printboard();
    }
}

function hasDuplicates(arr) {
    var map = {}, i, size;
    for (i = 0, size = arr.length; i < size; i++){
        if (map[arr[i]]){
            return true;
        }
        map[arr[i]] = true;
    }
    return false;
}

function endGame(){
    var arr = headarray.slice(0,length);
	if(hasDuplicates(arr)){
		alert("Game Over!");
        clearInterval(Id);
		return true;
	}
	for(var i=0; i<length; i++){
        if(arr[i][0]<0 ||arr[i][0]>=size || arr[i][1]<0 || arr[i][1]>=size){
            alert("Game Over");
            clearInterval(Id);
            return true;
	    }
	}
	return false;
}

printboard();

document.onkeydown = function(e) {
	if(first){
		Id = setInterval(move, 200);
		first=false;
	}
    switch (e.keyCode) {
        case 37:
            // alert('left');
            direction = [-1,0];
            break;
        case 38:
            // alert('up');
            direction = [0, -1];
            break;
        case 39:
            // alert('right');
            direction = [1,0];
            break;
        case 40:
            // alert('down');
            direction = [0, 1];
            break;
    }
};

// var Id = setInterval(move, 200);