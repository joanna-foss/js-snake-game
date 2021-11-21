const snakeboard = document.getElementById("gameCanvas");
const c = snakeboard.getContext("2d");

let x = 200;
let y = 200;
let head = [x, y];
let snakeBody = [];
let gridSize = 10;
let direction = 'right';
let snakeLength = 2;
let foodPoint = [];
let boardWidth = 450;
let boardHeight = 450;
let time = 100;
let offset = -10;
let allowPlay = true;

$(document).keydown(function(e){
	switch(e.code){
		case ('ArrowUp'):
			direction = 'up';
			break;
		case ('ArrowRight'):
			direction = 'right';
			break;
		case ('ArrowDown'):
			direction = 'down';
			break;
		case ('ArrowLeft'):
			direction = 'left';
			break;
		default:
			break;
	}
});

function drawSnake(){
	snakeBody.push([head[0], head[1]]);
	c.fillStyle = '#ffd500';
	c.fillRect(head[0], head[1], gridSize, gridSize);
	if (snakeBody.length > snakeLength) {
		let removePart = snakeBody.shift();
		c.clearRect(removePart[0], removePart[1], gridSize, gridSize);
	}
}

function moveSnake() {
	if (checkForEat()){
		snakeLength += 1;
		$('#score').html((snakeLength * 10) - 20);
		drawFood();
	}
	if (checkForWallHit()){
		gameOver();
	}
	switch(direction){
		case 'up':
			moveUp();
			break;
		case 'right':
			moveRight();
			break;
		case 'down':
			moveDown();
			break;
		case 'left':
			moveLeft();
			break;
		default: break;
	}
};

function left(){
	return head[0] - gridSize;
}

function right(){
	return head[0] + gridSize;
}

function up(){
	return head[1] - gridSize;
}

function down(){
	return head[1] + gridSize;
}

function moveUp(){
	if(up()>=0){
		executeMove('up', 1, up())
	}
}

function moveDown(){
	if(down()<=boardHeight){
		executeMove('down', 1, down())
	}
}

function moveLeft(){
	if(left()>=0){
		executeMove('left', 0, left())
	}
}

function moveRight(){
	if(right()<=boardWidth){
		executeMove('right', 0, right())
	}
}

function executeMove(dir, axType, axVal){
	direction = dir;
	head[axType] = axVal;
	drawSnake();
}

function drawFood() {
	foodPoint = [Math.ceil((Math.random() * boardWidth)/10) * 10, Math.ceil((Math.random() * boardWidth)/10) * 10];
	if(snakeBody.some((elem) => elem[0] === foodPoint[0] && elem[1] === foodPoint[1])){
		drawFood();
	} else {
		c.fillStyle = '#ff0000';
		c.fillRect(foodPoint[0], foodPoint[1], 8, 8);
	}
}

function checkForEat(){
	return head[0] === foodPoint[0] && head[1] === foodPoint[1];
}

// function checkForBodyHit(){
// 	return
// }

function checkForWallHit(){
	return (head[0] === boardWidth || head[0] === 0 || head[1] === boardHeight || head[1] === 0);
}

function gameOver(){
	let score = (snakeLength-2) * 10;
	alert('Game over, pal. You scored: ' + score);
	clearInterval(interval);
	snakeBody = [];
	snakeLength = 2;
	allowPlay = false;
}

$('#lets-play').click(function(){
	c.translate(offset, offset);
	let interval = setInterval(moveSnake, time);
	drawFood();
});
